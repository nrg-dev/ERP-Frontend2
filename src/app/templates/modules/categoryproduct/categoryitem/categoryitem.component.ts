import { Component, OnInit, ViewChild ,ElementRef,Inject,Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CompleterData, CompleterService } from 'ng2-completer';
import { PercentPipe } from '../../../../../../node_modules/@angular/common';
import { VendorService } from 'src/app/templates/modules/vendor-and-customer/services/vendor.service';
import { CategoryproductService } from '../services/categoryproduct.service';
import { Category, Product } from '../../../../core/common/_models';
import { Discount } from '../../../../core/common/_models/discount';
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";

// addnewcategory start
@Component({
  selector: 'addnewcategory',
  styleUrls: ['./addnewcategory.scss'],
  templateUrl: './addnewcategory.html', 
})
export class AddnewcategoryComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  category:Category;
  constructor(
    private catprodservice: CategoryproductService,
    public dialogRef: MatDialogRef<AddnewcategoryComponent>,
    private snackBar: MatSnackBar

    ) {
    }
  saveCategory(){
    console.log("Inside saveCategory method");
    console.log("Category Name-->"+this.model.name);
    console.log("Category Desc-->"+this.model.description);

    this.catprodservice.save(this.model)
    .subscribe(
      data => {
      //  this.category =   data; 
     //   console.log("Response-->"+data);
        this.dialogRef.close();
          setTimeout(() => {
            this.snackBar.open("Category Saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });

        /*if(this.category.status=="failure"){
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          }); 
        } */
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
  close(e) {
    this.dialogRef.close();
  }
}
// addnewcategory end


// categoryeditdelete start
@Component({
  selector: 'categoryeditdelete',
  styleUrls: ['./categoryeditdelete.scss'],
  templateUrl: './categoryeditdelete.html', 
})
export class CategoryeditdeleteComponent {
  countryList:any;
  categorylist:any;
  model: any = {};
  tempid=null;
  category: Category = new Category;
  constructor(
    public dialogRef: MatDialogRef<CategoryeditdeleteComponent>,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar,
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
          setTimeout(() => {
            this.snackBar.open("Category Saved Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
       
          this.dialogRef.close();
          console.log("saveCategoryeditdelete"); 
        },
        error => {
          setTimeout(() => {
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });           }
        );
    }

    categorydelete(categorycode: string){
      this.catprodservice.remove(categorycode)
      .subscribe(
        data => {
          this.category =  data;  
          if(this.category.status == "Success"){
          this.dialogRef.close();
          setTimeout(() => {
            this.snackBar.open("Category is Removed Successfully", "", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });

        }else if(this.category.status == "failure"){
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
        });         }
    );
  }
    close() {
    this.dialogRef.close();
  }
}
// categoryeditdelete end
export interface UsersData {
  title: string;
  key: string;
}

// add promostion start
@Component({
  selector: 'addpromotion',
  styleUrls: ['./addpromotion.scss'],
  templateUrl: './addpromotion.html', 
})
export class AddpromotionComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  allcategorylist:any= {};
  allitemnamelist:any= {};
  discount:Discount;
  //protected dataService: CompleterData;
  public dataService: CompleterData;
  title:string;
  key:string;
  discountShow:boolean;
  freegiftShow:boolean;

  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<AddpromotionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private catprodservice: CategoryproductService,
    private completerService: CompleterService,
    private snackBar: MatSnackBar
    ) {
      console.log(data);
      this.local_data = {...data};
      this.title = this.local_data.title;
      this.key = this.local_data.key;
       if(this.key == "freegift") {
        this.discountShow = false;
        this.freegiftShow = true;
      }
      if(this.key == "discount") {
        this.discountShow = true;
        this.freegiftShow = false;
      }
      this.catprodservice.load()
      .subscribe(
         data => {
           this.allcategorylist = data;
           console.log("category name"+this.allcategorylist);
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

      //all item load
      this.catprodservice.loadItemName()
      .subscribe(
         data => {
           this.allitemnamelist = data;
           this.dataService = completerService.local(this.allitemnamelist);  
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

    savePromotion(){
      console.log("Category Name -->"+this.model.categorycode);
      console.log("Item Name -->"+this.model.productname);
      console.log("discount from date-->"+this.model.fromdate_promotionperiod);
      console.log("discount to date-->"+this.model.todate_promotionperiod);
      console.log("discount type -->"+this.model.discountType);
      console.log("discount qty  -->"+this.model.qty);
      console.log("Free gift  -->"+this.model.freegift);
      console.log("Other item  -->"+this.model.others);

      this.catprodservice.addpromotionsave(this.model)
      .subscribe(
        data => {
          this.discount =   data; 
          this.dialogRef.close();
          if(this.discount.status=="success"){
            setTimeout(() => {
              this.snackBar.open("Promotion created Successfully", "dismss", {
                panelClass: ["success"],
                verticalPosition: 'top'      
              });
            });
           
          } 
          if(this.discount.status=="failure"){
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
    close(e) {
    this.dialogRef.close();
  }
}
// add promostion end

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
    public dialogRef: MatDialogRef<DiscounteditComponent>,
    private catprodservice:CategoryproductService,
    private snackBar: MatSnackBar,
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
      this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
        panelClass: ["error"],
        verticalPosition: 'top'      
      });
    });   

      }
     );
    this.loadDiscount();

    }


    loadDiscount(){
      let discount="discount"
      this.catprodservice.loadDiscount(discount)
      .subscribe(
        data => {
          this.alldiscountlist = data;
          console.log("discountedit code -->"+this.alldiscountlist[0].discountcode);
          for(let k=0;k<this.alldiscountlist.length;k++){
            if(this.alldiscountlist[k].discountcode==this.data){
              this.model.productname=this.alldiscountlist[k].productname;
              this.model.discount=this.alldiscountlist[k].discount;
              this.model.qty=this.alldiscountlist[k].qty;
              this.model.fromdate_promotionperiod=this.alldiscountlist[k].fromdate_promotionperiod;
              this.model.todate_promotionperiod=this.alldiscountlist[k].todate_promotionperiod;
              this.model.promotionperiod=this.model.fromdate_promotionperiod + "-"+ this.model.todate_promotionperiod;
              this.model.discountcode=this.alldiscountlist[k].discountcode;
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
  updateDiscount(){
    console.log("category after update"+this.model.discountcode);
    this.catprodservice.updateDiscount(this.model)
    .subscribe(
      data => {
        this.discount =   data;
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Discount Updated Successfully", "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });

        this.dialogRef.close();
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
  styleUrls: ['./addnewproduct.scss'],
  templateUrl: './addnewproduct.html', 
})
export class AddnewproductComponent {
  model: any = {};
  allcategorylist:any= {};
  vendornamelist: any = {};
  data: any = {};
  category:Category;
  product:Product;
  selectedFiles: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddnewproductComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    private snackBar: MatSnackBar

    ) {
      this.catprodservice.load()
     .subscribe(
        data => {
          this.allcategorylist = data;
          //console.log("category name"+this.allcategorylist);
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

     this.vendorservice.load()
     .subscribe(
        data => {
          this.vendornamelist = data;
          console.log("category name"+this.vendornamelist);
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
     this.model.sellingprice = 0;
  }
  /*fileChangeEvent(event) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }
  }*/
  isImageSaved1: boolean;
  isImageSaved2:boolean;
  imageError: string;
  productImage: Array<any> = [];
  imageIndex1:boolean = false;
  imageIndex2:boolean = false;
  imgBase64Path:any;
  fileChangeEvent(fileInput: any,imageNumber:number) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

      
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                 
                    return false;
                } else {
                    this.imgBase64Path = e.target.result;
                   // this.cardImageBase64 = imgBase64Path;
                   if(this.productImage[imageNumber]!=null){
                     console.log("no value...");
                   }
                   if(imageNumber==0){
                      if(this.imageIndex1==false){
                        console.log("First Time");
                        this.productImage.push(this.imgBase64Path);
                        this.isImageSaved1 = true;
                        this.imageIndex1=true;
                        console.log("First time Base 64 array value-->"+this.productImage[0]);
                      }
                      else{
                        console.log("else");
                        console.log("Second time Before update Base 64 array value-->"+this.productImage[0]);
                        console.log("Second time Base 64-->"+this.imgBase64Path);
                        this.productImage[0] = this.imgBase64Path;
                        this.isImageSaved1 = true;
                        console.log("Second time Base 64 array value-->"+this.productImage[0]);
                        //this.imageIndex1=true;
                      }
                  }
                  // Second Image
                  if(imageNumber==1){
                    if(this.imageIndex2==false){
                      console.log("First Time");
                      this.productImage.push(this.imgBase64Path);
                      this.isImageSaved2 = true;
                      this.imageIndex2=true;
                      console.log("First time Base 64 array value-->"+this.productImage[1]);
                      //this.isImageSaved2 = true;
                    }
                    else{
                      console.log("else");
                      console.log("Second time Before update Base 64 array value-->"+this.productImage[1]);
                      console.log("Second time Base 64-->"+this.imgBase64Path);
                      this.productImage[1] = this.imgBase64Path;
                      this.isImageSaved2 = true;
                      console.log("Second time Base 64 array value-->"+this.productImage[1]);
                    }
                }
                 
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage(i:number) {
  this.productImage[i]=null;
  if(i==0){
    this.isImageSaved1 = false;
  }
  if(i==1){
    this.isImageSaved2 = false;
  }
}

  marginPrice:any;
  taxPrice:any;
  getSellingPrice(price:string,tax:string,margin:string){
    console.log("price-->"+price + "--- Tax --->"+tax+"-- Margin ---->"+margin);
    if(tax == null || tax == undefined){
      if(margin == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else if(margin == null || tax == undefined){
      if(tax == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else{
      this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
      this.taxPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
      this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice)+Number.parseInt(this.taxPrice);
    }
  }

  saveAddNewProduct(category: string){
    this.model.productImage = this.productImage;
    console.log("Selling Price -->"+this.model.sellingprice);
    this.catprodservice.producsave(this.model)
    .subscribe(
      data => {
        this.product =   data; 
        this.dialogRef.close();
        if(this.product.status=="success"){
          setTimeout(() => {
            this.snackBar.open("Productr saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });

     
          this.model.sellingprice = 0;
        } 
        if(this.product.status=="failure"){
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
    close(e) {
    this.dialogRef.close();
  }
}
// addnewproduct end

//allproduct edit start
@Component({
  selector: 'allproductedit',
  styleUrls: ['./allproductedit.scss'],
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
    public dialogRef: MatDialogRef<AllproducteditComponent>,
    private catprodservice: CategoryproductService,
    private vendorservice: VendorService,
    private snackBar: MatSnackBar,

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
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
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
            this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
              panelClass: ["error"],
              verticalPosition: 'top'      
            });
          });   
      
       }
      );

       //this.allproductlist="";
    this.catprodservice.loadItem("all")
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
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });   
		
      }
    );
     
  }

  marginPrice:any;
  taxPrice:any;
  getSellingPrice(price:string,tax:string,margin:string){
    console.log("price-->"+price + "--- Tax --->"+tax+"-- Margin ---->"+margin);
    if(tax == null || tax == undefined){
      if(margin == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else if(margin == null || tax == undefined){
      if(tax == null || tax == undefined){
        this.model.sellingprice = price;
      }else{
        this.marginPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
        this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice);
      }
    }else{
      this.marginPrice = Number.parseInt(price) * (Number.parseInt(margin)/100);
      this.taxPrice = Number.parseInt(price) * (Number.parseInt(tax)/100);
      this.model.sellingprice = Number.parseInt(price)+Number.parseInt(this.marginPrice)+Number.parseInt(this.taxPrice);
    }
  }
  
/*
  setItem(category: string){
    this.catprodservice.setItem(this.model)
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
    */
  ngOnInit() {
  }
  setItem(){
    console.log("setItem method");
    this.catprodservice.setItem(this.model)
    .subscribe(
      data => {
        this.product =   data;
        this.dialogRef.close();
        setTimeout(() => {
          this.snackBar.open("Product Updated Successfully", "", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
        console.log("saveproducteditdelete"); 
      },
      error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });      }
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
    public dialogRef: MatDialogRef<ProductviewComponent>,
    ) {
    }
}
// productview end

// productedit start
@Component({
  selector: 'productedit',
  styleUrls: ['./productedit.scss'],
  templateUrl: './productedit.html', 
})
export class ProducteditComponent {
  countryList:any;
  priorityList:any;
  model: any = {};
  tempid=null;
  constructor(
    public dialogRef: MatDialogRef<ProducteditComponent>,
    private snackBar: MatSnackBar

  ) {
    }
   
  saveProductEdit(){
    //  this.alertService.success("Saved Successfully");
   //   setTimeout(() => {
     //   this.alertService.clear();
   //   }, 2000);

      setTimeout(() => {
        this.snackBar.open("Saved Successfully", "dismss", {
          panelClass: ["success"],
          verticalPosition: 'top'      
        });
      });

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
    public dialogRef: MatDialogRef<CategorytableComponent>,
  ) {
    }
 
}
// categorytable end







// Main compoent
@Component({
  selector: 'app-categoryitem',
  templateUrl: './categoryitem.component.html',
  styleUrls: ['./categoryitem.component.scss']
})
export class CategoryItemComponent implements OnInit {
 allproductlist : any= {};// Product;  
  product:Product;
  categorylist: any= {};
  allproducedittlist:any;
  alldiscountlist: any= {};
  allfreegiftlist: any= {};
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  model: any = {};
  discount:Discount;
  itemtitle:string="All Items";
  // All Product
  displayedColumns: string[] = [
    'productname',
    'description',
    'vendorcode',
    'sellingprice',
    'price',
    'editdelete'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
 
  // Free Gift Data table
  displayedColumns2: string[] = [
    'productname',
    'discounttime'
    ,'action'
  ];
  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{ static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort,{ static: true }) sort2: MatSort;

  //Discount Table
  displayedColumns3: string[] = [
    'Product',
    'discount'
    ,'discounttime',
    'Qty',
    'price',
    'Action'
  ];
  dataSource3: MatTableDataSource<any>;
  //ngAfterViewInit() {
  //  this.dataSource2.paginator = this.paginator2;
   // this.dataSource2.sort = this.sort2;
  //}
  tempid=null;
  tempnumber=null;
  public leftdetails=false;
  public discountdetails='none';
  public editdeletediv=false;
  public fiberdetails='none';
  public alldetails='none';
  public freegiftdetails='none';

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
    private dialog: MatDialog,
    private router: Router,
    private catprodservice: CategoryproductService,
    private snackBar: MatSnackBar,
    private printDialogService: PrintDialogService
    ) { 

      this.dataSource = new MatTableDataSource(this.allproductlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

   
  //  public NAMES = [];

  ngOnInit() {
   
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leftdetails=true;
    this.allcategorylist();
    this.allproductList();
    //this.alldetails='block';
    this.alldiscountList();
    this.allfreegiftList();

  /*  for (let i = 1; i < 100; i++) {
      let newName = {
         id:i.toString(),
         value1:"Ubalton",
         value2:"+91 88704662431",
         value3:"alex@gmail.com",
         value4:"Tamil Nadu",
         value5:"India",
         value6:"+91 4763212",
         value7:"10000",
         value8:"MCA",
         value9:"Male",
         value10:"Active",
         value11:"Delhi",
      };
      this.NAMES.push(newName);
  } */
  }

  

  printPage(data) {
    this.printDialogService.openDialog(data);
  }

  allcategorylist(){
    this.categorylist="";
    this.catprodservice.load()
    .subscribe(
      data => {
        this.categorylist = data;
        console.log("Category code-->"+this.categorylist[0].categorycode)
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

  allproductList(){
    this.catprodservice.loadItem("all")
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
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
  }

  alldiscountList(){
    let discount="discount";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.alldiscountlist = data;
        console.log("discount code -->"+this.alldiscountlist.discountcode);
        this.dataSource3 = new MatTableDataSource(this.alldiscountlist);
        this.dataSource.paginator = this.paginator;
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

  allfreegiftList(){
    console.log("free gift");
    let discount="freegift";
    this.catprodservice.loadDiscount(discount)
    .subscribe(
      data => {
        this.allfreegiftlist = data;
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


  allproductFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  freegiftFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showCategoryItems(categorycode:string,categoryname:string){
    console.log("Category code -->"+categorycode);
    console.log("Category name -->"+categoryname);
    this.itemtitle=categoryname;
    console.log("Inside showCategoryItems");
    this.catprodservice.loadItem(categorycode)
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
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
    );
    //this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;

  }
categorydetails(number: string){
  console.log("Inside categorydetails");
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;
// All item tab click
  if(number=='01'){
    console.log("Inside all items");
    this.itemtitle="All Items";
    this.allproductList();
    this.alldetails='block';
    this.discountdetails='none';
    this.freegiftdetails='none';
    this.editdeletediv=false;
  }

  // Discount tab click
  if(number=='02'){
    this.alldiscountList();
    console.log("Inside discount");
    this.alldetails='none';
   this.discountdetails='block';
    this.alldetails='none';
    this.freegiftdetails='none';
    this.editdeletediv =false;
  }

  // Free gift tab click
  if(number=='03'){
    this.allfreegiftList();
    console.log("Inside free gift");
    this.dataSource2 = new MatTableDataSource(this.allfreegiftlist);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
    this.freegiftdetails='block';
    this.itemtitle="Free Gift";
    this.leftdetails=true;
    this.alldetails='none';
    this.discountdetails='none';
    //this.fiberdetails='block';
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
      'top': '100',
      left: '100'
    };
    this.dialog.open(AddnewcategoryComponent,{
      height:'55vh',width:'80vh',
      panelClass: 'addnewcategory'
     // data: {dialogTitle: "hello", dialogText: "text"},
    })
    .afterClosed().subscribe(result => {
      this.allcategorylist();
    }
    );
  }

  addpromotion(title:string,show:string){
    //this.successdialog = 'block';

    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(AddpromotionComponent,{
      panelClass: 'addpromotion',
      data: {title: title, key: show}
    })
    .afterClosed().subscribe(result => {
      this.alldiscountList();
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
      this.allcategorylist();
    });
  }

  discountEdit(discountcode:string){
    console.log("discount code --> "+discountcode);
    console.log("inside discountEdit ");
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
    console.log("discount detlete - promotion code -->"+discountcode);
    this.catprodservice.discountremove(discountcode)
      .subscribe(
        data => {
          this.discount =  data;  
          if(this.discount.status == "Success"){
            setTimeout(() => {
              this.snackBar.open("Discount Deleted Successfully", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });      
        }else if(this.discount.status == "failure"){
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
        });      }
    );
  }

  addNewProduct(){
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {


//      'top': '100',
  //    left: '100'
    };
    this.dialog.open(AddnewproductComponent,{ 
      height:'100vh',
      width:'150vh',
      panelClass: 'addnewproduct',
    })
    .afterClosed().subscribe(result => {
      this.allproductList();
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
      this.allproductList();
    }); 
  }

  allproducteditcall(prodcode: string){
    console.log("allproducteditcall");
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
    this.allproductList();

  });

  }
  allproductdelete(prodcode: string){
    console.log("detete product");
    this.catprodservice.productremove(prodcode)
      .subscribe(
        data => {
          this.product =  data;  
          if(this.product.status == "Success"){
            setTimeout(() => {
              this.snackBar.open("Product Deleted Successfully", "", {
                panelClass: ["error"],
                verticalPosition: 'top'      
              });
            });
        
        }else if(this.product.status == "failure"){
          
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
        });      }
    );
  }

  }
