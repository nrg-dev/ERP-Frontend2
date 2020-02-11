import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase, User, Category } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';

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
    private alertService: AlertService,

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
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
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
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
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
  i:number =1;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<EditInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {  
      console.log("Edit Dialog InvoiceNumber -->"+this.data);
      this.model.invoiceNumber = this.data.invoice;
      this.model.currentStatus = this.data.status;
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
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
        }
      );
    }

    getProductList(){
      this.purchaseService.loadItemName()
      .subscribe(res => { 
        this.productList = res;
        },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);        }
      );
    }

    public purchaseList:Array<Purchase> = [ ];

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
            this.purchaseList.push(this.purchase);

          }

          for(let j=0; j<this.purchaseList.length; j++){
            console.log("Item Name ------>"+this.purchaseList[j].productName);

          }
         /* this.i= this.i;
          this.model.sNo = this.i;
          this.purchaseEditList.push(this.model.sNo);

          this.i++; */
        }
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
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
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
          this.model.currentStatus = this.data.status;
          this.editDetails(invoiceNumber);
        }else{
          this.alertService.error("Not Deleted..");
        }
        
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }
    ); 
  }

  updateInvoice(){
    this.purchase = new Purchase;

    //const index = this.purchaseList.findIndex((e) => e.id === obj.id);

    for(let j=0; j<this.purchaseList.length; j++){
      console.log("Edited Category Name ------>"+this.purchaseList[j].category);
      console.log("Edited Item Name ------>"+this.purchaseList[j].productName);
      console.log("Edited description ------>"+this.purchaseList[j].description);
      console.log("Edited quantity ------>"+this.purchaseList[j].quantity);
      console.log("Edited netAmount ------>"+this.purchaseList[j].netAmount);
    }
    this.purchaseService.update(this.model)
    .subscribe(
      data => {
        this.purchase = data; 
        this.alertService.success("Successfully Updated.");
        setTimeout(() => {
          this.alertService.clear();
        }, 1000);
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
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
        //alert("Unit Prize -->"+this.purchase.price);
        //this.purchase.price * qty;
        this.purchaseList[index].netAmount = this.purchase.price;
        
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
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
    private alertService: AlertService
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
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {
  purchse:Purchase;
  model: any ={};
  public purchaseList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  //displayedColumns: string[] = ['Date','Invoice Number','ProductName','name','quantity','deliveryCost','netAmount','status','Action'];
  displayedColumns: string[] = ['invoicenumber','status','invoicedate','vendorname','Action'];


  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private purchaseservice: PurchaseService,
  ) { 
   // const purchasedata = require("../../purchasedata.json");

   // this.purchaseList=purchasedata;

    //console.log("data3 -->"+this.purchaseList[2].addedDate);

    this.purchaseservice.load().subscribe(res => { 
        this.purchaseList = res;
        this.dataSource = new MatTableDataSource(this.purchaseList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
    
  }
  

  ngOnInit() {
   
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  openfilter(): void {
   
    const dialogRef = this.dialog.open(Filter, {
    width: '60%',
    //  data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
  
  public editinvoice(invoiceNumber:string,status:string){
    console.log("Edit Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(EditInvoice,{
      panelClass: 'editInvoice',
      data: { invoice: invoiceNumber, status: status },
      height: '80%'
    }).afterClosed().subscribe(result => {
      // this.refresh();
    });
  }

  getAllPODetails(){
    this.purchaseservice.load().subscribe(res => { 
      this.purchaseList = res;
      this.dataSource = new MatTableDataSource(this.purchaseList);  
      },
      error => {
          alert('Error !!!!');
      }
    );
  }

  public deletePurchase(invoiceNumber:string){
    console.log("Delete Invoice Number  --->"+invoiceNumber);
    this.purchaseservice.remove(invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
          this.getAllPODetails();
        }else{
          this.alertService.error("Not Deleted..");
        }
        
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
        setTimeout(() => {
          this.alertService.clear();
        }, 1500);
      }
    ); 
  }

}
