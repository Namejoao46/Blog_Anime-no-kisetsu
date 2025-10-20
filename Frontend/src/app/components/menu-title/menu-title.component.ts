import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-title',
  imports: [],
  templateUrl: './menu-title.component.html',
  styleUrls: ['./menu-title.component.css']
})
export class MenuTitleComponent {

  @Input()
  photoCover:string =""
  @Input()
  cardName:string =""
  @Input()
  cardData:string =""
  @Input()
  cardTitle:string =""
  @Input()
  cardDescription:string =""

  constructor() {

  }

  ngOnInit(): void{
    
  }

}
