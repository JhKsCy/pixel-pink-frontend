import { Component } from '@angular/core';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor( ) {}

  toBuy() {
    const paypalUrl = 'https://www.paypal.com/';
    window.open(paypalUrl, '_blank');
  }

}
