import {PagoTarjeta} from './pagoTarjeta_interfaz';

export class Pago {
  constructor(private precio: number, private formaPago: PagoTarjeta) {}
  realizarPago():number {
    this.formaPago.aplicarComision(this.precio);
    let precioPago = this.formaPago.getPrecioFinal();
    return precioPago;
  }
}