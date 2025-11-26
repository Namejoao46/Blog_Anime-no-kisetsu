import { Component } from '@angular/core';
import { Noticia, NoticiaService } from '../../services/noticia.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";

@Component({
  selector: 'app-criar-noticia',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MenuBarComponent, RodapeComponent],
  templateUrl: './criar-noticia.component.html',
  styleUrls: ['./criar-noticia.component.css']
})
export class CriarNoticiaComponent {
  noticiaForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private fb: FormBuilder, private noticiaService: NoticiaService) {this.noticiaForm = this.fb.group({
    titulo: ['', Validators.required],
    texto: ['', [Validators.required, Validators.maxLength(65000)]],
    imagemUrl: ['', Validators.required],
    categoria: ['', Validators.required],
    subcategoria: ['', Validators.required],
    dataPublicacao: ['', Validators.required],
    autor: ['', Validators.required]
    });
  }

  salvarNoticia(): void {
    if (this.noticiaForm.valid) {
      const noticia: Noticia = {
        ...this.noticiaForm.value,
        dataPublicacao: this.noticiaForm.value.dataPublicacao instanceof Date
          ? this.noticiaForm.value.dataPublicacao.toISOString().split('T')[0]
          : this.noticiaForm.value.dataPublicacao
      };

      this.noticiaService.criarNoticia(noticia).subscribe({
        next: (res) => {
          this.mensagemSucesso = 'Notícia cadastrada com sucesso!';
          this.noticiaForm.reset();
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao cadastrar notícia.';
          console.error(err);
        }
      });
    }
  }
}
