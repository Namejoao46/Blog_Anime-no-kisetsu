import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuTitleComponent } from "../../components/menu-title/menu-title.component";
import { MenuBarComponent } from "../../components/menu-bar/menu-bar.component";
import { NoticiasComponent } from "../../components/noticias/noticias.component";
import { NoticiasVerticalComponent } from '../../components/noticias-vertical/noticias-vertical.component';
import { BigCardComponent } from "../../components/big-card/big-card.component";


@Component({
  selector: 'app-home',
  imports: [MenuTitleComponent, MenuBarComponent, NoticiasComponent, NoticiasVerticalComponent, BigCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit { // Adiciona AfterViewInit para executar código após a exibição do componente
  @ViewChild('newsRolante', { static: false }) newsRolante!: ElementRef;
  @ViewChild('newsOne', { static: false }) newsOne!: ElementRef;
  @ViewChild('newsTwo', { static: false }) newsTwo!: ElementRef;
  @ViewChild('newsTree', { static: false }) newsTree!: ElementRef;
  @ViewChild('newsFourt', { static: false }) newsFourt!: ElementRef;
  @ViewChild('bigCard', { static: false }) bigCard!: ElementRef;
   // Obtém uma referência ao contêiner das notícias 

  scrollAmount = 0; // Variável para controlar a posição atual da rolagem
  scrollStep = 0; // Definido dinamicamente pelo tamanho de um card, evitando saltos múltiplos na rolagem

  // Controle de rolagem vertical
  scrollAmountVertical = {newsOne: 0, newsTwo: 0, newsTree: 0, newsFourt: 0};
  scrollStepVertical = 0;

  scrollAmountBigCard = 0;
  scrollStepBigCard = 0;

  /* ==== Método executado após a inicialização do componente ==== */
  ngAfterViewInit(): void { 
    this.definirScrollStep(); // Chama o método para definir dinamicamente o tamanho de um card
    this.definirScrollStepVertical();
    this.definirScrollStepBigCard();
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
}