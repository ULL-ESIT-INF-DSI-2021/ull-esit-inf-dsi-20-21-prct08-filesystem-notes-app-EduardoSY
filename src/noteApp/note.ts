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
  /**
   * Setter. Permite establecer color
   * @param color Color de la nota
   */
  setColor(color: string): void {
    this.color = color;
  }

  /**
   * Setter. Permite establecer el texto de la nota
   * @param body Texto de la nota
   */
  setBody(body: string): void {
    this.body = body;
  }

  /**
   * Getter. Devuelve el titulo
   * @returns Titulo
   */
  getTitle():string {
    return this.title;
  }

  /**
   * Getter. Devuelve el color
   * @returns Color
   */
  getColor():string {
    return this.color;
  }

  /**
   * Getter. Devuelve el texto de la nota
   * @returns Texto de la nota
   */
  getBody():string {
    return this.body;
  }

  /**
   * Transforma los datos de la nota a un string en formato JSON
   * @returns String en formato JSON
   */
  noteToJSON():string {
    return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"'+ this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
  }
}