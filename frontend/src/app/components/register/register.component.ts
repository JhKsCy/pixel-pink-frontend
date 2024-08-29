import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault()
    this.authService.register(this.email, this.password).subscribe(
      response => {
        if(response.ok){
          this.router.navigate(['/login'])
          Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            title: "<strong>Ya estás registrado!</strong>",
            html: `
            <p style="color: #939393;"> Por tu seguridad, asegúrate de iniciar sesión nuevamente</p>
            `,
            imageUrl: "/img/bunny-congrats.gif",
            imageHeight: 150,
            color: "#ff4372",
            background: "#e6e8da",
            width: 500,
          });
        } else {
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "<strong>Error!</strong>",
            text: response.error.msg,
            imageUrl: "/img/bunny-ups.gif",
            imageHeight: 150,
            color: "#939393",
            background: "#e6e8da",
            width: 500,
          });
        }
      }, 
      error => {
        if(typeof error.error.msg != 'string'){
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "<strong>Error!</strong>",
            text: error.error.msg.password.msg,
            imageUrl: "/img/bunny-ups.gif",
            imageHeight: 150,
            color: "#939393",
            background: "#e6e8da",
            width: 500,
          });
        }
        else{
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "<strong>Error!</strong>",
            text: error.error.msg,
            imageUrl: "/img/bunny-ups.gif",
            imageHeight: 150,
            color: "#939393",
            background: "#e6e8da",
            width: 500,
          });
        }
      }
    )
  }
}
