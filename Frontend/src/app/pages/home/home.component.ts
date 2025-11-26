import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuTitleComponent } from "../../components/menu-title/menu-title.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { UltimasNoticiasComponent } from '../../components/ultimasNoticias/noticias.component';
import { NoticiasVerticalComponent } from '../../components/noticias-vertical/noticias-vertical.component';
import { BigCardComponent } from "../../components/big-card/big-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Noticia, NoticiaService } from '../../services/noticia.service';
import { RodapeComponent } from "../../components/rodape/rodape.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuTitleComponent,
    MenuBarComponent,
    UltimasNoticiasComponent,
    NoticiasVerticalComponent,
    BigCardComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    RodapeComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('menuTitleRolante') menuTitleRolante!: ElementRef;
  @ViewChild('newsRolante', { static: false }) newsRolante!: ElementRef;
  @ViewChild('newsOne', { static: false }) newsOne!: ElementRef;
  @ViewChild('newsTwo', { static: false }) newsTwo!: ElementRef;
  @ViewChild('newsTree', { static: false }) newsTree!: ElementRef;
  @ViewChild('newsFourt', { static: false }) newsFourt!: ElementRef;
  @ViewChild('bigCard', { static: false }) bigCard!: ElementRef;
  @ViewChild('bigNewsContainer', { static: false }) bigNewsContainer!: ElementRef;

  // ===== Scroll manual =====
  scrollStepMenuTitleManual = 1480; // tamanho fixo (px)
  scrollAmountMenuTitle = 0;

  scrollAmount = 0;
  scrollStep = 485;

  scrollAmountVertical = { newsOne: 0, newsTwo: 0, newsTree: 0, newsFourt: 0 };
  scrollStepVertical = 136;

  scrollAmountBigCard = 0;
  scrollStepBigCard = 825;

  noticias: Noticia[] = [];
  bigCards: Noticia[] = [];
  ultimasNoticias: Noticia[] = [];
  ultimasNoticiasFiltradas: Noticia[] = [];
  bigNewsCard: Noticia[] = [];

  noticiasPorCategoria: { [key: string]: { [key: string]: Noticia[] } } = {
    Anime: {},
    Manga: {},
    Gamer: {},
    Manhwa: {}
  };

  categorias: string[] = ['Anime', 'Manga', 'Gamer', 'Manhwa'];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.listarNoticias().subscribe(res => {
      this.noticias = res;
      console.log('Notícias recebidas:', this.noticias);

      this.organizarNoticias();
      this.montarBigNews();
      this.filtrarNoticias('todos');
    });
  }

  organizarNoticias(): void {
    this.bigCards = this.categorias.flatMap(cat => {
      const noticia = this.noticias.find(n => n.categoria === cat);
      return noticia ? [noticia] : [];
    });

    this.ultimasNoticias = this.noticias.slice(0, 12);

    this.categorias.forEach(cat => {
      this.noticiasPorCategoria[cat] = {};
      this.noticias
        .filter(n => n.categoria === cat)
        .forEach(n => {
          const sub = n.subcategoria || 'Geral';
          if (!this.noticiasPorCategoria[cat][sub]) {
            this.noticiasPorCategoria[cat][sub] = [];
          }
          this.noticiasPorCategoria[cat][sub].push(n);
        });
    });
  }

  ngAfterViewInit(): void {
    this.definirScrollStep();
    this.definirScrollStepVertical();
    this.definirScrollStepBigCard();
  }

  definirScrollStep(): void {
    const primeiroCard: HTMLElement | null =
      this.newsRolante.nativeElement.querySelector('app-ultimas-noticias');
    if (primeiroCard) {
      const containerStyle = window.getComputedStyle(this.newsRolante.nativeElement);
      const gap = parseInt(containerStyle.gap || '0', 10);
      const cardWidth = primeiroCard.getBoundingClientRect().width;
      this.scrollStep = cardWidth + gap;
      console.log('scrollStep (news rolante):', this.scrollStep);
    } else {
      console.warn('Nenhum app-ultimas-noticias encontrado para medir o passo.');
    }
  }

  definirScrollStepVertical(): void {
    const primeiroCard = this.newsOne.nativeElement.querySelector("app-noticias-vertical");
    if (primeiroCard) {
      this.scrollStepVertical = primeiroCard.clientHeight;
    }
  }

  definirScrollStepBigCard(): void {
    const primeiroCard = this.bigCard.nativeElement.querySelector("app-big-card");
    if (primeiroCard) {
      this.scrollStepBigCard = primeiroCard.scrollWidth;
    }
  }

  // ===== Scroll horizontal =====
  scrollRight(): void {
    if (this.scrollStep <= 0) return;
    this.scrollAmount = Math.min(
      this.scrollAmount + this.scrollStep,
      this.newsRolante.nativeElement.scrollWidth
    );
    this.newsRolante.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
  }

  scrollLeft(): void {
    if (this.scrollStep <= 0) return;
    this.scrollAmount = Math.max(
      this.scrollAmount - this.scrollStep,
      0
    );
    this.newsRolante.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
  }

