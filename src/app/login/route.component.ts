import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth-service';

const adminUsers = [{ usuario: 'admin', senha: 'adminpassword' }];

const commonUsers = [{ usuario: 'john_doe', senha: 'password123' }];

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css',
})
export class RouteComponent {
  title = 'parati-front';

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  navigateToAbout() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      const senha = this.loginForm.get('senha')?.value;

      const isAdmin = adminUsers.some(
        (user) => user.usuario === usuario && user.senha === senha
      );

      const isCommonUser = commonUsers.some(
        (user) => user.usuario === usuario && user.senha === senha
      );

      if (isAdmin) {
        this.authService.userType = 'admin';
        this.router.navigate(['/about/adm-dash']);
      } else if (isCommonUser) {
        this.authService.userType = 'user';
        this.router.navigate(['/about/dash']);
      } else {
        console.log('Invalid credentials');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
