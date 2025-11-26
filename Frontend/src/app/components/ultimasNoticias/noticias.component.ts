import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ultimas-noticias',
  imports: [],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class UltimasNoticiasComponent {

  @Input()
  photoCover:string =""
  @Input()
  cardName:string =""
  @Input()
  cardData:string =""
  @Input()
  cardDescription:string =""
  @Input() 
  cardCategory!: string;
  

  constructor() {

  }
  ngOnInit(): void{

  }

}
