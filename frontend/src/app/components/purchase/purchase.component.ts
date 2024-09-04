import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { NewDirectionComponent } from '../new-direction/new-direction.component';
import { PaymentComponent } from '../payment/payment.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [RouterLink, CommonModule, NewDirectionComponent, PaymentComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {  

  userData: any = {}
  id: any = sessionStorage.getItem('userId');
  cartProducts: any[] = [];
  cartQuantity: number = 1;
  emptyCart : boolean = false;
  step: number = 1;
  stepTwo: boolean = true;
  stepThree: boolean = true;
  private cartSubscription: Subscription = new Subscription();

  constructor( private router: Router, private cartService: CartService, private authService: AuthService, private activeRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartProducts = cart;
      if(this.cartProducts.length == 0){
        localStorage.clear()
        this.emptyCart = true;
      } else{
        this.emptyCart = false;
      }
    });

    const userId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(userId){
      this.authService.getData(userId).subscribe(
        response => {
          this.userData = response.msg
        },
        error => {
          console.log('error', error)
        }
      )
    }

  }

  sumQuantity(product: any): void {
    product.quantity++;
    this.updateCart(product);
  }

  subsQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateCart(product);
    }
  }
  
  updateCart(product: any): void {
    let cart = this.cartService.getCart();
    cart = cart.map(x => x._id === product._id && x.size === product.size ? product : x);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.cartService.cartSubject.next(cart);
  }

  removeFromCart(product: any): void {
    let cart = this.cartService.getCart();
    cart = cart.filter(x => !( x._id == product._id && x.size == product.size ));
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.cartService.cartSubject.next(cart)
  }

  getSubtotal(): number {
    return this.cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal();
  }

  toData() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.router.navigate([`/update-data/${userId}`]);
    } else {
      Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        title: "<strong>Error!</strong>",
        text: "Usuario no encontrado, por favor comunicate con soporte",
        imageUrl: "/img/bunny-ups.gif",
        imageHeight: 150,
        color: "#939393",
        background: "#e6e8da",
        width: 500,
      });
    }
  }

  toStepTwo() {
    this.stepTwo = false
    this.step = 2;
  }

  isFormValid: boolean = false;

  onValidityChange(isValid: boolean): void {
    this.isFormValid = isValid;
  }

  toStepThree(): void {
    if (this.isFormValid) {
      this.stepThree = false
      window.scrollTo(0, 0);
      this.step = 3;
    } else {
      Swal.fire({
        showConfirmButton: false,
        timer: 2100,
        title: "<strong>Ups!<strong>",
        html: `
        <p style="color: #939393;"> Asegurate de guardar tu información antes de continuar </p>
      `,
        imageUrl: "/img/bunny-ups.gif",
        imageHeight: 150,
        color: "#ff4372",
        background: "#e6e8da",
        width: 500,
      });
    }
  }
}