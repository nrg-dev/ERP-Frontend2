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

  getUnitPrice(productName:string,categorycode:string){
    alert("Product Name -->"+productName);
    alert("CategoryCode -->"+categorycode);
  }

  newPurchaseOrder(){
    this.purchasetable = true;
   // this.newAttribute = {};
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    //this.fieldArray.push(this.newAttribute);

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
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
    this.purchaseService.save(this.purchasesearcharray,this.model.vendorName)
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
