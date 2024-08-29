import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule, MatSidenav  } from '@angular/material/sidenav';
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {  
  @ViewChild('sidenav') sidenav!: MatSidenav;
  cartProducts: any[] = [];
  cartQuantity: number = 1;
  emptyCart : boolean = false;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private router: Router, private authsService: AuthService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartProducts = cart;
      if(this.cartProducts.length == 0){
        localStorage.clear()
        this.emptyCart = true;
      } else{
        this.emptyCart = false;
      }
    }
  );

    this.cartService.cartToggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  get isLoggedIn(): boolean {
    return this.authsService.isLoggedIn()
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

  toBuyNL() {
    this.router.navigate(['/login'])
    this.sidenav.toggle()
  }

  toBuy() {
    this.router.navigate(['/'])
    this.sidenav.toggle()
  }

}
