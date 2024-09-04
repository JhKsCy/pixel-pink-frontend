import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtbarComponent } from './components/utbar/utbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { CartComponent } from './components/cart/cart.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, UtbarComponent, NavbarComponent, ScrollTopComponent, CartComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
