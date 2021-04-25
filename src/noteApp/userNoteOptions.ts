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