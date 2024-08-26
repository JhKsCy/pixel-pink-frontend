import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CardsComponent } from '../cards/cards.component';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ CommonModule, FooterComponent, CardsComponent ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {

  product: any
  products: any [] = []
  cartTextHidden: boolean = true

  constructor( private router: Router ) { }

  openProduct(productId: string): void {
    this.router.navigate(['/product', productId])
  }

  show(): void {
    this.cartTextHidden = !this.cartTextHidden
  }

  goToCollecion(clotheCollection: string): void {
    this.router.navigate(['/collection', clotheCollection])
  }

}

