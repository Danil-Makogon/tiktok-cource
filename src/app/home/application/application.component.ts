import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent {
  applicationForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      tiktok: [''],
      instagram: [''],
      referral: [''],
      contact: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.applicationForm.valid) {
      try {
        const data = this.applicationForm.value;
        const ref = collection(this.firestore, 'applications');
        await addDoc(ref, data);
        alert('Application submitted successfully!');
      } catch (error) {
        console.error('Error submitting application: ', error);
      }
    }
  }
}
