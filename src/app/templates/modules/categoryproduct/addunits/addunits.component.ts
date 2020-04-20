import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addunits',
  templateUrl: './addunits.component.html',
  styleUrls: ['./addunits.component.scss']
})
export class AddunitsComponent implements OnInit {
  model: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  unitClose(){
    this.router.navigate(["category-and-product/units"]);
  }

  addUnit() {
    console.log(this.model.unitname);
    console.log(this.model.unitsymbol);
    console.log(this.model.quantityname);
    console.log(this.model.quantitysymbol);
    console.log(this.model.dimensionsymbol);
  }

}
