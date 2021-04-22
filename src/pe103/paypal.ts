import {PagoTarjeta} from './pagoTarjeta_interfaz';

export class Paypal implements PagoTarjeta {
    private precioFinal: number = 0;
    constructor() {}

    /**
    * Getter. Nos permite obtener el precio final del producto, una
    * vez se ha aplicado la comision por el uso de la tarjeta
    * @returns Precio final del producto, incluida la comisión
    */
    getPrecioFinal(): number {
      return +(this.precioFinal.toFixed(2));
    }

    /**
    * Metodo para calcular la comision aplicada por pagar con la tarjeta
    * @param precio Precio base del producto a comprar
    */
    aplicarComision(precio: number) : void {
      this.precioFinal += precio + (precio * 0.03);
    }
}
