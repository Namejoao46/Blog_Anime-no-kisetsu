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
  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noticiaService.buscarPorId(id).subscribe({
        next: (data) => this.noticia = data,
        error: (err) => console.error('Erro ao buscar notícia:', err)
      });
    }
  }
}
