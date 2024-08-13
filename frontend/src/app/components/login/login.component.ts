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
        sessionStorage.setItem('token', response.token)
        if(response.ok) {
          Swal.fire('User logged', response.msg, 'success')
          this.router.navigate(['/'])
        } else {
          Swal.fire('Error', response.error.msg, 'error')
        }
      },
      error => {
        if(typeof error.error.msg != 'string'){
          Swal.fire('Error', error.error.msg.password.msg, 'error')
        }
        else{
          Swal.fire('Error', error.error.msg, 'error')
        }
      }
      
    )
  }
}
