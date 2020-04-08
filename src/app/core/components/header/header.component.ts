import { Component, OnInit, HostListener } from '@angular/core';
import { InteractionService } from './../../common/_services/interaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText:string;

  @HostListener('document:click', ['$event']) closeNaviOnOutClick(event) {
    
    if (event.target && event.target.classList.contains('header-menu')){
      return;
    }
    if (event.target && event.target.classList.contains('navi-link-deduct')) {
      return;
    }
    if (event.target && event.target.classList.contains('child-shuffle')) {
      return;
    }
    
    this.interactionService.toggleSideNavi(false);
  }
  
  constructor(private interactionService: InteractionService) { }

  ngOnInit() { }

  toggleSideNavi() {
    this.interactionService.toggleSideNavi();
  }

}
