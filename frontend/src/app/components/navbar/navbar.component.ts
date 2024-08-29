import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;
  hidden: boolean = true
  
  constructor(private cartService: CartService, private authsService: AuthService, private router: Router) {}


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
  
  ngOnInit(): void {
    this.onWindowScroll();
  }


  openSidenav() {
    this.cartService.toggleCart();
  }

  userInteraction(): void {
    this.hidden = !this.hidden
  }

  get isLoggedIn(): boolean {
    return this.authsService.isLoggedIn()
  }

  logout() {
    Swal.fire({
      title: "<strong>Hey!<strong>",
      html: `
      <p style="color: #939393;"> Estás seguro que quieres irte? </p>
      `,
      showCancelButton: true,
      confirmButtonColor: "#939393",
      cancelButtonColor: "#ff4372",
      confirmButtonText: "Cerrar sesión",
      imageUrl: "/img/bunny-ups.gif",
      imageHeight: 150,
      color: "#ff4372",
      background: "#e6e8da",
      width: 500,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authsService.logout()
        this.router.navigate(['/'])
        Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          text: "Esperamos verte pronto!",
          imageUrl: "/img/bunny-congrats.gif",
          imageHeight: 150,
          color: "#939393",
          background: "#e6e8da",
          width: 500,
        });
      }
    });
  }

}
