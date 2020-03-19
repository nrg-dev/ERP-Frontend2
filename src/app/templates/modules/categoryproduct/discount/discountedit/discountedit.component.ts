import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Discount } from '../../../../../core/common/_models/discount';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { CategoryproductService } from '../../services/categoryproduct.service';

//discountedit start
@Component({
  selector: 'discountedit',
  styleUrls: ['./discountedit.component.scss'],
  templateUrl: './discountedit.component.html', 
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
