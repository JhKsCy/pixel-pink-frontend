import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../../services/cards.service';



@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css'
})
export class RecomendationsComponent {
  products: any [] = []

  constructor(private cardsService: CardsService, private router: Router) {}

  ngOnInit(): void{
    this.allProducts()
  }

  allProducts(): void{
    this.cardsService.getAllProducts().subscribe(
      response => {
        this.products = response.products
      },
      error => {
        console.log("error", error)
      }
    )
  }


}



