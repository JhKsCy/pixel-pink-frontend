import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''
  password: string = ''

  constructor(private authservice: AuthService, private router: Router){}

  onSubmit(event: Event): void {
    event.preventDefault()
    this.authservice.login(this.email, this.password).subscribe(
      response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userId', response.id);
        if(response.ok) {
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "<strong>Bienvenido!</strong>",
            imageUrl: "/img/bunny-congrats.gif",
            imageHeight: 150,
            color: "#ff4372",
            background: "#e6e8da",
            width: 500,
          });
          this.router.navigate(['/'])
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
