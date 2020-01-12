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
    this.vendorList = ['Josni', 'Nisho', 'Alex', 'Jeff'];
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
  }

  addProduct(){
    var vendorName=$("#vendorName").val();
    var productName=$("#productName").val();
    var category=$("#category").val();
    var quantity=$("#quantity").val();
    var soDate=$("#soDate").val();
    var itemStatus = $("input[id='itemStatus']:checked").val();
    var returnStatus = $("input[id='returnStatus']:checked").val();

    var details= "<tr><td>" + soDate + "</td><td>"+ productName +"</td><td>" + vendorName + "</td><td>" + quantity+ "</td><td>" + itemStatus + "</td><td>" + returnStatus + "</td><td>" + ' <div id="rowview-div" (click)="viewinvoice()"><i class="fa fa-eye" aria-hidden="true"></i></div> <div (click)="editinvoice()"><i class="fa fa-pencil-square-o"></i></div>' + "</td></tr>";
    $("#addpurchasereturntable").append(details);
    $("#productName").val("");
    $("#category").val("");
    $("#quantity").val("");
    $("#soDate").val("");
    $('input[type="radio"]').prop('checked', false);
    $("#itemStatus").val('');
    $("#returnStatus").val('');
  }
}
