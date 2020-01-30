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
        alert('Error !!!!');
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        alert('Error !!!!');
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        alert('Error !!!!');
      }
    );
  }

  getProductName(category:string){
   /* this.purchaseService.loadItem(category)
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        alert('Error !!!!');
      }
    );*/
  }
  unitArray : any = [];
  i:number=0;
 public subTotalArray : any = [];
  j:number=0;
  getUnitPrice(productName:string,category:string,quantity:number){
    this.purchaseService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.purchase = data; 
        console.log("Unit Price -->"+this.purchase.price);
        this.unitArray[this.i] = this.purchase.price;
        this.subTotalArray[this.j] = quantity*this.unitArray[this.i];
        console.log("Sub Total -->"+this.subTotalArray[this.j]);
        this.i++;
        this.j++;
      },
      error => {
        this.alertService.success("Server Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }
    );
  }
  getSubTotal(quantity:number,price:number){
    alert("Qty -->"+quantity);
    alert("price -->"+price);
    this.purchase.netAmount = quantity*price;
  }

  newPurchaseOrder(sNo: number){
    this.purchasetable = true;
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.model.sNo = sNo+1;
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    //this.model.sNo = this.fieldArray[index]-1;
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
          console.log('successfully updated...');
          this.alertService.success("Successfully saved ");
          setTimeout(() => {
           this.alertService.clear();
         }, 2000);
         this.fieldArray = [];
         this.purchasetable = false;
         this.model.vendorName = '';
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
    alert("------ Cancel Employeee -------");
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
    });;
  }
  //htmlData:any;
  purchaseInvoice(){
    //this.htmlData = this.Status;
  }
  
}
