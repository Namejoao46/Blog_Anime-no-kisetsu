import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-noticias-vertical',
  imports: [],
  templateUrl: './noticias-vertical.component.html',
  styleUrls: ['./noticias-vertical.component.css']
})
export class NoticiasVerticalComponent {
  @Input()
  photoNews:string =""
  @Input()
  titleNews:string =""
  @Input()
  cardName:string =""
  @Input()
  cardData:string =""
  @Input()
  textNews:string =""

  constructor(){

  }
  ngOnInit(): void{

  }
}
