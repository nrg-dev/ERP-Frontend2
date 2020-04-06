import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerService } from "../../services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit, AfterViewInit {

  model: any = {};
  constructor( 
    private customerService: CustomerService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CustomerAddComponent>
    ) { }

  ngOnInit() {
    this.addCustomerFields();
  }

  ngAfterViewInit() {
    (<HTMLElement>document.querySelector('.mat-dialog-container')).style.background = 'inherit';
   }

  cancelCustomer(){}
  saveCustomer() { 
    this.customerService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Customer created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.addCustomerClose();
          this.customerService.load();
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

  addCustomerClose() {
    this.dialogRef.close();
  }

  addCustomerFields() {
    this.model.customerName = '';
    this.model.address = '';
    this.model.phoneNumber = '';
    this.model.mobileNumber = '';
    this.model.email = '';
    this.model.country = '';
    this.model.city = '';
  }
}
