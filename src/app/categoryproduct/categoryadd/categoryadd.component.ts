import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/_models';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertService } from 'src/app/_services';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CategoryproductService } from '../categoryproduct.service';
import { VendorService } from 'src/app/vendorcustomer/vendor.service';
import { Discount } from 'src/app/_models/discount';
import { CompleterData, CompleterService } from 'ng2-completer';

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
  allcategorylist:any= {};
  allitemnamelist:any= {};
  discount:Discount;
  protected dataService: CompleterData;

  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddpromotionComponent>,
    private catprodservice: CategoryproductService,
    private completerService: CompleterService,
    ) {
      this.catprodservice.load()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name"+this.allcategorylist);
         },
        error => {
         setTimeout(() => {
           this.alertService.error("Network error: server is temporarily unavailable");
         }, 2000);
       }
      );

      //all item load
      this.catprodservice.loadItemName()
      .subscribe(
         data => {
           this.allitemnamelist = data;
           this.dataService = completerService.local(this.allitemnamelist);  
         },
        error => {
         setTimeout(() => {
           this.alertService.error("Network error: server is temporarily unavailable");
         }, 2000);
       }
      );
 
    }

    savePromotion(){
      this.catprodservice.addpromotionsave(this.model)
      .subscribe(
        data => {
          this.discount =   data; 
          this.dialogRef.close();
          if(this.discount.status=="success"){
            this.alertService.success("Saved Successfully");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
          } 
          if(this.discount.status=="failure"){
            this.alertService.success("not saved");
            setTimeout(() => {
              this.alertService.clear();
            }, 2000);
          }
        },
        error => {
          this.alertService.error("Serve Error ");
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
          this.alertService.error("Network error: server is temporarily unavailable");
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
        this.alertService.error("Network error: server is temporarily unavailable");
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
  alldiscountlist: any={};
  allcategorylist:any= {};
  vendornamelist: any = {};
  discount: Discount;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DiscounteditComponent>,
    private catprodservice:CategoryproductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          console.log("category name"+this.allcategorylist);
        },
       error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
     );

    this.catprodservice.loadDiscount()
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discountedit code -->"+this.alldiscountlist[0].discountcode);
        for(let k=0;k<this.alldiscountlist.length;k++){
          if(this.alldiscountlist[k].discountcode==this.data){
            this.model.product=this.alldiscountlist[k].product;
            this.model.discount=this.alldiscountlist[k].discount;
            this.model.qty=this.alldiscountlist[k].qty;
            this.model.promotionperiod=this.alldiscountlist[k].promotionperiod;
            this.model.discountcode=this.alldiscountlist[k].discountcode;
          }
        }
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
    }

  saveDiscountedit(){
    console.log("category after update"+this.model.discountcode);
    this.catprodservice.discountupdate(this.model)
    .subscribe(
      data => {
        this.discount =   data;
        this.dialogRef.close();
        this.alertService.success("Updated Successfully");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.dialogRef.close();
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
      );
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
    }

    close() {
    this.dialogRef.close();
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
  product:Product;
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
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
     );

     this.vendorservice.load()
     .subscribe(
        data => {
          this.vendornamelist = data;
          console.log("category name"+this.vendornamelist);
        },
       error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
      }
     );
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
        this.alertService.error("Serve Error ");
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

