import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  applications$: Observable<any[]>;
  isAuthenticated = false;

  email = '';
  password = '';

  constructor(private authService: AuthService, private firestore: Firestore) {
    this.applications$ = collectionData(collection(this.firestore, 'applications'));
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.isAuthenticated = true;
    }).catch(err => console.error('Login error:', err));
  }

  logout() {
    this.authService.logout().then(() => {
      this.isAuthenticated = false;
    }).catch(err => console.error('Logout error:', err));
  }
}
