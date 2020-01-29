import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/_models';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'src/app/_services';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CategoryproductService } from '../categoryproduct.service';
import { VendorService } from 'src/app/vendorcustomer/vendor.service';

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
  category:Category;
  constructor(
    private alertService: AlertService,
    private catprodservice: CategoryproductService,
    public dialogRef: MatDialogRef<AddnewcategoryComponent>,

    ) {
     // this.countryList = require("../../../assets/country.json");
    }
  saveNewCategory(){
    this.catprodservice.save(this.model)
    .subscribe(
      data => {
        this.category =   data; 
        this.dialogRef.close();
        if(this.category.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        } 
        if(this.category.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    );  
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
  category: Category = new Category;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    private catprodservice: CategoryproductService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
     // this.countryList = require("../../../assets/country.json");
    
    this.categorylist=data;
    console.log(this.categorylist);
    }

    onChangeCategory(categorycode: string){
      for(let i=0;i<this.categorylist.length;i++){
        if(this.categorylist[i].categorycode==categorycode){
          this.model.name=this.categorylist[i].name;
          this.model.description=this.categorylist[i].description;
        }
      }
     }
    
     saveCategoryeditdelete(){
      this.catprodservice.update(this.model)
      .subscribe(
        data => {
          this.category =   data;  
          this.dialogRef.close();
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
          this.dialogRef.close();
          console.log("saveCategoryeditdelete"); 
        },
        error => {
          this.alertService.success("Server Error");
        }
        );
    }

    categorydelete(categorycode: string){
      this.catprodservice.remove(categorycode)
    .subscribe(
      data => {
        this.category =  data;  
        this.dialogRef.close();
        if(this.category.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }else if(this.category.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.success("Server Error ");
      }
    );
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
    public dialogRef: MatDialogRef<DiscounteditComponent>,
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
    public dialogRef: MatDialogRef<DiscountdeleteComponent>,
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
  model: any = {};
  allcategorylist:any= {};
  vendornamelist: any = {};
  data: any = {};
  category:Category;
  product:Product= new Product;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddnewproductComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    ) {
      this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          console.log("category name"+this.allcategorylist);
        },
       error => {
          alert("server error");
      }
     );

     this.vendorservice.load()
     .subscribe(
        data => {
          this.vendornamelist = data;
          console.log("category name"+this.vendornamelist);
        },
       error => {
          alert("server error");
      }
     );
    }
    ngOnInit() {
      //this.allcategorylist=['Fiber','Electronics','Pigmen','Brush'];
      //this.vendornamelist=['alex','nisho','josini'];
    }
  saveAddNewProduct(category: string){
    this.catprodservice.producsave(this.model)
    .subscribe(
      data => {
        this.product =   data; 
        this.dialogRef.close();
        if(this.product.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        } 
        if(this.product.status=="failure"){
          this.alertService.success("not saved");
          setTimeout(() => {
            this.alertService.clear();
          }, 2000);
        }
      },
      error => {
        this.alertService.success("Serve Error ");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
      }
    ); 
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
    public dialogRef: MatDialogRef<ProductviewComponent>,
    ) {
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
    public dialogRef: MatDialogRef<ProducteditComponent>,
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
    public dialogRef: MatDialogRef<CategorytableComponent>,
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
 allproductlist : any= {};// Product;  
  product:Product;
  categorylist: any= {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  // All Product
  displayedColumns: string[] = ['productname','description','vendorcode','sellingprice','price','editdelete'];
  dataSource: MatTableDataSource<any>;

  // Product
  displayedColumns1: string[] = ['Productcode','Discount','DiscountTime','Qty','Price','editdelete'];
  dataSource1: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 

  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails='none';
  public editdeletediv=false;
  public fiberdetails='none';
  public alldetails='none';

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
 
  constructor(
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private catprodservice: CategoryproductService,
    ) { 

      this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

   
    
  ngOnInit() {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leftdetails=true;
    this.allcategorylist();
    this.allproductList();
  }

  allcategorylist(){
    this.categorylist="";
    this.catprodservice.load()
    .subscribe(
      data => {
        this.categorylist = data;
        console.log("Category code-->"+this.categorylist[0].categorycode)
       // this.dataSource = new MatTableDataSource(this.allproductlist);
       // this.dataSource.paginator = this.paginator;
       // this.dataSource.sort = this.sort;
      },
      error => {
        alert("server error");
      }
    );
  }

  allproductList(){
    //this.allproductlist="";
    this.catprodservice.loadItem()
    .subscribe(
      data => {
        this.allproductlist = data;
        console.log("product code -->"+this.allproductlist[0].prodcode);
        this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error => {
        alert("server error");
      }
    );
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
    this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.fiberdetails='none';
    this.editdeletediv=false;
  }
  if(number=='02'){
    this.alldetails='none';
   this.discountdetails='block';
    this.alldetails='none';
    this.fiberdetails='none';
    this.editdeletediv =false;
  }
  if(number=='03'){
    this.leftdetails=true;
    this.alldetails='none';
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
    this.alldetails='none';
   // this.fiberdetails='block';
   // this.discountdetails='none';

   // this.alldetails=false;
    //this.discountdetails=false;
   // this.editdeletediv=false;
  }
  if(number=='PROD2'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD3'){
    this.alldetails='none';
    //this.discountdetails=false;
    //this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD4'){
    this.alldetails='none';
    //this.fiberdetails=false;
    //this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD5'){
    this.alldetails='none';
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
      this.allcategorylist();
    }
    );
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
      panelClass: 'addnewproduct',
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
