import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Sales } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SalesService } from '../sales.service';
import { PurchaseService } from 'src/app/purchase/purchase.service';

//==== Status 
@Component({
  selector: 'status',
  styleUrls: ['./status.css'],
  templateUrl: './status.html', 
})
export class Status {


  constructor(
    public dialogRef: MatDialogRef<Status>,
    ) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateDelete(){
    console.log("updateDelete");
  }
}

@Component({
  selector: 'app-salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})
export class SalesorderComponent implements OnInit {
  sales:Sales;
  model: any ={};
  public salestable = false;
  headElements = ['#ID', 'Product Name', 'Category Name', 'Quantity'];
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  dialogConfig = new MatDialogConfig();

  fieldArray: Array<any> = [];
  newAttribute: any = {};
  firstField = true;
  salesarray: Array<any> = [];

  productList: any = {};
  categoryList: any = {};
  customerList:  any = {};

  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private purchaseService:PurchaseService,
    private salesService:SalesService,
    private cd: ChangeDetectorRef, 
    private router: Router, 
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.salestable = false;
    this.getVendorList();
    this.getcategoryList();
    this.getProductList();

    //this.customerList = ['Nisho','Alex','Josni','Mary'];
    //this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    //this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
  }

  getVendorList(){
    this.salesService.loadCustomerList()
    .subscribe(res => { 
      this.customerList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }


  newSalesOrder(){
    this.salestable = true;
     this.fieldArray.push(this.newAttribute);
     this.newAttribute = {}; 
  }
 
  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    if(this.fieldArray[0]){
      this.salestable = true;
    }else{
      this.salestable = false;
    }
  }

  saveSales(){
    this.salesarray = [];
    this.salesarray.push(this.fieldArray);
    this.salesarray.push(this.newAttribute);
    console.log(this.salesarray);

   this.salesService.save(this.salesarray)
   .subscribe(
       res => {
         console.log('............1 ....');
         console.log('value -->'+res.status);
         if(res.status ="success"){
          console.log('successfully updated...');
          this.alertService.success("Successfully saved ");
          setTimeout(() => {
           this.alertService.clear();
         }, 2000);

        }
                        
       },
       error => {
        this.alertService.error("Network error: server is temporarily unavailable");

       });
  }

  cancelSales(){
    alert("------ Cancel Sales -------");
  }
  
}
