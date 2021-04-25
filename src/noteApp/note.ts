/**
 * Clase Note. Nos permite representar una nota.
 */
export class Note {
  /**
   * Constructor de la clase Note
   * @param title Titulo de la nota
   * @param body Texto que contiene la nota
   * @param color Color de la nota
   */
  constructor(private title: string, private body: string,
    private color: string) {}

  /**
   * Setter. Permite establecer titulo
   * @param title Titulo de la nota.
   */
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