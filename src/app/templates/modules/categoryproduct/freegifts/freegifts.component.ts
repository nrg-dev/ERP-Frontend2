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
import { DiscountComponent } from '../discount/discount.component';

// addnewcategory start
@Component({
  selector: 'freegifts',
  styleUrls: ['./freegifts.component.scss'],
  templateUrl: './freegifts.component.html',
  providers: [DiscountComponent] 
})
export class FreegiftsComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  category:Category;
 // Free Gift Data table
 displayedColumns2: string[] = [
  'productname',
  'discounttime'
  ,'action'
];
dataSource2: MatTableDataSource<any>;
  allfreegiftlist: any= {};
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort2: MatSort;

  constructor(
    private catprodservice: CategoryproductService,
    //public dialogRef: MatDialogRef<DiscountComponent>,
    private snackBar: MatSnackBar,
    private discountComponent: DiscountComponent

    ) {
    }
    ngOnInit() {
      this.allfreegiftList();
    }
  
    allfreegiftList(){
      console.log("free gift");
      let discount="freegift";
      this.catprodservice.loadDiscount(discount)
      .subscribe(
        data => {
          this.allfreegiftlist = data;
          this.dataSource2 = new MatTableDataSource(this.allfreegiftlist);
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort2;
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

    freegiftFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
