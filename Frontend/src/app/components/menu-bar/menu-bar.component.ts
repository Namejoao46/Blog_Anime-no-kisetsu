import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
 
  @Input()
  photoLogo:string =""

  @Input()
  buttom:string =""

  @Input()
  nomeSite:string =""

  @Input()
  link:string =""

  @Input()
  img:string =""

  @Input()
  nomeLogo:string =""

  constructor(){

  }

  ngOnInit(): void{

  }

}
