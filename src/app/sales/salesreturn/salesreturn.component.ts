import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { SalesService } from '../sales.service';
import { PurchaseService } from '../../purchase/purchase.service';

@Component({
  selector: 'app-salesreturn',
  templateUrl: './salesreturn.component.html',
  styleUrls: ['./salesreturn.component.css']
})
export class SalesreturnComponent implements OnInit {
  model: any ={};
  public customerList : any;
  public productList : any;
  public categoryList : any;
  dialogConfig = new MatDialogConfig();
  isDtInitialized:boolean = false;
  constructor(
    private salesService: SalesService,
    private purchaseService: PurchaseService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) { 
  
  }

  ngOnInit() {
    this.getCustomerList();
    this.getcategoryList();
    this.getProductList();
    this.customerList = ['Josni', 'Nisho', 'Alex', 'Jeff'];
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
  }

  getCustomerList(){
    this.salesService.loadCustomerList()
    .subscribe(res => { 
      this.customerList = res;
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
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
    var customerName=$("#customerName").val();
    var productName=$("#productName").val();
    var category=$("#category").val();
    var quantity=$("#quantity").val();
    var soDate=$("#soDate").val();
    var itemStatus = $("input[id='itemStatus']:checked").val();
    var returnStatus = $("input[id='returnStatus']:checked").val();

    var details= "<tr><td style='vertical-align: middle;border:1px solid white;'>" + soDate + "</td><td style='vertical-align: middle;border:1px solid white;'>"+ productName 
      +"<td style='vertical-align: middle;border:1px solid white;'>"+ category 
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + customerName + "</td><td style='vertical-align: middle;border:1px solid white;'>" + quantity
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + itemStatus + "</td><td style='vertical-align: middle;border:1px solid white;'>" + returnStatus +"</td>";
    $("#addsalereturntable").append(details);
    $("#customerName").val("");
    $("#productName").val("");
    $("#category").val("");
    $("#quantity").val("");
    $("#soDate").val("");
    $('input[type="radio"]').prop('checked', false);
    $("#itemStatus").val('');
    $("#returnStatus").val('');
  }

  saveSalesReturn(){
    var myReturnArray = [];
			$("#addsalereturntable tr").each(function() {
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
      
      this.salesService.saveSalesReturn(myReturnArray)
        .subscribe(res => { 
          this.model = res;
          console.log("Status -->"+res);
          this.alertService.success("Successfully Saved..");
          setTimeout(() => {
            this.alertService.clear();
          }, 1500);
          window.location.reload();
      },
      error => {
        setTimeout(() => {
          this.alertService.error("Network error: server is temporarily unavailable");
        }, 2000);
      }
    );
  }

  cancelSalesReturn(){
    console.log("cancelSalesReturn Calling");
  }


}
