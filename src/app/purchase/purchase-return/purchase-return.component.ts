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
        alert('Error !!!!');
      }
    );
  }

  getcategoryList(){
    this.purchaseService.loadCategory()
    .subscribe(res => { 
      this.categoryList = res;
      },
      error => {
        alert('Error !!!!');
      }
    );
  }

  getProductList(){
    this.purchaseService.loadItem()
    .subscribe(res => { 
      this.productList = res;
      },
      error => {
        alert('Error !!!!');
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
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + vendorName + "</td><td style='vertical-align: middle;border:1px solid white;'>" + quantity
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + itemStatus + "</td><td style='vertical-align: middle;border:1px solid white;'>" + returnStatus 
      +"</td><td style='border:1px solid white;'>" + '&nbsp;<div style="background: #dc7218;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" (click)="printPurchase()"><i class="fa fa-print" aria-hidden="true"></i></div>'
      +' &nbsp;<div style="background: #267CB4;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" (click)="editPurchase()"><i class="fa fa-pencil-square-o"></i></div>&nbsp;' 
      +'<div style="background: #EF6956;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" onclick="deletePurchase()"><i class="fa fa-trash-o"></i></div>' +"</td></tr>";

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

  printPurchase(){
    alert("------ View Purchase ------");
  }

  editPurchase(){
    alert("------ Edit Purchase ------"); 
  }

  /*$scope.deletePurchase = function(){
    alert("------ Delete Purchase ------"); 

  };*/

  deletePurchase(){
    alert("-------- Delete Purchase Calling -------")
  }
  
}

