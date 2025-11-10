import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showLogin = true;

  constructor(private auth: AuthService, private router: Router) {}

  toggleToRegister() {
    this.showLogin = false;
  }

  toggleToLogin() {
    this.showLogin = true;
  }

  onLogin() {
    if (!this.username || !this.password) {
      alert('Preencha usuário e senha');
      return;
    }
    this.auth.login(this.username, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: err => alert(err.error || 'Credenciais inválidas')
    });
  }

  onRegister() {
  if (!this.username || !this.password) {
      alert('Preencha usuário e senha');
      return;
    }
    this.auth.register(this.username, this.password).subscribe({
      next:() => alert('Cadastro realizado com sucesso!'),
      error: (err: any) => alert('Erro ao cadastrar')
    });
  }
}
