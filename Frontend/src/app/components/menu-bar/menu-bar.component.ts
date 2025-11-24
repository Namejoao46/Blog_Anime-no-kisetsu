import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  menuAberto = false;

  constructor(private el: ElementRef){}

   alternarMenu(){
  this.menuAberto = !this.menuAberto;
 }

 fecharMenu(){
  this.menuAberto = false;
 }

 //Escuta qualquer clique no documento — se for fora do menu, ele fecha
 @HostListener('document:click', ['$event'])
 onDocumentClick(event: MouseEvent){
  //Verifica se o clique foi dentro do componente (true) ou fora (false)
  const clicadoDentro = this.el.nativeElement.contains(event.target);
  if (!clicadoDentro && this.menuAberto){
    this.menuAberto = false;
  }
 }

}
