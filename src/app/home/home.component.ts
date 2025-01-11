import { Component } from '@angular/core';
import {AboutComponent} from './about/about.component';
import {AdvantagesComponent} from './advantages/advantages.component';
import {ApplicationComponent} from './application/application.component';
import {DescriptionComponent} from './description/description.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {NumbersComponent} from './numbers/numbers.component';
import {LicenseComponent} from './license/license.component';

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    AdvantagesComponent,
    ApplicationComponent,
    DescriptionComponent,
    NavbarComponent,
    ReviewsComponent,
    NumbersComponent,
    LicenseComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
