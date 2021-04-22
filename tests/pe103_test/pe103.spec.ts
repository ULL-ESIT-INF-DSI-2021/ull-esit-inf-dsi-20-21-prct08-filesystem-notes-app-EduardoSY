import 'mocha';
import {expect} from 'chai';
import {Pago} from '../../src/pe103/pago';
import {Visa} from '../../src/pe103/visa';
import {Mastercard} from '../../src/pe103/mastercard';
import {Paypal} from '../../src/pe103/paypal';

describe('Test para el ejercicio propuesto del PE103', () => {
  let tarjetaVisa = new Visa();
  let tarjetaMastercard = new Mastercard();
  let tarjetaPaypal = new Paypal();
  let pago1 = new Pago(5.25, tarjetaVisa);
  let pago2 = new Pago(5.25, tarjetaMastercard);
  let pago3 = new Pago(5.25, tarjetaPaypal);

  it('Pagando con Visa un producto de 5.25 nos cobran 5.59', () => {
    expect(pago1.realizarPago()).to.be.eql(5.59);
  });

  it('Pagando con Mastercard un producto de 5.25 nos cobran 5.51', () => {
    expect(pago2.realizarPago()).to.be.eql(5.51);
  });

  it('Pagando con Paypal un producto de 5.25 nos cobran 5.41', () => {
    expect(pago3.realizarPago()).to.be.eql(5.41);
  });
});