scrollRightBigCard(): void {
  this.scrollAmountBigCard += this.scrollStepBigCard;
  this.bigNewsContainer.nativeElement.scrollTo({
    left: this.scrollAmountBigCard,
    behavior: 'smooth'
  });
}

scrollLeftBigCard(): void {
  this.scrollAmountBigCard -= this.scrollStepBigCard;
  if (this.scrollAmountBigCard < 0) this.scrollAmountBigCard = 0;
  this.bigNewsContainer.nativeElement.scrollTo({
    left: this.scrollAmountBigCard,
    behavior: 'smooth'
  });
}

  // ===== Scroll vertical =====
  scrollUp(newsId: 'newsOne' | 'newsTwo' | 'newsTree' | 'newsFourt'): void {
    this.scrollAmountVertical[newsId] -= this.scrollStepVertical;
    this[newsId].nativeElement.scrollTo({
      top: this.scrollAmountVertical[newsId],
      behavior: 'smooth'
    });
  }

  scrollDown(newsId: 'newsOne' | 'newsTwo' | 'newsTree' | 'newsFourt'): void {
    this.scrollAmountVertical[newsId] += this.scrollStepVertical;
    this[newsId].nativeElement.scrollTo({
      top: this.scrollAmountVertical[newsId],
      behavior: 'smooth'
    });
  }

  // ===== Scroll menuTitle com passo manual =====
  scrollRightMenuTitle(): void {
    this.scrollAmountMenuTitle += this.scrollStepMenuTitleManual;
    this.menuTitleRolante.nativeElement.scrollTo({
      left: this.scrollAmountMenuTitle,
      behavior: 'smooth'
    });
  }

  scrollLeftMenuTitle(): void {
    this.scrollAmountMenuTitle -= this.scrollStepMenuTitleManual;
    this.menuTitleRolante.nativeElement.scrollTo({
      left: this.scrollAmountMenuTitle,
      behavior: 'smooth'
    });
  }

  // ===== Filtro de notícias =====
  private getUltimosPorCategoria(cat: string, qtd: number): Noticia[] {
    const filtradas = this.noticias.filter(n => n.categoria === cat);
    const ordenadas = filtradas.slice().sort((a, b) => {
      const da = a.dataPublicacao ? new Date(a.dataPublicacao).getTime() : 0;
      const db = b.dataPublicacao ? new Date(b.dataPublicacao).getTime() : 0;
      return db - da;
    });
    return ordenadas.slice(0, qtd);
  }

  private getAntigosPorCategoria(cat: string, qtd: number): Noticia[] {
    const filtradas = this.noticias.filter(n => (n.categoria || '').toLowerCase() === cat.toLowerCase());
    const ordenadas = filtradas.slice().sort((a, b) => {
      const da = a.dataPublicacao ? new Date(a.dataPublicacao).getTime() : 0;
      const db = b.dataPublicacao ? new Date(b.dataPublicacao).getTime() : 0;
      return da - db; // ordem crescente → mais antigos primeiro
    });
    return ordenadas.slice(0, qtd);
  }

  private montarBigNews(): void {
    const antigoAnime = this.getAntigosPorCategoria('Anime', 1);
    const antigoManga = this.getAntigosPorCategoria('Manga', 1);
    const antigoManhwa = this.getAntigosPorCategoria('Manhwa', 1);

    this.bigNewsCard = [
      ...antigoAnime,
      ...antigoManga,
      ...antigoManhwa
    ];
  }

  filtrarNoticias(categoria: string): void {
    if (!categoria || categoria === 'todos') {
      // 4 últimas de cada categoria (Anime, Manga, Gamer)
      const ultimosAnime = this.getUltimosPorCategoria('Anime', 4);
      const ultimosManga = this.getUltimosPorCategoria('Manga', 4);
      const ultimosGamer = this.getUltimosPorCategoria('Gamer', 4);

      // Junta as 12 notícias
      this.ultimasNoticias = [...ultimosAnime, ...ultimosManga, ...ultimosGamer];
      return;
    }

    // Caso seja uma categoria específica → pega só 4 últimas daquela
    this.ultimasNoticias = this.getUltimosPorCategoria(categoria, 4);
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}