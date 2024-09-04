import { Component, EventEmitter, Output  } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-direction',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-direction.component.html',
  styleUrl: './new-direction.component.css'
})
export class NewDirectionComponent {
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  userData: any
  formGroup: FormGroup;

  id: any = sessionStorage.getItem('userId');
  name: string = ''
  lastName: string = ''
  phone: number = NaN
  state: string = ''
  city: string = ''
  address: string = ''
  detail: string = ''
  observations: string = ''

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder ) {

    this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        detail: ['', Validators.required],
        observations: ['', Validators.required]
      })

  }

  ngOnInit(): void{
    const userId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(userId){
      this.authService.getData(userId).subscribe(
        response => {
          this.userData = response.msg
          this.formGroup.patchValue({
            name: this.userData.name,
            lastName: this.userData.lastName,
            phone: this.userData.phone,
            state: this.userData.state,
            city: this.userData.city,
            address: this.userData.address,
            detail: this.userData.detail,
            observations: this.userData.observations
          });
        },
        error => {
          console.log('error', error)
        }
      )
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault()
    const userId = sessionStorage.getItem('userId');
    const isFormValid = this.formGroup.valid;
    this.isValid.emit(isFormValid);
    if (!isFormValid) {
      Swal.fire({
        showConfirmButton: false,
        timer: 2100,
        title: "<strong>Ups!<strong>",
        html: `
        <p style="color: #939393;"> Tienes campos sin rellenar </p>
      `,
        imageUrl: "/img/bunny-ups.gif",
        imageHeight: 150,
        color: "#ff4372",
        background: "#e6e8da",
        width: 500,
      });
    } else if (userId) {
      this.authService.updateData(
        userId,
        this.formGroup.value.name,
        this.formGroup.value.lastName,
        this.formGroup.value.phone,
        this.formGroup.value.state,
        this.formGroup.value.city,
        this.formGroup.value.address,
        this.formGroup.value.detail,
        this.formGroup.value.observations
      ).subscribe(
        response => {
          if(response.ok){
            console.log(response);
            
            Swal.fire({
              showConfirmButton: false,
              timer: 2000,
              title: "<strong>Yay!<strong>",
              html: `
              <p style="color: #939393;"> Tus datos han sido guardados con exito </p>
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
    } else {
      console.error('No se encontró el user');
    }
  }
    
  itsValid() {
    const isFormValid = this.formGroup.valid;
    this.isValid.emit(isFormValid);
  }
}
