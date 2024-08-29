import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [ CommonModule, CarouselModule, ButtonModule, TagModule, RouterLink ],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css'
})
export class RecomendationsComponent {
  product: any
  products: any [] = []
  cartTextHidden: boolean = true

  constructor(private cardsService: CardsService, private router: Router, private activeRoute: ActivatedRoute, private cartService: CartService) {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes('product')) {
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        }
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

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

    this.allProducts()
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = (
      future: any,
      curr: any
    ) => {
      return future.routeConfig === curr.routeConfig;
    };
  }

  allProducts(): void {
    const productId: string | null = this.activeRoute.snapshot.paramMap.get('id');
    const productCollection: string | null = this.activeRoute.snapshot.paramMap.get('clotheCollection');
    
    this.cardsService.getAllProducts().subscribe(
      response => {
        const allProducts: any[] = response.products;        
        let filteredProducts = allProducts;
  
        if (productId) {
          filteredProducts = filteredProducts.filter(x => x._id !== productId);
        }
  
        if (productCollection) {
          filteredProducts = filteredProducts.filter(x => x.clotheCollection === productCollection);
        }
  
        console.log(filteredProducts);
        this.products = filteredProducts;
      },
      error => {
        console.log("error", error);
      }
    );
  }

  openProduct(productId: string): void {
    this.router.navigate(['/product', productId])
  }

  show(): void {
    this.cartTextHidden = !this.cartTextHidden
  }

  goToCollecion(clotheCollection: string): void {
    this.router.navigate(['/collection', clotheCollection])
  }

  addToCart(event: Event, size: string) {
    const button = event.target as HTMLElement;
    const productJson = button.getAttribute('data-product');
    const product = productJson ? JSON.parse(productJson) : {};
    
    const productToAdd = {
      ...product,
      quantity: 1,
      size: size
    };
    this.cartService.addToCart(productToAdd);
    Swal.fire({
      showConfirmButton: false,
      timer: 2000,
      title: "<strong>Yay!<strong>",
      html: `
      <p style="color: #939393;"> Producto agregado al carrito </p>
    `,
      imageUrl: "/img/bunny-congrats.gif",
      imageHeight: 150,
      color: "#ff4372",
      background: "#e6e8da",
      width: 500
    });
  }
}



