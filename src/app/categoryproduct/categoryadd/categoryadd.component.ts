import {MatDialog, MatDialogConfig} from "@angular/material";
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatExpansionPanel, MatSnackBar, Sort} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject} from '@angular/core';



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

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
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

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
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
    
    close() {
    //this.dialogRef.close();
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
  constructor() {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
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

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
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

    ) {
     // this.countryList = require("../../../assets/country.json");
    }

    close() {
    //this.dialogRef.close();
  }
}
// productview end

// categoryeditdelete start
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
  constructor() {
    }
   

    close() {
    //this.dialogRef.close();
  }
 
}
// categoryeditdelete end


// Main compoent
@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {
  
  displayedColumns: string[] = ['Productcode', 'ProductName','Discount','DiscountTime','Qty','Price','editdelete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 

  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails=false;
  public editdeletediv=false;
  public fiberdetails=false;

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


//dataDiscountList : any = [];
 discountdata = require("../../discountdata.json");
dataDiscountList=this.discountdata;

  constructor(    private dialog: MatDialog,
    //private dialog: MatDialog,
    ) { 


      this.dataSource = new MatTableDataSource(this.dataDiscountList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

      // Assign the data to the data source for the table to render
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  ngOnInit() {
    this.leftdetails=true;
  }
   
categorydetails(number: string){
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='01'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='02'){
    this.discountdetails=true;
    this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='03'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.fiberdetails=false;
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
    this.fiberdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD2'){
    this.discountdetails=false;
    this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD3'){
    this.discountdetails=false;
    this.fiberdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD4'){
    this.fiberdetails=false;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='PROD5'){
    this.discountdetails=false;
    this.fiberdetails=false;
    this.editdeletediv=false;
  }
}


  editdelete(){
    this.editdeletediv=true;
    this.discountdetails=false;
  }
  dialogConfig = new MatDialogConfig();

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
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '100',
      left: '100'
    };
    this.dialog.open(DiscountdeleteComponent,{ 
      panelClass: 'discountdelete'
    })
    .afterClosed().subscribe(result => {
    });
      
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
