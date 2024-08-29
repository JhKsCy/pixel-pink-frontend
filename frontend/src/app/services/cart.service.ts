import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartToggleSubject = new Subject<void>();
  cartToggle$ = this.cartToggleSubject.asObservable();
  
  toggleCart() {
    this.cartToggleSubject.next();
  }


  private storageKey = 'shoppingCart';
  cartSubject = new BehaviorSubject<any[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  getCart(): any[] {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any): void {
    let cart = this.getCart();
    const existingProduct = cart.find(p => p._id === product._id && p.size == product.size
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
  }

}
