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
          Swal.fire('Thanks for your subscription', response.msg, 'success')
        }
        else {
          Swal.fire('Error', response.error.msg, 'error')
        }
      },
      error => {
        console.log(error)
        Swal.fire('Error', error.error.msg, 'error')
      }
    )
  }
}
