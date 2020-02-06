import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Purchase } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css']
})
export class PurchaseReturnComponent implements OnInit {

  model: any ={};
  public vendorList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {  
  

   }

  ngOnInit() {
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
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
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
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  addProduct(){
    var vendorName=$("#vendorName").val();
    var productName=$("#productName").val();
    var category=$("#category").val();
    var quantity=$("#quantity").val();
    var poDate=$("#poDate").val();
    var itemStatus = $("input[id='itemStatus']:checked").val();
    var returnStatus = $("input[id='returnStatus']:checked").val();
    var details= "<tr><td style='vertical-align: middle;border:1px solid white;'>" + poDate + "</td><td style='vertical-align: middle;border:1px solid white;'>"+ productName 
      +"<td style='vertical-align: middle;border:1px solid white;'>"+ category 
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + vendorName + "</td><td style='vertical-align: middle;border:1px solid white;'>" + quantity
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + itemStatus + "</td><td style='vertical-align: middle;border:1px solid white;'>" + returnStatus + "</td>";

    $("#addpurchasereturntable").append(details);
    $("#vendorName").val("");
    $("#productName").val("");
    $("#category").val("");
    $("#quantity").val("");
    $("#poDate").val("");
    $('input[type="radio"]').prop('checked', false);
    $("#itemStatus").val('');
    $("#returnStatus").val('');
  }

  savePurchaseReturn(){
    var myReturnArray = [];
			$("#addpurchasereturntable tr").each(function() {
				var arrayOfThisRow = [];
				var tableData = $(this).find('td');
				if (tableData.length > 0) {
					tableData.each(function() { 
					if($(this).text()!=""){
						arrayOfThisRow.push($(this).text()); 
					}
					});
					myReturnArray.push('['+arrayOfThisRow+']');
					}
      });
      
      this.purchaseService.savePurchaseReturn(myReturnArray)
        .subscribe(res => { 
          this.model = res;
          console.log("Status -->"+res);
          this.alertService.success("Successfully Saved..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }
  
  /*$scope.deletePurchase = function(){
    console.log("------ Delete Purchase ------"); 

  };*/

  cancelPurchaseReturn(){
    console.log("-------- cancel PurchaseReturn Calling -------")
  }
  
}

