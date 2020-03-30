import { Component, OnInit, ViewChild ,ElementRef,Inject, OnDestroy} from '@angular/core';
import { Purchase, User, Category } from 'src/app/core/common/_models';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'viewInvoice',
  styleUrls: ['./viewInvoice.css'],
  templateUrl: './viewInvoice.html', 
})
export class ViewInvoice {
  model: any ={};
  purchase: Purchase;
  public purchaseViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
      this.model.poDate = this.data.date;
      this.model.status = this.data.currentStatus;
      let totalCommission = 0.0;
      this.purchaseService.get(this.data.invoice)
      .subscribe(
        data => {
          this.purchaseViewList = data;
          for(let i=0; i<this.purchaseViewList.length; i++){
            this.model.invoiceNumber = this.purchaseViewList[0].invoicenumber;
            totalCommission +=  this.purchaseViewList[i].subtotal;
            this.model.subTotal = totalCommission;
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
      
      this.model.vendorname  = this.data.name;       
      this.vendorDetails(this.model.vendorname);
  }
  ngOnInit() {

  }

  vendorDetails(vendorname: string){
    this.purchaseService.getVendorDetails(vendorname)
    .subscribe(
      data => {
        this.purchase = data;
        console.log("Vendor Name -->"+this.purchase.vendorName);
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})
export class EditInvoice {
  model: any ={};
  purchase: Purchase = new Purchase;
  purchase1: Purchase = new Purchase;
  public purchaseEditList : any;
  public productList : any;
  public categoryList : any;
  public statusList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  public purchaseList:Array<Purchase> = [ ];
  purchaseeditarray: Array<any> = [];

  public priceArray : any = [];
  public descriptionArray : any = [];
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {  
      this.model.invoiceNumber = this.data.invoice;
      this.model.currentStatus = this.data.status;
      this.model.vendorName = this.data.vendorName;
      this.editDetails(this.model.invoiceNumber);
      this.getProductList();
      this.getcategoryList();
      this.statusList = ['Pending','On Progress','Success'];
    }

  getcategoryList(){
    this.purchaseService.loadCategoryName()
    .subscribe(res => { 
      this.categoryList = res;
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

  getProductList(){
    /*this.purchaseService.loadVendorItem(vendorName)
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );*/

    this.purchaseService.loadItemName()
    .subscribe(res => { 
      this.productList = res;
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

  editDetails(invoiceNumber:string){
    this.purchaseService.geteditDetails(invoiceNumber)
    .subscribe(
      data => {
        this.purchaseEditList = data;
        console.log("Length -->"+this.purchaseEditList.length);
        //this.model.category=this.p
        if(this.purchaseEditList.length == 0){
          console.log("--- No data Found ---");
        }else{
          for(let i=0;i<this.purchaseEditList.length;i++){
            console.log("--- category name ---"+this.purchaseEditList[i].category);
            console.log("--- product name ---"+this.purchaseEditList[i].itemname);
            console.log("--- s.no ---"+this.purchaseEditList[i].id);
            this.purchase = new Purchase;
            this.purchase.productName = this.purchaseEditList[i].itemname;
            this.purchase.category = this.purchaseEditList[i].category;
            this.purchase.description = this.purchaseEditList[i].description;
            this.purchase.quantity = this.purchaseEditList[i].qty;
            this.purchase.netAmount = this.purchaseEditList[i].subtotal;
            this.purchase.id = this.purchaseEditList[i].id;
            this.purchase.price = this.purchaseEditList[i].unitprice;
            //this.descriptionArray[this.i].unitPrice = this.purchaseEditList[i].description;
            this.purchase.invoiceNumber = this.purchaseEditList[i].invoicenumber;
            this.purchase.poDate = this.purchaseEditList[i].poDate;
            this.purchaseList.push(this.purchase);
          }

          for(let j=0; j<this.purchaseList.length; j++){
            console.log("Item Name ------>"+this.purchaseList[j].productName);
            console.log("Quantity ------>"+this.purchaseList[j].quantity);
            console.log("Description ------>"+this.purchaseList[j].description);
          }
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public deletePurchaseInvoice(id:string,invoiceNumber:string){
    this.purchaseService.removePartId(id,invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          setTimeout(() => {
            this.snackBar.open("Purchase Invoice Deleted Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.model.currentStatus = this.data.status;
        }else{
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

  getTotalAmount(productName:string,qty:string,category:string,id:string){
    var index;
    console.log("productName ==>"+productName);
    console.log("Qty ==>"+qty);
    console.log("category ==>"+category);
    console.log("Input ID ---->"+id);
    for (var i = 0; i < this.purchaseList.length ; i++) {
      console.log("Database ID  -------->"+this.purchaseList[i].id);
      if (this.purchaseList[i].id === id) {
        console.log("Index value --->"+i);
        index = i;
      }
    }
    this.purchaseService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.purchase = data; 
        console.log("Get UnitPrice  ----->"+this.purchase.sellingprice);
        let res = qty.replace(/\D/g, "");
        this.purchase.totalAmount = Number.parseInt(res) * this.purchase.sellingprice;
        console.log("Onchange Total Amount  ----->"+this.purchase.totalAmount);
        this.purchaseList[index].netAmount = this.purchase.totalAmount;
        this.purchaseList[index].price = this.purchase.sellingprice;
        
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

  updateInvoice(){
    this.purchase = new Purchase;
    for(let j=0; j<this.purchaseList.length; j++){
      console.log("Edited Category Name ------>"+this.purchaseList[j].category);
      console.log("Edited Item Name ------>"+this.purchaseList[j].productName);
      console.log("Edited description ------>"+this.purchaseList[j].description);
      console.log("Edited quantity ------>"+this.purchaseList[j].quantity);
      console.log("Edited unitPrice ------>"+this.purchaseList[j].price);
      console.log("Edited netAmount ------>"+this.purchaseList[j].netAmount);
      console.log("Edited ObjectID ------>"+this.purchaseList[j].id);
      console.log("Edited invoiceNumber ------>"+this.purchaseList[j].invoiceNumber);
      console.log("Edited PODate ------>"+this.purchaseList[j].poDate);
    }

    console.log(this.purchaseList);
    this.purchaseeditarray.push(this.purchaseList);
    console.log(this.purchaseeditarray);

    this.purchaseService.update(this.purchaseeditarray)
    .subscribe(
      data => {
        this.purchase = data; 
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Purchase Order updated Successfully", "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
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

  cancelInvoice(){
    this.dialogRef.close();
  }

}

@Component({
  selector: 'filter',
  styleUrls: ['./filter.css'],
  templateUrl: './filter.html', 
})
export class Filter {
  model: any = {};
  public sortedList: any = {};
  constructor(
    public dialogRef: MatDialogRef<Filter>,
    private purchaseservice: PurchaseService,
    ) {
      console.log("getVendorList");
      this.purchaseservice.loadVendor()
      .subscribe(res => { 
        this.sortedList = res;
        console.log("Vendor list size -->"+this.sortedList.length);
  
        },
        error => {
          setTimeout(() => {
          }, 2000);
        }
      );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(){

  }
}
@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss']
})
export class PurchaseInvoiceComponent implements OnInit, OnDestroy {
  purchaseList: any;
  dialogConfig = new MatDialogConfig();
  isCreateReturn: boolean = false;
  isDeleteButton: boolean = false;
  isCreateInvoice: boolean = false;
  isAddPurchaseOrder: boolean = false;
  isSortStatusDesc: boolean = false;
  isSortStatusAsc: boolean = true;
  isSortDateDesc: boolean = false;
  isSortDateAsc: boolean = true;
  
  constructor( 
    private purchaseService:PurchaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { 
  }

  ngOnInit() {
    this.getAllPODetails();
    this.removeScrollBar();
  }
  
  ngOnDestroy(){
    (<HTMLElement>document.querySelector('.mat-drawer-content')).style.overflow = 'auto';
  }

  removeScrollBar() {
    setTimeout(function () {
        (<HTMLElement>document.querySelector('.mat-drawer-content')).style.overflow = 'inherit';
      }, 300);
  }

  getAllPODetails(){
    this.purchaseService.load()
    .subscribe(res => { 
      this.purchaseList = res;
      console.log("Purchase Length ----------->"+this.purchaseList.length);
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

  getDeleteButtonStyle() {
    if (!this.isDeleteButton) {
      let myStyles = {
        'color': 'gray',
        'background': '#1A2D39',
        'border':'1px solid #1A2D39',
        'display': 'none'
      };
      return myStyles;
    }
  }  

  getCreateReturnStyle() {
    if (!this.isCreateReturn) {
      let myStyles = {
        'color': 'gray',
        'background': '#1A2D39',
        'border':'1px solid #1A2D39',
        'display': 'none'
      };
      return myStyles;
    }
  }   

  getCreateInvoiceStyle() {
    if (!this.isCreateInvoice) {
      let myStyles = {
        'color': 'gray',
        'background': '#1A2D39',
        'border':'1px solid #1A2D39',
        'display': 'none'
      };
      return myStyles;
    }
  }  

  getAddPurchaseOrderStyle() {
    if (this.isAddPurchaseOrder) {
      let myStyles = {
        'color': 'gray',
        'background': '#1A2D39',
        'border':'1px solid #1A2D39',
        'display': 'none'
      };
      return myStyles;
    }
  }  

  sortByOrder(column: string, order: string) {
      if (column === 'status' && order === 'desc') {
        this.isSortStatusDesc = true;
        this.isSortStatusAsc  = false;  
        this.purchaseList.sort((a,b)=>b.status.localeCompare(a.status));
      } else if (column === 'status' && order === 'asc') {
        this.isSortStatusDesc = false;
        this.isSortStatusAsc  = true;  
        this.purchaseList.sort((a,b)=>a.status.localeCompare(b.status));
      }
      else if (column === 'date' && order === 'desc') {
        this.isSortDateDesc = true;
        this.isSortDateAsc  = false;  
        this.purchaseList.sort((a,b)=>b.date.localeCompare(a.date));
      } else {
        this.isSortDateDesc = false;
        this.isSortDateAsc  = true;  
        this.purchaseList.sort((a,b)=>a.date.localeCompare(b.date));
      }
    }

    removePurchaseOrder(id: string) {
      this.purchaseService.removePurchaseOrder(id).subscribe((data: any) =>{
        if (data === null) {
          setTimeout(() => {
            this.snackBar.open("Purchase order has been deleted successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.getAllPODetails();
        } else if (data === 500) {
          setTimeout(() => {
            this.snackBar.open("Internal server error", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });
        } else {
          setTimeout(() => {
            this.snackBar.open("Bad request data", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });
        }
      })
    }

    public viewinvoice(invoiceNumber:string,vendorName:string,invoicedate: string,status:string){
      console.log("View Invoice Number  --->"+invoiceNumber);
      this.dialogConfig.disableClose = true;
      this.dialogConfig.autoFocus = true;
      this.dialogConfig.position = {
        'top': '1000',
        left: '100'
      };
      this.dialog.open(ViewInvoice,{
        panelClass: 'viewInvoice',
        data: { invoice: invoiceNumber, name: vendorName,date: invoicedate,currentStatus: status },
        height: '80%'
      }).afterClosed().subscribe(result => {
        // this.refresh();
      });
    }
    
    public editinvoice(invoiceNumber:string,status:string,vendorName:string){
      console.log("Edit Invoice Number  --->"+invoiceNumber);
      this.dialogConfig.disableClose = true;
      this.dialogConfig.autoFocus = true;
      this.dialogConfig.position = {
        'top': '1000',
        left: '100'
      };
      this.dialog.open(EditInvoice,{
        panelClass: 'editInvoice',
        data: { invoice: invoiceNumber, status: status, vendorName: vendorName },
        height: '80%'
      }).afterClosed().subscribe(result => {
        // this.refresh();
  
        this.getAllPODetails();
      });
    }

    
}

