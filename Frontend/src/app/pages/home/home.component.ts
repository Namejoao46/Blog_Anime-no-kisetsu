import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuTitleComponent } from "../../components/menu-title/menu-title.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { NoticiasComponent } from "../../components/noticias/noticias.component";
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
  imports: [MenuTitleComponent, MenuBarComponent, NoticiasComponent, NoticiasVerticalComponent, BigCardComponent, CommonModule, FormsModule, RouterModule, RodapeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit { // Adiciona AfterViewInit para executar código após a exibição do componente
  @ViewChild('menuTitleRolante') menuTitleRolante!: ElementRef;
  @ViewChild('newsRolante', { static: false }) newsRolante!: ElementRef;
  @ViewChild('newsOne', { static: false }) newsOne!: ElementRef;
  @ViewChild('newsTwo', { static: false }) newsTwo!: ElementRef;
  @ViewChild('newsTree', { static: false }) newsTree!: ElementRef;
  @ViewChild('newsFourt', { static: false }) newsFourt!: ElementRef;
  @ViewChild('bigCard', { static: false }) bigCard!: ElementRef;
   // Obtém uma referência ao contêiner das notícias 

  scrollStepMenuTitle = 1553; // largura total de um card
  scrollAmountMenuTitle = 0;

  scrollAmount = 0; // Variável para controlar a posição atual da rolagem
  scrollStep = 0; // Definido dinamicamente pelo tamanho de um card, evitando saltos múltiplos na rolagem

  // Controle de rolagem vertical
  scrollAmountVertical = {newsOne: 0, newsTwo: 0, newsTree: 0, newsFourt: 0};
  scrollStepVertical = 0;

  scrollAmountBigCard = 0;
  scrollStepBigCard = 0;

  noticias: Noticia[] = [];
  bigCards: Noticia[] = [];
  ultimasNoticias: Noticia[] = [];
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
      console.log('Notícias recebidas:', this.noticias); // 👈 ADICIONE AQUI
      this.organizarNoticias();
    });
  }

  organizarNoticias(): void {
    // Pega uma notícia de cada categoria para os bigCards
    this.bigCards = this.categorias.flatMap(cat => {
      const noticia = this.noticias.find(n => n.categoria === cat);
      return noticia ? [noticia] : [];
    });

    // Últimas 12 notícias
    this.ultimasNoticias = this.noticias.slice(0, 12);

    // Notícias agrupadas por categoria e subcategoria
    this.categorias.forEach(cat => {
      this.noticiasPorCategoria[cat] = {};

      this.noticias
        .filter(n => n.categoria === cat)
        .forEach(n => {
          const sub = n.subcategoria || 'Geral'; // garante valor
          if (!this.noticiasPorCategoria[cat][sub]) {
            this.noticiasPorCategoria[cat][sub] = [];
          }
          this.noticiasPorCategoria[cat][sub].push(n);
        });
    });
  }

  /* ==== Método executado após a inicialização do componente ==== */
  ngAfterViewInit(): void { 
    this.definirScrollStep(); // Chama o método para definir dinamicamente o tamanho de um card
    this.definirScrollStepVertical();
    this.definirScrollStepBigCard();
    this.definirScrollStepMenuTitle();
  }

  definirScrollStepMenuTitle(): void {
    const primeiroCard = this.menuTitleRolante.nativeElement.querySelector("app-menu-title");
    if (primeiroCard) {
      const style = window.getComputedStyle(primeiroCard);
      const marginRight = parseInt(style.marginRight || '0', 10);
      this.scrollStepMenuTitle = primeiroCard.clientWidth + marginRight;
    }
  }

  /* ==== Método para definir dinamicamente o tamanho do scrollStep ==== */
  definirScrollStep(): void {
    const primeiroCard = this.newsRolante.nativeElement.querySelector("app-noticias"); // Obtém o primeiro card de notícias
    if (primeiroCard) {
      this.scrollStep = primeiroCard.clientWidth; // Define o passo da rolagem como o tamanho exato de um card individual
    }
  }

  definirScrollStepVertical(): void {
    const primeiroCard = this.newsOne.nativeElement.querySelector("app-noticias-vertical"); // Obtém o primeiro card de notícias
    if (primeiroCard) {
      this.scrollStepVertical = primeiroCard.clientHeight; // Define o passo da rolagem como o tamanho exato de um card individual
    }
  }

  definirScrollStepBigCard(): void{
    const primeiroCard = this.bigCard.nativeElement.querySelector("app-big-card"); // Obtém o primeiro card de notícias
    if (primeiroCard) {
      this.scrollStepBigCard = primeiroCard.scrollWidth; // Define o passo da rolagem como o tamanho exato de um card individual
    }
  }

  /*=== horizontal ===*/
  /* ==== Método para rolar para a direita ==== */
  scrollRight(): void {
    this.scrollAmount += this.scrollStep; // Incrementa a posição da rolagem em um card
    this.newsRolante.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' }); // Move o scroll suavemente para a direita
  }

  /* ==== Método para rolar para a esquerda ==== */
  scrollLeft(): void {
    this.scrollAmount -= this.scrollStep; // Decrementa a posição da rolagem em um card
    this.newsRolante.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' }); // Move o scroll suavemente para a esquerda
  }

  scrollRightBigCard(): void {
    this.scrollAmountBigCard += this.scrollStepBigCard; // Incrementa a posição da rolagem em um card
    this.bigCard.nativeElement.scrollTo({ left: this.scrollAmountBigCard, behavior: 'smooth' }); // Move o scroll suavemente para a direita
  }

  /* ==== Método para rolar para a esquerda ==== */
  scrollLeftBigCard(): void {
    this.scrollAmountBigCard -= this.scrollStepBigCard; // Decrementa a posição da rolagem em um card
    this.bigCard.nativeElement.scrollTo({ left: this.scrollAmountBigCard, behavior: 'smooth' }); // Move o scroll suavemente para a esquerda
  }

  /*=== vertical ===*/
  /* ==== Método para subir ==== */
  scrollUp(newsId: 'newsOne' | 'newsTwo' | 'newsTree' | 'newsFourt'): void {
    this.scrollAmountVertical[newsId] -= this.scrollStepVertical; // Incrementa a posição da rolagem em um card
    this[newsId].nativeElement.scrollTo({ top: this.scrollAmountVertical[newsId], behavior: 'smooth' }); // Move o scroll suavemente para a direita
  }

  /* ==== Método para descer ==== */
  scrollDown(newsId: 'newsOne' | 'newsTwo' | 'newsTree' | 'newsFourt'): void {
    this.scrollAmountVertical[newsId] += this.scrollStepVertical; // Decrementa a posição da rolagem em um card
    this[newsId].nativeElement.scrollTo({ top: this.scrollAmountVertical[newsId], behavior: 'smooth' }); // Move o scroll suavemente para a esquerda
  }

  scrollRightMenuTitle(): void {
    this.scrollAmountMenuTitle += this.scrollStepMenuTitle;
    this.menuTitleRolante.nativeElement.scrollTo({
      left: this.scrollAmountMenuTitle,
      behavior: 'smooth'
    });
  }

  scrollLeftMenuTitle(): void {
    this.scrollAmountMenuTitle -= this.scrollStepMenuTitle;
    this.menuTitleRolante.nativeElement.scrollTo({
      left: this.scrollAmountMenuTitle,
      behavior: 'smooth'
    });
  }

  /* ==== Método para filtrar notícias por categoria ==== */
  filtrarNoticias(categoria: string): void {
    const cards = document.querySelectorAll("app-noticias"); // Obtém todos os cards de notícias no DOM

    cards.forEach(card => {
      const cardElement = card as HTMLElement; // Converte para HTMLElement para acessar `style.display`
      const CardCategory = cardElement.getAttribute("cardCategory"); // Obtém a categoria do card

      if (!categoria || categoria === "todos") {
        cardElement.style.display = "block"; // Exibe todas as notícias quando nenhuma categoria específica é selecionada
      } else {
        cardElement.style.display = CardCategory === categoria ? "block" : "none"; // Exibe apenas os cards da categoria selecionada
      }
    });
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

}