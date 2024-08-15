import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RecomendationsComponent } from '../recomendations/recomendations.component';
import { SalesbannerComponent } from '../salesbanner/salesbanner.component';
import { SusbcribeComponent } from '../susbcribe/susbcribe.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RecomendationsComponent, SalesbannerComponent, SusbcribeComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
