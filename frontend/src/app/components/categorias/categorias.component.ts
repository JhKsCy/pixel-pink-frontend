import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  filteredCategory : boolean = false;

  constructor(private cardsService: CardsService, private router: Router, private activeRoute: ActivatedRoute) {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes('category')) {
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        }
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit(): void {
    if( this.activeRoute.snapshot.paramMap.get('category') ){
      this.filteredCategory = true;
    } else{
      this.filteredCategory = false;
    }
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = (
      future: any,
      curr: any
    ) => {
      return future.routeConfig === curr.routeConfig;
    };
  }

  filterCategory(category: string): void {
    this.router.navigate(['/category', category])
  }

  showAllProducts(): void {
    this.router.navigate(['/category'])
  }

}
