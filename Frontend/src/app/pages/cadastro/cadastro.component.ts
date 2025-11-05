import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
[x: string]: any;
 username = '';
 password = '';

 constructor(private auth: AuthService){}

onRegister() {
  this.auth.register(this.username, this.password).subscribe({
    next:() => alert('Cadastro realizado com sucesso!'),
    error: (err: any) => alert('Erro ao cadastrar')
  });
}

}
