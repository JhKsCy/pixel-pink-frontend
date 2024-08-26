import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardsComponent } from '../cards/cards.component';


@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [ CommonModule, CarouselModule, ButtonModule, TagModule, CardsComponent ],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css'
})
export class RecomendationsComponent {
  product: any
  products: any [] = []
  cartTextHidden: boolean = true

  constructor(private cardsService: CardsService, private router: Router, private activeRoute: ActivatedRoute) {

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

  // allProducts(): void{
  //   const productId: string | null = this.activeRoute.snapshot.paramMap.get('id')
  //   this.cardsService.getAllProducts().subscribe(
  //     response => {
  //       const allProducts: any[] = response.products
  //       const filteredProducts = allProducts.filter(x => x._id !== productId )
  //       console.log(filteredProducts)
  //       this.products = filteredProducts
  //     },
  //     error => {
  //       console.log("error", error)
  //     }
  //   )
  // }

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

}



