import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthServiceService } from './auth-service.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private userSer: UserService
  ) {
    auth.user$.subscribe((user) => {
      if (!user) {
        return;
      }

      this.userSer.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
