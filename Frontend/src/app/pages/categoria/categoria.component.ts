import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Noticia, NoticiaService } from '../../services/noticia.service';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";
import { UltimasNoticiasComponent } from "../../components/ultimasNoticias/noticias.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuBarComponent, RodapeComponent, UltimasNoticiasComponent],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria!: string;
  subcategoria!: string | null;
  noticias: Noticia[] = [];
  noticiasPagina: Noticia[] = [];
  paginaAtual = 1;
  tamanhoPagina = 30;
  totalPaginas = 0;

  constructor(
    private router: ActivatedRoute,
    private noticiaService: NoticiaService
  ){}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.categoria = params.get('categoria') || '';
      this.subcategoria = params.get('subcategoria');

      this.noticiaService.listarNoticias().subscribe(res => {
        let filtradas = res.filter(
          n => (n.categoria || '').toLowerCase() === this.categoria.toLowerCase()
        );

        if (this.subcategoria){
          filtradas = filtradas.filter(
            n => (n.subcategoria || '').toLowerCase() === this.subcategoria!.toLowerCase()
          );
        }

        this.noticias = filtradas;
        this.totalPaginas = Math.ceil(this.noticias.length / this.tamanhoPagina);
        this.atualizarPagina();
      });
    });
  }

  atualizarPagina(): void {
    const start = (this.paginaAtual - 1) * this.tamanhoPagina;
    const end = start + this.tamanhoPagina;
    this.noticiasPagina = this.noticias.slice(start, end);
  }

  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas){
      this.paginaAtual = pagina;
      this.atualizarPagina();
    }
  }
}
