import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addunits',
  templateUrl: './addunits.component.html',
  styleUrls: ['./addunits.component.scss']
})
export class AddunitsComponent implements OnInit {
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  addUnit() {
    console.log(this.model.unitname);
    console.log(this.model.unitsymbol);
    console.log(this.model.quantityname);
    console.log(this.model.quantitysymbol);
    console.log(this.model.dimensionsymbol);
  }
}
