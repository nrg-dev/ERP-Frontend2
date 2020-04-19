import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  constructor(private router: Router) { }

  public NAMES = [];
  ngOnInit() {
   
for (let i = 1; i < 100; i++) {
    let newName = {
       id:i.toString(),
       value1:"Ubalton",
       value2:"+91 88704662431",
       value3:"alex@gmail.com",
       value4:"Tamil Nadu",
       value5:"India",
       value6:"+91 4763212",
       value7:"10000",
       value8:"MCA",
       value9:"Male",
       value10:"Active",
       value11:"Delhi",
    };
    this.NAMES.push(newName);
}
  }
  addNewUnits(){
    this.router.navigate(["category-and-product/addunits"]);
  }
}
