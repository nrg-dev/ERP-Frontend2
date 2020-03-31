import { Component, OnInit } from '@angular/core';
import { InteractionService } from './../../common/_services/interaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText:string;

  constructor(private interactionService: InteractionService) { }

  ngOnInit() { }

  toggleSideNavi() {
    this.interactionService.toggleSideNavi();
  }

}
