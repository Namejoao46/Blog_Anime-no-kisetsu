import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { RodapeComponent } from "../../components/rodape/rodape.component";

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuBarComponent, RodapeComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {}

  ngOnInit(): void {
    const categoria = this.route.snapshot.paramMap.get('categoria');
    const subcategoria = this.route.snapshot.paramMap.get('subcategoria');

    if (categoria && subcategoria) {
      this.noticiaService.buscarPorCategoria(categoria, subcategoria).subscribe({
        next: (data) => {
          this.noticias = data;
        },
        error: (err) => {
          console.error('Erro ao buscar notícias:', err);
        }
    })
    }
    
  }
}
