import { Component } from '@angular/core';
import { Noticia, NoticiaService } from '../../services/noticia.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-noticia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './criar-noticia.component.html',
  styleUrl: './criar-noticia.component.css'
})
export class CriarNoticiaComponent {
  titulo = '';
  texto = '';
  resultado: Noticia | null = null;

  constructor(private noticiaService: NoticiaService) {}

  onCriar(){
    const noticia: Noticia = { titulo: this.titulo, texto: this.texto };
    this.noticiaService.criarNoticia(noticia).subscribe({
      next: res => {
        this.resultado = res;
        alert(`Notícia criada! Categoria: ${res.categoria}, Subcategoria: ${res.subcategoria}`);
      },
      error: err => alert('Erro ao criar noticia: ' + err.message)
    });
  }
}
