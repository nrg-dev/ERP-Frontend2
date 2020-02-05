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
  sales:Sales = new Sales();
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

  productList: any = {};
  categoryList: any = {};
  customerList:  any = {};

  salesarray: Array<any> = [];
  unitArray : any = [];
  i:number=0;
  public subTotalArray : any = [];
  j:number=0;

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
    this.getCustomerList();
    this.getcategoryList();
    this.getProductList();
    this.model.sNo = 0;
  }

  getCustomerList(){
    console.log("getCustomerList");
    this.salesService.loadCustomerList()
    .subscribe(res => { 
      this.customerList = res;
      console.log("customer list size -->"+this.customerList.length);

      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategoryName()
    .subscribe(res => { 
      this.categoryList = res;
      console.log("Category list size -->"+this.categoryList.length);

      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItemName()
    .subscribe(res => { 
      this.productList = res;
      console.log("Item list size -->"+this.productList.length);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getUnitPrice(productName:string,category:string,quantity:number,sNo:number){
    let totalCommission = 0.0;
    this.salesService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.sales = data; 
        console.log("Unit Price back end -->"+this.sales.price);
        console.log("Unit Prize initial -->"+this.unitArray[this.i]);
        this.unitArray[this.i] = this.sales.price;
        this.subTotalArray[this.j] = quantity*this.unitArray[this.i];
        this.fieldArray[this.i].unitPrice = this.unitArray[this.i];
        this.fieldArray[this.i].netAmount = this.subTotalArray[this.j];
        console.log(this.fieldArray);
        totalCommission +=  this.fieldArray[this.i].netAmount;
        this.model.subTotal = totalCommission;
        this.i++;
        this.j++;
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }
    );
  }
  getSubTotal(quantity:number,price:number){
    console.log("Qty -->"+quantity);
    console.log("price -->"+price);
    this.sales.netAmount = quantity*price;
  }

  newSalesOrder(sNo: number){
    this.salestable = true;
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.model.sNo = sNo+1;
    this.sales.id = this.model.sNo;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log("Size -->"+this.fieldArray.length);
    if(this.fieldArray.length==0){
      this.fieldArray = [];
      this.unitArray = [];
      this.subTotalArray = [];
      this.model.customerName = '';
      this.model.sNo = 0;
      this.model.subTotal = '';
      this.model.deliveryCost = '';
      this.i = 0;
      this.j = 0;
    }
    this.model.sNo = this.fieldArray.length;
    if(this.fieldArray[0]){
      this.salestable = true;
    }else{
      this.salestable = false;
    }
  }

  saveSales(){
    this.salesarray=[];
    console.log(this.fieldArray);
    this.salesarray.push(this.fieldArray);
    console.log("Purchase Array -->"+this.salesarray);
    console.log(this.salesarray);
    this.sales.customerName = this.model.customerName;

    this.salesService.save(this.salesarray,this.model.customerName,this.model.deliveryCost)
    .subscribe(
       res => {
          console.log('............1 ....');
          console.log('value -->'+res.status);
          //if(res.status ="success"){
            console.log('successfully updated...');
            this.alertService.success("Successfully saved ");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
            this.fieldArray = [];
            this.unitArray = [];
            this.subTotalArray = [];
            this.salestable = false;
            this.model.customerName = '';
            this.model.sNo = 0;
            this.model.subTotal = '';
            this.model.deliveryCost = '';
            this.i = 0;
            this.j = 0;
       // }
                        
       },
       error => {
        this.alertService.success("API server Issue..");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
       });
  }

  cancelSales(){
    console.log("------ Cancel Sales -------");
  }
  
}
