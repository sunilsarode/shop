import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthServiceService) {}

  login() {
    this.authService.login();
  }
}
