import { Component } from '@angular/core';
import {AboutComponent} from './about/about.component';
import {AdvantagesComponent} from './advantages/advantages.component';
import {ApplicationComponent} from './application/application.component';
import {DescriptionComponent} from './description/description.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ReviewsComponent} from './reviews/reviews.component';

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    AdvantagesComponent,
    ApplicationComponent,
    DescriptionComponent,
    NavbarComponent,
    ReviewsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
