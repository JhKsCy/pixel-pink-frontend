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

  selected: boolean = false

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

  sizes = [
    {size: 'XS', active: false},
    {size: 'S', active: false},
    {size: 'M', active: false},
    {size: 'L', active: false},
    {size: 'XL', active: false},
  ]

  sumQuantity(): void {
    this.cartQuantity = this.cartQuantity + 1
  }

  subsQuantity(): void {
    if(this.cartQuantity > 0){
      this.cartQuantity = this.cartQuantity - 1
    }
  }

  changeColor(index: number) {
    for (let item of this.sizes) {
      if(index) {
        item.active = !item.active
      }
    }
  }
}
