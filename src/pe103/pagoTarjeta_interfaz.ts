/* He intentado implementarlo usando el patrón Straegy*/

/**
 * Interfaz para implementar el pago por tarjeta donde se define
 * el metodo aplicar comision.
 */
export interface PagoTarjeta {
  aplicarComision(precio: number):void;
  getPrecioFinal():number;
}


/* export abstract class Pago {
  private precio_final: number;
  constructor(private precio: number, private metodo: string) {
  }

protected abstract comision(): void;
}*/