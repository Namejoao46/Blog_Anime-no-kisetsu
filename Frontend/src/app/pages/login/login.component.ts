import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  router: any;

  constructor(private auth: AuthService) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: { token: string; }) => {
        localStorage.setItem('token', res.token);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err: any) => alert('Credenciais inválidas')
    });
  }
}
