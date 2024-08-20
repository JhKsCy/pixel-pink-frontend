import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtbarComponent } from './components/utbar/utbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
<<<<<<< HEAD
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { PurchaseEmailComponent } from './components/purchase-email/purchase-email.component';
=======
import { CartComponent } from './components/cart/cart.component';
>>>>>>> cc9f5024b84f6216d2d0b6153562b460ca83672b



@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, UtbarComponent, NavbarComponent, RegisterComponent, LoginComponent, CategoriasComponent, ScrollTopComponent, PurchaseEmailComponent],
=======
  imports: [RouterOutlet, UtbarComponent, NavbarComponent, RegisterComponent, LoginComponent, CategoriasComponent, CartComponent],
>>>>>>> cc9f5024b84f6216d2d0b6153562b460ca83672b
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
