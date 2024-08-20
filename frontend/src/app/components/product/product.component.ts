import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: any
  cartQuantity: number = 0

  constructor(private cardService: CardsService, private activeRoute: ActivatedRoute, private renderer: Renderer2) {}

  ngOnInit(): void{
    const productId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(productId){
      this.cardService.getProduct(productId).subscribe(
        response => {
          this.product = response.msg
        },
        error => {
          console.log('error', error)
        }
      )
    }
  }

  sumQuantity(): void {
    this.cartQuantity = this.cartQuantity + 1
  }

  subsQuantity(): void {
    if(this.cartQuantity > 0){
      this.cartQuantity = this.cartQuantity - 1
    }
  }


  buttonXS = 'size-button';
  buttonS = 'size-button';
  buttonM = 'size-button';
  buttonL = 'size-button';
  buttonXL = 'size-button';

  changeColor(clickedButton: number) {
    this.resetColors();
    if (clickedButton === 1) {this.buttonXS = 'accent'};
    if (clickedButton === 2) {this.buttonS = 'accent'};
    if (clickedButton === 3) {this.buttonM = 'accent'};
    if (clickedButton === 4) {this.buttonL = 'accent'};
    if (clickedButton === 5) {this.buttonXL = 'accent'};
  }

  private resetColors() {
    this.buttonXS = 'size-button';
    this.buttonS = 'size-button';
    this.buttonM = 'size-button';
    this.buttonL = 'size-button';
    this.buttonXL = 'size-button';
  }
  
}
