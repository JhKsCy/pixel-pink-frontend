import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ CommonModule, CardsComponent ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {

  collection: string | null = null;

  constructor( private activeRoute: ActivatedRoute ) {}

  ngOnInit(): void{
    this.collection = this.activeRoute.snapshot.paramMap.get('clotheCollection');
    console.log(this.collection);
  }
}
