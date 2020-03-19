import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CompleterData, CompleterService } from 'ng2-completer';
import { PercentPipe } from '../../../../../../node_modules/@angular/common';
import { VendorService } from 'src/app/templates/modules/vendor-and-customer/services/vendor.service';
import { CategoryproductService } from '../services/categoryproduct.service';
import { Category, Product } from '../../../../core/common/_models';
import { Discount } from '../../../../core/common/_models/discount';
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import { DiscounteditComponent } from './discountedit/discountedit.component';
import { AdddiscountComponent } from './adddiscount/adddiscount.component';

// addnewcategory start
@Component({
  selector: 'discount',
  styleUrls: ['./discount.component.scss'],
  templateUrl: './discount.component.html', 
})
export class DiscountComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  category:Category;
  //Discount Table
  displayedColumns3: string[] = [
    'Product',
    'discount'
    ,'discounttime',
    'Qty',
    'price',
    'Action'
  ];
  dataSource3: MatTableDataSource<any>;
  alldiscountlist: any= {};
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  discount:Discount;
  dialogConfig = new MatDialogConfig();
  constructor(
    private catprodservice: CategoryproductService,
    private dialog: MatDialog,
    //public dialogRef: MatDialogRef<DiscountComponent>,
    private snackBar: MatSnackBar,
    private printDialogService: PrintDialogService

    ) {
    }
    ngOnInit() {
   
        this.alldiscountList();

    }
  
  alldiscountList(){
    let discount="discount";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discount code -->"+this.alldiscountlist.discountcode);
        this.dataSource3 = new MatTableDataSource(this.alldiscountlist);
        this.dataSource.paginator = this.paginator;
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

  discountEdit(discountcode:string){
    console.log("discount code --> "+discountcode);
    console.log("inside discountEdit ");
    //this.successdialog = 'block';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      panelClass: 'discountedit',
      data: discountcode,
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(discountcode: string){
    console.log("discount detlete - promotion code -->"+discountcode);
    this.catprodservice.discountremove(discountcode)
      .subscribe(
        data => {
          this.discount =  data;  
          if(this.discount.status == "Success"){
            setTimeout(() => {
              this.snackBar.open("Discount Deleted Successfully", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });      
        }else if(this.discount.status == "failure"){
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
        });      }
    );
  }

  addpromotion(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AdddiscountComponent,{
      panelClass: 'addpromotion'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
      this.alldiscountList();
    });
      
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

}
