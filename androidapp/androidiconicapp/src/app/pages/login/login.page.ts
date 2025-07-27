import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  isLoading = false;
  showPassword = false;
  loginMode = true; // true for login, false for register

  // Registration fields
  name = '';
  phoneNumber = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.showToast('Please enter email and password');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Signing in...',
      translucent: true
    });
    await loading.present();

    try {
      const result = await this.authService.login(this.email, this.password);
      
      if (result.success) {
        this.showToast('Login successful!');
        this.router.navigate(['/concepts']);
      } else {
        this.showAlert('Login Failed', result.message);
      }
    } catch (error) {
      this.showAlert('Error', 'An error occurred during login');
    } finally {
      loading.dismiss();
    }
  }

  async onRegister() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Please fill all required fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password must be at least 6 characters');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating account...',
      translucent: true
    });
    await loading.present();

    try {
      const result = await this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber
      });
      
      if (result.success) {
        this.showToast('Registration successful!');
        this.router.navigate(['/concepts']);
      } else {
        this.showAlert('Registration Failed', result.message);
      }
    } catch (error) {
      this.showAlert('Error', 'An error occurred during registration');
    } finally {
      loading.dismiss();
    }
  }

  toggleMode() {
    this.loginMode = !this.loginMode;
    this.clearForm();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private clearForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.phoneNumber = '';
    this.confirmPassword = '';
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
