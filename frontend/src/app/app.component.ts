import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtbarComponent } from './components/utbar/utbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { PurchaseEmailComponent } from './components/purchase-email/purchase-email.component';
import { CartComponent } from './components/cart/cart.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UtbarComponent, NavbarComponent, RegisterComponent, LoginComponent, CategoriasComponent, ScrollTopComponent, PurchaseEmailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
