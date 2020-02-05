import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Purchase } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { PurchaseService } from '../purchase.service';

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
  selector: 'app-purchaseadd',
  templateUrl: './purchaseadd.component.html',
  styleUrls: ['./purchaseadd.component.css']
})
export class PurchaseaddComponent  implements OnInit  {
  purchase:Purchase = new Purchase();
//  purchase:Purchase;

  model: any ={};
  public purchasetable = false;
  headElements = ['#ID', 'Product Name', 'Category Name', 'Quantity'];
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();
  dialogConfig = new MatDialogConfig();

  fieldArray: Array<any> = [];
  newAttribute: any = {};

  productList: any = {};
  categoryList: any = {};
  vendorList:  any = {};

  firstField = true;
  unitArray : any = [];
  i:number=0;
  public subTotalArray : any = [];
  j:number=0;
  
  constructor( public fb: FormBuilder,
    private dialog: MatDialog,
    private purchaseService:PurchaseService,
    private cd: ChangeDetectorRef, private router: Router, private alertService: AlertService) { 

    }

  ngOnInit() {
    this.purchasetable = false;
    this.getVendorList();
    this.getcategoryList();
    this.getProductList();
    this.model.sNo = 0;
  }

  getVendorList(){
    this.purchaseService.loadVendor()
    .subscribe(res => { 
      this.vendorList = res;
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

  /*getProductName(category:string){
    this.purchaseService.loadItem(category)
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        alert('Error !!!!');
      }
    );
  }*/

  getUnitPrice(productName:string,category:string,quantity:number,sNo:number){
    let totalCommission = 0.0;
    this.purchaseService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.purchase = data; 
        console.log("Unit Price back end -->"+this.purchase.price);
        console.log("Unit Prize initial -->"+this.unitArray[this.i]);
        this.unitArray[this.i] = this.purchase.price;
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
    this.purchase.netAmount = quantity*price;
  }

  newPurchaseOrder(sNo: number){
    this.purchasetable = true;
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.model.sNo = sNo+1;
    this.purchase.id = this.model.sNo;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log("Size -->"+this.fieldArray.length);
    if(this.fieldArray.length==0){
      this.fieldArray = [];
      this.unitArray = [];
      this.subTotalArray = [];
      this.model.vendorName = '';
      this.model.sNo = 0;
      this.model.subTotal = '';
      this.model.deliveryCost = '';
      this.i = 0;
      this.j = 0;
    }
    this.model.sNo = this.fieldArray.length;
    if(this.fieldArray[0]){
      this.purchasetable = true;
    }else{
      this.purchasetable = false;
    }
  }
  purchasesearcharray: Array<any> = [];
  vendorname: Array<any> = [];
  savePurchase(){
    this.purchasesearcharray=[];
    console.log(this.fieldArray);
    this.purchasesearcharray.push(this.fieldArray);
    console.log("Purchase Array -->"+this.purchasesearcharray);
    console.log(this.purchasesearcharray);
    this.purchase.vendorName = this.model.vendorName;
    this.purchaseService.save(this.purchasesearcharray,this.model.vendorName,this.model.deliveryCost)
   .subscribe(
       res => {
         console.log('............1 ....');
         //if(res.status ="success"){
          this.alertService.success("Successfully saved ");
          setTimeout(() => {
           this.alertService.clear();
         }, 2000);
         this.fieldArray = [];
         this.unitArray = [];
         this.subTotalArray = [];
         this.purchasetable = false;
         this.model.vendorName = '';
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


  cancelEmp(){
    console.log("------ Cancel Employeee -------");
  }

  public getstatus(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(Status,{
    //  data: {dialogTitle: "hello", dialogText: "text"},
      data: "issueId",
      height: '80%'
    }).afterClosed().subscribe(result => {
    // this.refresh();
    });
  }
  //htmlData:any;
  purchaseInvoice(){
    //this.htmlData = this.Status;
  }
  
}
