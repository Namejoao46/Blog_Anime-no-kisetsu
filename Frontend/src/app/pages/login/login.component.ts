import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RodapeComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showLogin = true;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

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

        // Busca dados do usuário com o token
        this.http.get('http://localhost:8080/usuario', {
          headers: { Authorization: `Bearer ${res.token}` }
        }).subscribe({
          next: usuario => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            alert('Login realizado com sucesso!');
            this.router.navigate(['/home']);
          },
          error: () => alert('Erro ao buscar dados do usuário')
        });
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
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.toggleToLogin(); // volta para tela de login
      },
      error: () => alert('Erro ao cadastrar')
    });
  }
}

