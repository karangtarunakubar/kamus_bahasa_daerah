// src/app/auth/auth.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    IonNote
  ]
})
export class AuthPage {
  selectedSegment: 'login' | 'register' = 'login';
  showPassword = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    addIcons({ mailOutline, lockClosedOutline, personOutline, eyeOutline, eyeOffOutline });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login Payload:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register Payload:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
