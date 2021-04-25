# Práctica 8 - Aplicación de procesamiento de notas de texto
* Elaborado por Eduardo Da Silva Yanes

## Indice
- [1. Introduccion](#introduccion)
- [2. Pasos previos](#previos)
- [3. Desarrollo de los ejercicios](#desarrollo)

  - [3.4 Cubrimiento del codigo](#cubrimiento)
- [4. Dificultades y conclusion](#conclusion)
- [5. Referencias](#referencias)

## 1. Introducción <a name="introduccion"></a>
Esta octava práctica será la primera donde hagamos algo más cercano a lo que es una aplicación real. En este caso vamos a aprender cómo usar la API síncrona de Node.js así como otras herramientas como yargs para interactuar con argumentos de la linea de comandos y chalk, que nos permite añadir un color al output de la terminal.

Además de todo el código a desarrollar, también vamos a trabajar con Github Actions y la integración continua. Tendremos ejecución continua de código TS ejecutado en Node.js y configuracioń del flujo de trabajo para trabajar con Coveralls y SonarCloud.

## 2. Pasos previos <a name="previos"></a>
Para la realización de esta práctica necesitaremos hacer uso de distintas COOSAAS
Recordemos siempre instalar las cosas como dependencias de desarrollo. Para ello hacemos uso del flag `--save-dev`.

Para poder aprovechar la **api síncrona de Node.JS para trabajar con ficheros** debemos instalar el siguiente paquete:
```bash
npm install --save-dev @types/node
```
Para instalar **chalk** debemos hacer lo siguiente:
```bash
npm install --save-dev chalk
```
Finalmente necesitamos instalar **yargs**. Para ello debemos instalar tanto el propio yargs como el paquete **@types/yargs**. 
```bash
npm install --save-dev yargs @types/yargs
```

## 3. Desarrollo de los ejercicios <a name="desarrollo"></a>

Para llevar a cabo esta práctica he creado diversas clases.

### Clase Note

Esta clase es la encargada de representar lo que es una nota.  

```typescript
export class Note {
  constructor(private title: string, private body: string,
    private color: string) {}

  setTitle(title: string): void {
    this.title = title;
  }

  setColor(color: string): void {
    this.color = color;
  }

  setBody(body: string): void {
    this.body = body;
  }

  getTitle():string {
    return this.title;
  }

  getColor():string {
    return this.color;
  }

  getBody():string {
    return this.body;
  }

  noteToJSON():string {
    return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"'+ this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
  }
}
```
Una nota está compuesta por un **título**, un **cuerpo**, es decir, un mensaje y por un **color**. 

Para poder acceder a todos estos atributos tenemos sus correspondientes **getters** así como sus **setters**, en caso de que querramos modificar alguno de estos.

Finalmente tenemos la función `noteToJSON()`. El objetivo de esta es transformar la nota a formato JSON de tal manera que lo podemos almacenar en un fichero y poder manipularla correctamente.

### Clase userNoteOptions

El objetivo de esta clase es englobar todo aquello que el usuario puede hacer con las notas. Esto incluye añadir notas, eliminarlas, modificarlas, leerlas y listarlas.

```typescript
import {Note} from './note';
import * as fs from 'fs';
import * as chalk from 'chalk';


export class UserNoteOptions {
  constructor() {}

  addNote(usuario: string, titulo: string, cuerpo: string,
      color: string): void {
    if (fs.existsSync(`db/${usuario}`) == false) {
      console.log('Creado fichero del usuario');
      fs.mkdirSync(`db/${usuario}`, {recursive: true});
    }
    const nota = new Note(titulo, cuerpo, color);
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == false) {
      fs.writeFileSync(`db/${usuario}/${titulo}.json`, nota.noteToJSON());
      console.log(chalk.green('Nota creada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que ya existe'+
          ' una nota con el mismo titulo'));
    }
  }

  removeNote(usuario: string, titulo: string): void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      fs.rmSync(`db/${usuario}/${titulo}.json`);
      console.log(chalk.green('Nota eliminada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }

  modifyNote(usuario: string, titulo: string, cuerpo: string,
      color: string): void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      const nota = new Note(titulo, cuerpo, color);
      fs.writeFileSync(`db/${usuario}/${titulo}.json`, nota.noteToJSON());
      console.log(chalk.green('Nota modificada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }


  listNotes(usuario: string): Note[] {
    let listNotes: Note[] = [];
    fs.readdirSync(`db/${usuario}`).forEach((notes) => {
      const info = fs.readFileSync(`db/${usuario}/${notes}`);
      const notaJson = JSON.parse(info.toString());
      const nota = new Note(notaJson.title, notaJson.body, notaJson.color);
      listNotes.push(nota);
    });
    return listNotes;
  }

  readNote(usuario: string, titulo: string): void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      const info = fs.readFileSync(`db/${usuario}/${titulo}.json`);
      const notaJson = JSON.parse(info.toString());
      const nota = new Note(notaJson.title, notaJson.body, notaJson.color);
      console.log(chalk.keyword(nota.getColor())(nota.getTitle()));
      console.log(chalk.keyword(nota.getColor())(nota.getBody()));
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }
}
```

En primer lugar importamos todo aquello externo que vamos a necesitar. En nuestro caso es **chalk** y el paquete **fs** para la gestión de fichero así como la clase **Note** creada anteriormente.

**`addNote(usuario: string, titulo: string, cuerpo: string, color: string)`** es la primera función que encontramos. Esta nos permite añadir una nueva nota. 

Lo primero que hacemos es analizar si existe el directorio correspondiente al usuario. En caso negativo, creamos dicho directorio. A continuación se analiza si existe un fichero .json con el mismo nombre que la nota que vamos a crear. En caso afirmativo mostramos por consola un mensaje de error. En caso contrario, creamos dicho directorio gracias a la función `writeFileSync`, que recibe tanto la ruta como el contenido del fichero, es decir la nota en formato json.

**`removeNote(usuario: string, titulo: string)`** nos permite eliminar una nota existente. 

Lo primero que hacemos es comprobar si la nota que queremos eliminar existe. Si es así, gracias a la función de la api de Node.js, `rmSync`, podemos eliminar el fichero. En caso de que no exista mostramos un mensaje de error por la consola.

**`modifyNote(usuario: string, titulo: string, cuerpo: string, color: string)`** es la función que nos permite modificar nuestras notas. La implementación es muy similar a la de la función **add**. En este caso, lo que hacemos es sobreescribir la nota con los nuevos datos de tal manera que, si la nota ya existia, la modificamos y, en caso de no existir, se crea.

**`listNotes(usuario: string): Note[]`** nos permite listar todas las notas de un usuario.

### Clase noteApp

Lorem ipsum y esas cosas

## 4. Dificultades y conclusión <a name="conclusion"></a>

## 5. Referencias <a name="referencias"></a>
- [Guión práctica 8](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/): Guión de la práctica .
- [Apuntes sobre Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/): Apuntes de la asignatura sobre Node.JS
- [Guía para crear un proyecto](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html): Guía del profesor para crear un proyecto.
- Diversos videotutoriales creados por el profesor de la asignatura donde explica cómo instalar diversos paquetes y configuraciones (Typedoc, Mocha, Chai, Instanbul, Workflow con Github Actions, etc.)