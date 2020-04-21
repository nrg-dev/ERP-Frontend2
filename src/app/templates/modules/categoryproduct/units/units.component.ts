import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryproductService } from '../services/categoryproduct.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  constructor(private router: Router,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar
  ) { }

  unitlist:any = {};

  ngOnInit() {
   
    let id = "all";
     //--load unitList
     this.catprodservice.loadUnitList(id)
      .subscribe(
        data => {
          this.unitlist = data;
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
        }
      );

  }
  addNewUnits(){
    this.router.navigate(["category-and-product/addunits"]);
  }
}
