import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor( ) { }

}

