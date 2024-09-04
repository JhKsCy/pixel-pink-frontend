import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-susbcribe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './susbcribe.component.html',
  styleUrl: './susbcribe.component.css'
})
export class SusbcribeComponent {
  name: string = ''
  email: string = ''

  constructor(private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault()
    this.authService.susbcribe(this.name, this.email).subscribe(
      response => {
        if(response.ok){
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "<strong>Yay!<strong>",
            html: `
            <p style="color: #939393;"> Gracias por tu suscripción </p>
          `,
            imageUrl: "/img/bunny-congrats.gif",
            imageHeight: 150,
            color: "#ff4372",
            background: "#e6e8da",
            width: 500
          });
        }
        else {
          Swal.fire({
            showConfirmButton: false,
            timer: 2100,
            title: "<strong>Ups!<strong>",
            html: `
            <p style="color: #939393;"> Ingresa datos válidos </p>
          `,
            imageUrl: "/img/bunny-ups.gif",
            imageHeight: 150,
            color: "#ff4372",
            background: "#e6e8da",
            width: 500,
          });
        }
      },
      error => {
        console.log(error)
        Swal.fire({
          showConfirmButton: false,
          timer: 2100,
          title: "<strong>Ups!<strong>",
          html: `
          <p style="color: #939393;"> Por favor contactate con soporte </p>
        `,
          imageUrl: "/img/bunny-ups.gif",
          imageHeight: 150,
          color: "#ff4372",
          background: "#e6e8da",
          width: 500,
        });
      }
    )
  }
}
