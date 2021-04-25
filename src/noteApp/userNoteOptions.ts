import {colors, Note} from './note';
import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Clase UserNoteOptions.
 * Define todas los métodos que tiene el usuario para interactuar
 * con las notas.
 */
export class UserNoteOptions {
  constructor() {}
  /**
   * Crea una nueva nota
   * @param usuario Usuario que crea la nota
   * @param titulo Titulo de la nota
   * @param cuerpo Texto de la nota
   * @param color Color de la nota
   */
  addNote(usuario: string, titulo: string, cuerpo: string,
      color: string): void {
    // Si el directorio del usuario no existe se crea
    if (fs.existsSync(`db/${usuario}`) == false) {
      console.log('Creado fichero del usuario');
      fs.mkdirSync(`db/${usuario}`, {recursive: true});
    }
    const nota = new Note(titulo, cuerpo, color as colors);
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == false) {
      fs.writeFileSync(`db/${usuario}/${titulo}.json`, nota.noteToJSON());
      console.log(chalk.green('Nota creada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que ya existe'+
          ' una nota con el mismo titulo'));
    }
  }

  /**
   * Elimina una nota concreta
   * @param usuario Usuario del que se eliminara la nota
   * @param titulo Titulo de la nota a eliminar
   */
  removeNote(usuario: string, titulo: string): void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      fs.rmSync(`db/${usuario}/${titulo}.json`);
      console.log(chalk.green('Nota eliminada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }

  /**
   * Modifica una nota existente
   * @param usuario Usuario al que se modificara la nota
   * @param titulo Titulo de la nota a modificar
   * @param cuerpo Cuerpo de la nota modificado
   * @param color Color modificado de la nota
   */
  modifyNote(usuario: string, titulo: string, cuerpo: string,
      color: string): void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      const nota = new Note(titulo, cuerpo, color as colors);
      fs.writeFileSync(`db/${usuario}/${titulo}.json`, nota.noteToJSON());
      console.log(chalk.green('Nota modificada correctamente!'));
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }

  /**
   * Lista todas las notas que tiene un usuario
   * @param usuario Usuario del que se listaran las notas
   * @returns Lista con las notas del usuario
   */
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

  /**
   * Lee una nota concreta
   * @param usuario Usuario del que se leera la nota
   * @param titulo Titulo de la nota a leer
   */
  readNote(usuario: string, titulo: string): Note|void {
    if (fs.existsSync(`db/${usuario}/${titulo}.json`) == true) {
      const info = fs.readFileSync(`db/${usuario}/${titulo}.json`);
      const notaJson = JSON.parse(info.toString());
      const nota = new Note(notaJson.title, notaJson.body, notaJson.color);
      // console.log(chalk.keyword(nota.getColor())(nota.getTitle()));
      // console.log(chalk.keyword(nota.getColor())(nota.getBody()));
      return nota;
    } else {
      console.log(chalk.red('ERROR: Parece que esa nota no existia'));
    }
  }
}