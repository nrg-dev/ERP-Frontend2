import { CustomerService } from "../../services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject,Optional } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import * as _ from 'lodash';

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

  imageError:string;
  isImageSaved:boolean;
  cardImageBase64: string;
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
    private vendorService: VendorService, 
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
    this.emptyFields();
  }

  ngAfterViewInit() {
    (<HTMLElement>document.querySelector('.mat-dialog-container')).style.background = 'inherit';
  }

  fileChangeEvent(fileInput: any) {
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

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
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
            this.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  save(labelname:string) { 
    if(labelname == "Vendor Name"){
      this.model.vendorbase64 = this.cardImageBase64;
      this.vendorService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Vendor created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.dialogClose();
          this.vendorService.load();
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
    }else if(labelname == "Customer Name"){
      this.model.customerbase64 = this.cardImageBase64;
      this.customerService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Customer created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.dialogClose();
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
  }

  dialogClose() {
    this.dialogRef.close();
  }

  emptyFields() {
    this.model.customerName = '';
    this.model.vendorName = '';
    this.model.address = '';
    this.model.phoneNumber = '';
    this.model.mobileNumber = '';
    this.model.email = '';
    this.model.country = '';
    this.model.city = '';
  }
}
