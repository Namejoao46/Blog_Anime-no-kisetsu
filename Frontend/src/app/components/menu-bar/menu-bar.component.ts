import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Noticia } from '../../services/noticia.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, RouterLinkActive, HttpClientModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  menuAberto = false;
  mostrarMais = false;

  usuarioLogado: any = null;
  topSubcategorias: any[] = [];
  outrasSubcategorias: any[] = [];

  constructor(private el: ElementRef, private http: HttpClient, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.carregarUsuario();
    this.carregarSubcategorias();
  }

  /** Busca usuário logado usando token salvo */
  private carregarUsuario() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Nenhum token encontrado, usuário não logado');
      return;
    }

    this.http.get('http://localhost:8080/usuario', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (usuario: any) => {
        this.usuarioLogado = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
      },
      error: (err) => {
        console.error('Erro ao buscar usuário', err);
        // tenta recuperar do cache
        const usuarioCache = localStorage.getItem('usuario');
        if (usuarioCache) {
          this.usuarioLogado = JSON.parse(usuarioCache);
        }
      }
    });
  }

  /** Busca notícias e calcula top4 subcategorias */
  private carregarSubcategorias() {
    this.http.get<Noticia[]>('http://localhost:8080/noticias', { responseType: 'json' })
      .subscribe({
        next: (noticias) => {
          if (!Array.isArray(noticias)) {
            console.error('Resposta inesperada de /noticias', noticias);
            return;
          }

          const mapa = new Map<string, { categoria: string, nome: string, total: number }>();

          noticias.forEach(n => {
            const chave = `${n.categoria}-${n.subcategoria}`;
            if (!mapa.has(chave)) {
              mapa.set(chave, { categoria: n.categoria, nome: n.subcategoria, total: 0 });
            }
            mapa.get(chave)!.total++;
          });

          const ordenadas = Array.from(mapa.values())
            .sort((a, b) => b.total - a.total);

          this.topSubcategorias = ordenadas.slice(0, 4);
          this.outrasSubcategorias = ordenadas.slice(4);
        },
        error: (err) => console.error('Erro ao buscar notícias', err)
      });
  }

  sair() {
    this.auth.logout();
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }

  alternarMenu() {
    this.menuAberto = !this.menuAberto;
    if (!this.menuAberto) this.mostrarMais = false;
  }

  fecharMenu() {
    this.menuAberto = false;
    this.mostrarMais = false;
  }

  toggleMais() {
    this.mostrarMais = !this.mostrarMais;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clicadoDentro = this.el.nativeElement.contains(event.target);
    if (!clicadoDentro && this.menuAberto) {
      this.fecharMenu();
    }
  }
}
