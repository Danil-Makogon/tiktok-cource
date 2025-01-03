import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './home/navbar/navbar.component';
import {DescriptionComponent} from './home/description/description.component';
import {AboutComponent} from './home/about/about.component';
import {AdvantagesComponent} from './home/advantages/advantages.component';
import {ReviewsComponent} from './home/reviews/reviews.component';
import {ApplicationComponent} from './home/application/application.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            AngularFireModule,
            NavbarComponent,
            DescriptionComponent,
            AboutComponent,
            AdvantagesComponent,
            ReviewsComponent,
            ApplicationComponent,
            ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiktok-course';
}
