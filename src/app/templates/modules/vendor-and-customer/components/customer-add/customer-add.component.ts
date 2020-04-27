import { CustomerService } from "../../services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject,Optional } from '@angular/core';

export interface UsersData{
  key:string;
}
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
//export class CustomerAddComponent implements OnInit, AfterViewInit {

  model: any = {};
  local_data: any = {};
  key:string;
  type:boolean;
  labelname:string;
  name:string;
  showTasksOf:string;
  constructor( 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private customerService: CustomerService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CustomerAddComponent>
    ) { 
      this.local_data = {...data};
      this.key = this.local_data.key;
      if(this.key!=null){
        console.log("Venodr Register");
        this.type=true; // vendor
        this.labelname="Vendor Name";
        this.showTasksOf="vendor";

      }else {
        console.log("Customer Register");
        this.type=false; // customer
        this.labelname="Customer Name";
        this.name="customerName";
        this.showTasksOf="customer";


      }

    }

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
