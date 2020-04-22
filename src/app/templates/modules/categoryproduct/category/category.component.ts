import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryproductService } from '../services/categoryproduct.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(private router: Router,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar
  ) { }

  categorylist:any = {};
  model:any = {};

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

  categoryedit(){
    
    
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
