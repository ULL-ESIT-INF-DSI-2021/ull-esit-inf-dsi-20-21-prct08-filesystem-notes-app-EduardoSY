/* He intentado implementarlo usando el patrón Straegy*/

/**
 * Interfaz para implementar el pago por tarjeta donde se define
 * el metodo aplicar comision.
 */
export interface PagoTarjeta {
  aplicarComision(precio: number):void;
  getPrecioFinal():number;
}