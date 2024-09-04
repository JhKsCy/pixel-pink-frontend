import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  noPresell() {
    Swal.fire({
      showConfirmButton: false,
      timer: 2100,
      title: "<strong>Ups!<strong>",
      html: `
      <p style="color: #939393;"> Por el momento nuestra preventa no está abierta </p>
    `,
      imageUrl: "/img/bunny-ups.gif",
      imageHeight: 150,
      color: "#ff4372",
      background: "#e6e8da",
      width: 500,
    });
      return;
  }

}
