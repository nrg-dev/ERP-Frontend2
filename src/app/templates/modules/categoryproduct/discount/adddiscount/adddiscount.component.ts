import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Discount } from '../../../../../core/common/_models/discount';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CategoryproductService } from '../../services/categoryproduct.service';
import { CompleterData, CompleterService } from 'ng2-completer';

// add promostion start
@Component({
    selector: 'adddiscount',
    styleUrls: ['./adddiscount.component.scss'],
    templateUrl: './adddiscount.component.html', 
  })
  export class AdddiscountComponent {
    countryList:any;
    priorityList:any;
    model: any = {};
    allcategorylist:any= {};
    allitemnamelist:any= {};
    discount:Discount;
    //protected dataService: CompleterData;
    public dataService: CompleterData;
    
    constructor(
      public dialogRef: MatDialogRef<AdddiscountComponent>,
      private catprodservice: CategoryproductService,
      private completerService: CompleterService,
      private snackBar: MatSnackBar
      ) {
        this.catprodservice.load()
        .subscribe(
           data => {
             this.allcategorylist = data;
             console.log("category name"+this.allcategorylist);
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
  
        //all item load
        this.catprodservice.loadItemName()
        .subscribe(
           data => {
             this.allitemnamelist = data;
             this.dataService = completerService.local(this.allitemnamelist);  
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
  
      savePromotion(){
        console.log("Category Name -->"+this.model.categorycode);
        console.log("Item Name -->"+this.model.productname);
        console.log("discount from date-->"+this.model.fromdate_promotionperiod);
        console.log("discount to date-->"+this.model.todate_promotionperiod);
        console.log("discount type -->"+this.model.discountType);
        console.log("discount qty  -->"+this.model.qty);
        console.log("Free gift  -->"+this.model.freegift);
        console.log("Other item  -->"+this.model.others);
  
        this.catprodservice.addpromotionsave(this.model)
        .subscribe(
          data => {
            this.discount =   data; 
            this.dialogRef.close();
            if(this.discount.status=="success"){
              setTimeout(() => {
                this.snackBar.open("Promotion created Successfully", "dismss", {
                  panelClass: ["success"],
                  verticalPosition: 'top'      
                });
              });
             
            } 
            if(this.discount.status=="failure"){
              setTimeout(() => {
                this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
                  panelClass: ["error"],
                  verticalPosition: 'top'      
                });
              });   
            }
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
      close(e) {
      this.dialogRef.close();
    }
  }
  // add promostion end
  