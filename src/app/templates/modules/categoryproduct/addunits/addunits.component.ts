import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addunits',
  templateUrl: './addunits.component.html',
  styleUrls: ['./addunits.component.scss']
})
export class AddunitsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  unitClose(){
    this.router.navigate(["category-and-product/units"]);
  }

}
