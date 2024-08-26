import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatSidenavModule, MatSidenav  } from '@angular/material/sidenav';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'


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
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartProducts = cart;
    });

    this.cartService.cartToggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
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
    cart = cart.map(x => x._id === product._id ? product : x);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.cartService.cartSubject.next(cart);
  }

  removeFromCart(productId: string): void {
    let cart = this.cartService.getCart();
    cart = cart.filter(x => x._id !== productId);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.cartService.cartSubject.next(cart)
  }

  getSubtotal(): number {
    return this.cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal();
  }

}
