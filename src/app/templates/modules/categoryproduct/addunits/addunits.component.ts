import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { CategoryproductService } from '../services/categoryproduct.service';

@Component({
  selector: 'app-addunits',
  templateUrl: './addunits.component.html',
  styleUrls: ['./addunits.component.scss']
})
export class AddunitsComponent implements OnInit {
  model: any = {};

  constructor(
    private router: Router,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar
  ) { }

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
    this.catprodservice.saveUnit(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Unit Saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
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

}