//allproduct edit start
@Component({
  selector: 'allproductedit',
  styleUrls: ['./allproductedit.css'],
  templateUrl: './allproductedit.html', 
})
export class AllproducteditComponent {
  model: any = {};
  dialogConfig: any;
  dialog: any;
  allcategorylist:any= {};
  vendornamecodelist: any = {};
  allproducedittlist: any = {};
  category:Category;
  product:Product;
  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AllproducteditComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.catprodservice.loadCategoryName()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name & code -->"+this.allcategorylist);
         },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
       }
      );
 
      this.vendorservice.loadvendornamecode()
      .subscribe(
         data => {
           this.vendornamecodelist = data;
           console.log("Vendor name & code -->"+this.vendornamecodelist);
         },
        error => {
          setTimeout(() => {
            this.alertService.error("Network error: server is temporarily unavailable");
          }, 2000);
       }
      );

       //this.allproductlist="";
    this.catprodservice.loadItem()
    .subscribe(
      data => {
        this.allproducedittlist = data;
        console.log("productedit code -->"+this.allproducedittlist[0].prodcode);
        for(let k=0;k<this.allproducedittlist.length;k++){
          if(this.allproducedittlist[k].prodcode==this.data){
            this.model.productname=this.allproducedittlist[k].productname;
            this.model.description=this.allproducedittlist[k].description;
            this.model.price=this.allproducedittlist[k].price;
            this.model.tax=this.allproducedittlist[k].tax;
            this.model.margin=this.allproducedittlist[k].margin;
            this.model.sellingprice=this.allproducedittlist[k].sellingprice;
            this.model.vendorcode=this.allproducedittlist[k].vendorcode;
            this.model.vendorname=this.allproducedittlist[k].vendorname;
            this.model.categorycode=this.allproducedittlist[k].categorycode;
            this.model.categoryname=this.allproducedittlist[k].categoryname;
            console.log("category name -->"+this.model.categoryname);
            console.log("category code -->"+this.model.categorycode);
            this.model.categorycode=this.allproducedittlist[k].categoryname+"-"+this.allproducedittlist[k].categorycode;
            console.log("category code & name -->"+this.model.categorycode);
            console.log("vendor name -->"+this.model.vendorname);
            console.log("vendor code -->"+this.model.vendorcode);
            this.model.vendorcode=this.allproducedittlist[k].vendorname+"-"+this.allproducedittlist[k].vendorcode;
            console.log("vendor name & code -->"+this.model.vendorcode);


          }
        }
        this.model.prodcode=this.allproducedittlist[0].prodcode;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
     
  }
  ngOnInit() {
  }
  allproducteditsave(){
    this.catprodservice.productupdate(this.model)
    .subscribe(
      data => {
        this.product =   data;
        this.dialogRef.close();
        this.alertService.success("Saved Successfully");
        setTimeout(() => {
          this.alertService.clear();
        }, 2000);
        this.dialogRef.close();
        console.log("saveproducteditdelete"); 
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
      );
  }

    close() {
    this.dialogRef.close();
  }
}
//allproduct edit end

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
  allproducedittlist:any;
  alldiscountlist: any= {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  model: any = {};
  discount:Discount;
  // All Product
  displayedColumns: string[] = ['productname','description','vendorcode','sellingprice','price','editdelete'];
  dataSource: MatTableDataSource<any>;

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
  dialogRef: any;
 
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
    this.alldiscountList();
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
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  allproductList(){
    //this.allproductlist="";
    this.catprodservice.loadItem()
    .subscribe(
      data => {
        this.allproductlist = data;
        console.log("Product length -->"+this.allproductlist.length);
        this.dataSource = new MatTableDataSource(this.allproductlist);
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

  alldiscountList(){
    //this.allproductlist="";
    this.catprodservice.loadDiscount()
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discount code -->"+this.alldiscountlist[0].discountcode);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
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
    this.discountdetails='none';
    this.fiberdetails='block';
    this.editdeletediv=false;
  }
}

productlist(number: string){
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

  discountEdit(discountcode:string){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(DiscounteditComponent,{
      panelClass: 'discountedit',
      data: discountcode,
    })
    .afterClosed().subscribe(result => {
    });
      
  }

  discountDelete(discountcode: string){
    this.catprodservice.discountremove(discountcode)
      .subscribe(
        data => {
          this.discount =  data;  
          this.dialogRef.close();
          if(this.discount.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }else if(this.discount.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
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

  allproducteditcall(prodcode: string){
    this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.position = {
    'top': '1000',
    left: '100'
  };
  this.dialog.open(AllproducteditComponent,{
    panelClass: 'allproductedit',
    data: prodcode,

  })
  .afterClosed().subscribe(result => {
  });

  }
  allproductdelete(prodcode: string){
    this.catprodservice.productremove(prodcode)
      .subscribe(
        data => {
          this.product =  data;  
          if(this.product.status == "Success"){
          this.alertService.success("Deleted Successfully");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }else if(this.product.status == "failure"){
          this.alertService.error("Not Deleted..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
        }
      },
      error => {
        this.alertService.error("Network error: server is temporarily unavailable");
      }
    );
  }

  }
