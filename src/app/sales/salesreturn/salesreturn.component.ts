import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { Sales } from 'src/app/_models';
import { AlertService } from 'src/app/_services';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/_directives';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { SalesService } from '../sales.service';

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
    private dialog: MatDialog,
    private alertService: AlertService
  ) { 
  
  }

  ngOnInit() {
    this.customerList = ['Josni', 'Nisho', 'Alex', 'Jeff'];
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
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
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + customerName + "</td><td style='vertical-align: middle;border:1px solid white;'>" + quantity
      +"</td><td style='vertical-align: middle;border:1px solid white;'>" + itemStatus + "</td><td style='vertical-align: middle;border:1px solid white;'>" + returnStatus 
      +"</td><td style='border:1px solid white;'>" + '&nbsp;<div style="background: #dc7218;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" (click)="printSale()"><i class="fa fa-print" aria-hidden="true"></i></div>'
      +' &nbsp;<div style="background: #267CB4;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" ng-click="editSales()"><i class="fa fa-pencil-square-o"></i></div>&nbsp;' 
      +'<div style="background: #EF6956;border-radius: 16px;height:30px;width:30px;margin-top: -16px;" onclick="deleteSales()"><i class="fa fa-trash-o"></i></div>' +"</td></tr>";
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

  printSale(){
    alert("Print Calling");
  }

  editSales(){
    alert("Edit Calling");
  }

  deleteSales(){ 
    alert("Click to delete");
    this.alertService.success("Successfully Deleted ");
    setTimeout(() => {
      this.alertService.clear();
    }, 2000);
  }

}
