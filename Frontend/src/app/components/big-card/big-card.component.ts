import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-card',
  imports: [],
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent {

  @Input()
  photoCover:string =""
  @Input()
  bigTitle:string =""
  @Input()
  cardName:string =""
  @Input()
  cardData:string =""

  constructor() {

  }


}
