import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryproductService } from '../services/categoryproduct.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from "@angular/material";
import { AddnewcategoryComponent } from '../categoryitem/categoryitem.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(private router: Router,
    private dialog: MatDialog,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar
  ) { }

  categorylist:any = {};
  model:any = {};
  dialogConfig = new MatDialogConfig();

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory(){
    this.catprodservice.load()
     .subscribe(
       data => {
         this.categorylist = data;
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

  categoryedit(categorycode:string,name:string,desc:string){
    //alert(code);
    //alert(name);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(AddnewcategoryComponent,{ 
      panelClass: 'addNewCategory',
      data: {categorycode: categorycode, name: name,desc: desc},
      height:'55vh',width:'80vh',
    })
    .afterClosed().subscribe(result => {
      this.loadCategory();
    }); 
    
  }

  categorydelete(categorycode:string){
    this.catprodservice.remove(categorycode)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Category Deleted Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.loadCategory();
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
