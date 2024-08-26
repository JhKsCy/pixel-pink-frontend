import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecomendationsComponent } from '../recomendations/recomendations.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, RouterLink, RecomendationsComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: any
  cartQuantity: number = 0
  products: any [] = []

  buttonXS = 'size-button';
  buttonS = 'size-button';
  buttonM = 'size-button';
  buttonL = 'size-button';
  buttonXL = 'size-button';

  selectedSize: string | null = null;

  constructor(private cardsService: CardsService, private cartService: CartService, private activeRoute: ActivatedRoute, private renderer: Renderer2) {}

  ngOnInit(): void{
    const productId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(productId){
      this.cardsService.getProduct(productId).subscribe(
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

  changeColor(clickedButton: number) {
    this.resetColors();
    if (clickedButton === 1) {
      this.buttonXS = 'accent';
      this.selectedSize = 'XS';
    }
    if (clickedButton === 2) {
      this.buttonS = 'accent';
      this.selectedSize = 'S';
    }
    if (clickedButton === 3) {
      this.buttonM = 'accent';
      this.selectedSize = 'M';
    }
    if (clickedButton === 4) {
      this.buttonL = 'accent';
      this.selectedSize = 'L';
    }
    if (clickedButton === 5) {
      this.buttonXL = 'accent';
      this.selectedSize = 'XL';
    }
  }

  private resetColors() {
    this.buttonXS = 'size-button';
    this.buttonS = 'size-button';
    this.buttonM = 'size-button';
    this.buttonL = 'size-button';
    this.buttonXL = 'size-button';
  }

  showTableSizes(): void {
    Swal.fire({
      imageUrl: "/img/tallas.png",
      padding: "2em",
      showCloseButton: true,
      showConfirmButton: false
    });
  }

  addToCart() {
    if (!this.selectedSize) {
        alert('Por favor, selecciona una talla antes de agregar al carrito.');
        return;
    }

    if (this.cartQuantity <= 0) {
        alert('La cantidad debe ser mayor a 0.');
        return;
    }

    const productToAdd = { 
        ...this.product, 
        quantity: this.cartQuantity,
        size: this.selectedSize // Añade la talla seleccionada
    };
    this.cartService.addToCart(productToAdd);
}

}
