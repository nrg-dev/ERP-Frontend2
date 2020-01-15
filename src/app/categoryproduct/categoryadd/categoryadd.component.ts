import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'src/app/_services';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";

// addnewcategory start
@Component({
  selector: 'addnewcategory',
  styleUrls: ['./addnewcategory.css'],
  templateUrl: './addnewcategory.html', 
})
export class AddnewcategoryComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddpromotionComponent>,

    ) {
     // this.countryList = require("../../../assets/country.json");
    }
    saveNewCategory(){
      this.alertService.success("Saved Successfully");
      this.dialogRef.close();
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    console.log("saveNewCategory");
    }
    close(e) {
    this.dialogRef.close();
  }
}
// addnewcategory end

// add promostion start
@Component({
  selector: 'addpromotion',
  styleUrls: ['./addpromotion.css'],
  templateUrl: './addpromotion.html', 
})
export class AddpromotionComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddpromotionComponent>,
    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    savePromotion(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
console.log("savepromotion");
    }
    close(e) {
    this.dialogRef.close();
  }
}
// add promostion end

// categoryeditdelete start
@Component({
  selector: 'categoryeditdelete',
  styleUrls: ['./categoryeditdelete.css'],
  templateUrl: './categoryeditdelete.html', 
})
export class CategoryeditdeleteComponent {
  countryList:any;
  categorylist:any;
  model: any = {};
  tempid=null;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     // this.countryList = require("../../../assets/country.json");
    
    this.categorylist=data;
    console.log(this.categorylist);
    }

    onChangeCategory(number: string){
      console.log("Inside OnChange Categoey Edit");
      if(this.tempid!==null){
        document.getElementById(this.tempid).style.backgroundColor='#272E34';
      }
      this.tempid=number;
      document.getElementById(this.tempid).style.backgroundColor='#5B6065';
     }
    
     saveCategoryeditdelete(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
    console.log("saveCategoryeditdelete");
    }
    close(e) {
    this.dialogRef.close();
  }
}
// categoryeditdelete end

//discountedit start
@Component({
  selector: 'discountedit',
  styleUrls: ['./discountedit.css'],
  templateUrl: './discountedit.html', 
})
export class DiscounteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
  ) {
     // this.countryList = require("../../../assets/country.json");
    }

  saveDiscountedit(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
    console.log("saveDiscountedit");
    }
    close(e) {
    this.dialogRef.close();
  }
}
//discountedit end

//discountdelete start
@Component({
  selector: 'discountdelete',
  styleUrls: ['./discountdelete.css'],
  templateUrl: './discountdelete.html', 
})
export class DiscountdeleteComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
//discountdelete end

// addnewproduct start
@Component({
  selector: 'addnewproduct',
  styleUrls: ['./addnewproduct.css'],
  templateUrl: './addnewproduct.html', 
})
export class AddnewproductComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    ) {
     // this.countryList = require("../../../assets/country.json");
    }
  saveAddNewProduct(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
    console.log("saveAddNewProduct");
    }
    close(e) {
    this.dialogRef.close();
  }
}
// addnewproduct end

// productview start
@Component({
  selector: 'productview',
  styleUrls: ['./productview.css'],
  templateUrl: './productview.html', 
})
export class ProductviewComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    ) {
     // this.countryList = require("../../../assets/country.json");
    }
}
// productview end

// productedit start
@Component({
  selector: 'productedit',
  styleUrls: ['./productedit.css'],
  templateUrl: './productedit.html', 
})
export class ProducteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
  ) {
    }
   
  saveProductEdit(){
      this.alertService.success("Saved Successfully");
      setTimeout(() => {
        this.alertService.clear();
      }, 2000);
    this.dialogRef.close();
    console.log("saveProductEdit");
    }
    close(e) {
    this.dialogRef.close();
  }
 
}
// productedit end

// categorytable start
@Component({
  selector: 'categorytable',
  styleUrls: ['./categorytable.css'],
  templateUrl: './categorytable.html', 
})
export class CategorytableComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
  ) {
    }
 
}
// categorytable end


// Main compoent
@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {
  public dataDiscountList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  // Category
  displayedColumns: string[] = ['Productcode','Discount','DiscountTime','Qty','Price','editdelete'];
  dataSource: MatTableDataSource<any>;

  // Product
  displayedColumns1: string[] = ['Productcode', 'ProductName','Discount','DiscountTime','Qty','Price','editdelete'];
  dataSource1: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 

  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails='none';
  public editdeletediv=false;
  public fiberdetails='none';
  public alldetails=false;

  successdialog = 'none';

   // masterlist
   masterlist:  any =[
  {
    number:'01',
    name:'All Product',
  },
  {
    number:'02',
    name:'Discount',
  },
  {
    number:'03',
    name:'Free Gifts',
  },
];
// 
categorylist: any =[
  {
    number:'PROD1',
    name:'Fiber',
  },
  {
    number:'PROD2',
    name:'Pigmen',
  },
  {
    number:'PROD3',
    name:'Brush',
  },
  {
    number:'PROD4',
    name:'Sandpaper',
  },
  {
    number:'PROD5',
    name:'Hardware',
  },
  {
    number:'PROD6',
    name:'Accesories'
  }
];

 
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router
    ) { 
      const purchasedata = require("../../discountdata.json");
      this.dataDiscountList=purchasedata;

      this.dataSource = new MatTableDataSource(this.dataDiscountList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

      // Assign the data to the data source for the table to render
    }

   
    
  ngOnInit() {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leftdetails=true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   
categorydetails(number: string){
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='01'){
    this.alldetails=false;
    //this.discountdetails=false;
    this.fiberdetails='none';
    this.editdeletediv=false;
  }
  if(number=='02'){
   this.discountdetails='block';
    this.alldetails=false;
    this.fiberdetails='none';
    this.editdeletediv =false;
  }
  if(number=='03'){
    this.leftdetails=true;
    this.alldetails=false;
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
}

productlist(number: string){
  //alert("----test---");
  if(this.tempnumber!==null){
    document.getElementById(this.tempnumber).style.backgroundColor='#272E34';
  }
  this.tempnumber=number;
  document.getElementById(this.tempnumber).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='PROD1'){
    this.fiberdetails='block';
    this.discountdetails='none';

    this.alldetails=false;
    //this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD2'){
    this.alldetails=false;
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD3'){
    this.alldetails=false;
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD4'){
    this.alldetails=false;
    //this.fiberdetails=false;
    //this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD5'){
    this.alldetails=false;
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
}


  editdelete(){
    this.editdeletediv=true;
   // this.discountdetails=false;
  }

  addNewCategory(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddnewcategoryComponent,{
      panelClass: 'addnewcategory'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
  }

  addpromotion(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddpromotionComponent,{
      panelClass: 'addpromotion'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  
  categoryEditDelete(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(CategoryeditdeleteComponent,{
      data: this.categorylist,
      panelClass: 'categoryeditdelete'

    })
    .afterClosed().subscribe(result => {
     // this.refresh();
    });
  }

  discountEdit(){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      panelClass: 'discountedit'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(){
    this.alertService.success("deleted Successfully");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

  addNewProduct(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(AddnewproductComponent,{ 
      panelClass: 'addnewproduct'
    })
    .afterClosed().subscribe(result => {
    }); 
  }

  productview(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProductviewComponent,{ 
      panelClass: 'productview'
    })
    .afterClosed().subscribe(result => {
    }); 
  }

  productEdit(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(ProducteditComponent,{ 
      panelClass: 'productedit'
    })
    .afterClosed().subscribe(result => {
    }); 
  }

  }
