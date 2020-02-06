import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales, User, Category } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { SalesService } from '../sales.service';
import { PurchaseService } from '../../purchase/purchase.service';

//---------- View Invoice Calling -----------
@Component({
  selector: 'viewInvoice',
  styleUrls: ['./viewInvoice.css'],
  templateUrl: './viewInvoice.html', 
})
export class ViewInvoice {
  model: any ={};
  sales: Sales;
  public salesViewList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
    private dialog: MatDialog,
    private alertService: AlertService,

    public dialogRef: MatDialogRef<ViewInvoice>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {  
      this.model.soDate = this.data.date;
      let totalCommission = 0.0;
      this.model.status = this.data.currentStatus;
      this.salesService.get(this.data.invoice)
      .subscribe(
        data => {
          this.salesViewList = data;
          for(let i=0; i<this.salesViewList.length; i++){
            this.model.invoiceNumber = this.salesViewList[0].invoicenumber;
            totalCommission +=  this.salesViewList[i].subtotal;
            this.model.subTotal = totalCommission;
          }
        },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
        }
      ); 
      
      this.model.customername  = this.data.name;       
      this.customerDetails(this.model.customername);
  }
  ngOnInit() {

  }

  customerDetails(customername: string){
    this.salesService.getCustomerDetails(customername)
    .subscribe(
      data => {
        this.sales = data;
        console.log("Vendor Name -->"+this.sales.customerName);
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
//---------- Edit Invoice Calling -----------
@Component({
  selector: 'editinvoice',
  styleUrls: ['./editinvoice.css'],
  templateUrl: './editinvoice.html', 
})

export class EditInvoice {
  model: any ={};
  sales: Sales;
  public salesEditList : any;
  public productList : any;
  public categoryList : any;
  public statusList : any;
  i:number =1;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
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

  editDetails(invoiceNumber:string){
    this.salesService.geteditDetails(invoiceNumber)
    .subscribe(
      data => {
        this.salesEditList = data;
        console.log("Length -->"+this.salesEditList.length);
        if(this.salesEditList.length == 0){
          console.log("--- No data Found ---");
        }else{
          
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

  public deleteSalesInvoice(id:string,invoiceNumber:string){
    this.salesService.removePartId(id,invoiceNumber)
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
    this.salesService.update(this.model)
    .subscribe(
      data => {
        this.sales = data; 
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

  getTotalAmount(productName:string,qty:string,category:string){
    console.log("productName ==>"+productName);
    console.log("Qty ==>"+qty);
    this.salesService.getUnitPrice(productName,category)
    .subscribe(
      data => {
        this.sales = data; 
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

//------ Filter Calling --------
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
    private salesservice: SalesService,
    private alertService: AlertService
    ) {
      console.log("getCustomerList");
      this.salesservice.loadCustomerList()
      .subscribe(res => { 
        this.sortedList = res;
        console.log("customer list size -->"+this.sortedList.length);
  
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
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.css']
})
export class SalesinvoiceComponent implements OnInit {
  sales:Sales;
  model: any ={};
  public salesList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  displayedColumns: string[] = ['invoicenumber','status','invoicedate','customername','Action'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router, 
    private alertService: AlertService,
    private salesservice: SalesService,
    ) { 
      this.salesservice.load().subscribe(res => { 
        this.salesList = res;
        this.dataSource = new MatTableDataSource(this.salesList);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  public viewinvoice(invoiceNumber:string,customerName:string,invoicedate: string,status:string){
    console.log("View Invoice Number  --->"+invoiceNumber);
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(ViewInvoice,{
      panelClass: 'viewInvoice',
      data: { invoice: invoiceNumber, name: customerName,date: invoicedate,currentStatus:status },
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

  getAllSODetails(){
    this.salesservice.load().subscribe(res => { 
      this.salesList = res;
      this.dataSource = new MatTableDataSource(this.salesList);  
      },
      error => {
          alert('Error !!!!');
      }
    );
  }

  public deleteSale(invoiceNumber:string){
    console.log("Delete Invoice Number  --->"+invoiceNumber);
    this.salesservice.remove(invoiceNumber)
    .subscribe(
      data => {
        this.model = data;
        if(this.model.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
          this.getAllSODetails();
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
