import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default-data',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './default-data.component.html',
  styleUrl: './default-data.component.css'
})
export class DefaultDataComponent {

  userData: any = {}
  message: string = ''
  id: any = sessionStorage.getItem('userId');
  emptyData : boolean = false;

  constructor( private authService: AuthService, private activeRoute: ActivatedRoute, private router: Router ) {}

  ngOnInit(): void{
    const userId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(userId){
      this.authService.getData(userId).subscribe(
        response => {
          this.userData = response.msg
          const validation = response.msg.name
          console.log(validation)
          if(validation){
            this.emptyData = false;
          } else{
            this.emptyData = true;
          }
        },
        error => {
          console.log('error', error)
        }
      )
    }
  }

  toData() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.router.navigate([`/update-data/${userId}`]);
    } else {
      Swal.fire({
        showConfirmButton: false,
        timer: 2000,
        title: "<strong>Error!</strong>",
        text: "Usuario no encontrado, por favor comunicate con soporte",
        imageUrl: "/img/bunny-ups.gif",
        imageHeight: 150,
        color: "#939393",
        background: "#e6e8da",
        width: 500,
      });
    }
  }

}
