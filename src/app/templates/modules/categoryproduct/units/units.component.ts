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
  model:any = {};

  ngOnInit() {
    this.model.rowId = "RowId";
    this.loadUnits();
  }

  loadUnits(){
    let id = "all";
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

  unitedit(){
    this.model.rowId = "";
    this.model.rowId = "editRowId";
  }

  unitdelete(id:string){
    this.catprodservice.removeUnit(id)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Unit Deleted Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.loadUnits();
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
