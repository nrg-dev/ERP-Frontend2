import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryproductService } from '../services/categoryproduct.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from "@angular/material";
import { AddunitsComponent } from '../addunits/addunits.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  constructor(private router: Router,
    private catprodservice: CategoryproductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  unitlist:any = {};
  model:any = {};
  dialogConfig = new MatDialogConfig();

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

  unitedit(id:number,unitname:string,unitsymbol:string,quantityname:string,quantitysymbol:string,dimensionsymbol:string){
    this.model.rowId = "";
    this.model.rowId = "editRowId";
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(AddunitsComponent,{ 
      panelClass: 'addNewUnit',
      data: {id: id, unitname: unitname,unitsymbol: unitsymbol,quantityname:quantityname,quantitysymbol:quantitysymbol,dimensionsymbol:dimensionsymbol},
      height:'90vh',width:'150vh',
    })
    .afterClosed().subscribe(result => {
      this.loadUnits();
    }); 
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
