import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gerenciar-noticias',
  standalone: true,
  templateUrl: './gerenciar-noticias.component.html',
  styleUrls: ['./gerenciar-noticias.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, RodapeComponent, MenuBarComponent]
})
export class GerenciarNoticiasComponent {
  noticiaForm!: FormGroup;
  noticiaSelecionada: Noticia | null = null;
  idBusca: number | null = null;
  mensagem: string = '';

  constructor(
    private noticiaService: NoticiaService,
    private fb: FormBuilder
  ) {
    this.noticiaForm = this.fb.group({
      titulo: [''],
      texto: [''],
      imagemUrl: [''],
      categoria: [''],
      subcategoria: [''],
      dataPublicacao: [''],
      autor: ['']
    });
  }

  private normalizarPayload(value: any): any {
    return {
      ...value,
      // garante que não vai undefined ou formato estranho
      dataPublicacao: value.dataPublicacao ? String(value.dataPublicacao) : null
    };
  }

  buscarPorId(): void {
    if (!this.idBusca) {
      this.mensagem = 'Digite um ID válido.';
      return;
    }
    this.noticiaService.buscarPorId(this.idBusca).subscribe({
      next: (data) => {
        this.noticiaSelecionada = data;
        // se dataPublicacao vier com hora, cortar para yyyy-MM-dd
        const dataISO = (data as any).dataPublicacao;
        this.noticiaForm.patchValue({
          ...data,
          dataPublicacao: dataISO && typeof dataISO === 'string' ? dataISO.substring(0, 10) : dataISO
        });
        this.mensagem = '';
      },
      error: (err) => {
        console.error('Erro ao buscar:', err);
        this.noticiaSelecionada = null;
        this.mensagem = 'Notícia não encontrada.';
      }
    });
  }

  salvar(): void {
    if (this.noticiaSelecionada?.id) {
      const payload = this.normalizarPayload(this.noticiaForm.value);
      this.noticiaService.atualizarNoticia(this.noticiaSelecionada.id, payload)
        .subscribe({
          next: () => {
            this.mensagem = 'Notícia atualizada com sucesso!';
            this.noticiaSelecionada = null;
            this.noticiaForm.reset();
          },
          error: (err) => {
            console.error('Erro ao atualizar:', err);
            this.mensagem = 'Falha ao atualizar a notícia.';
          }
        });
    }
  }

  remover(): void {
    if (this.noticiaSelecionada?.id && confirm('Deseja realmente remover esta notícia?')) {
      this.noticiaService.removerNoticia(this.noticiaSelecionada.id)
        .subscribe({
          next: () => {
            this.mensagem = 'Notícia removida com sucesso!';
            this.noticiaSelecionada = null;
            this.noticiaForm.reset();
          },
          error: (err) => {
            console.error('Erro ao remover:', err);
            this.mensagem = 'Falha ao remover a notícia.';
          }
        });
    }
  }
}
