import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VendorService } from "../../services/vendor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit, AfterViewInit {

  model: any = {};
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  constructor( 
    private vendorService: VendorService, 
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<VendorAddComponent>
    ) { }

  ngOnInit() {
    this.addVendorFields();
  }

  ngAfterViewInit() {
    (<HTMLElement>document.querySelector('.mat-dialog-container')).style.background = 'inherit';
   }

  cancelVendor(){}
  saveVendor() { 
    this.model.cardImageBase64=this.cardImageBase64;
    this.vendorService.save(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Vendor created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
          this.addVendorClose();
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
  }

  addVendorClose() {
    this.dialogRef.close();
  }

  addVendorFields() {
    this.model.vendorName = '';
    this.model.address = '';
    this.model.phoneNumber = '';
    this.model.mobileNumber = '';
    this.model.email = '';
    this.model.country = '';
    this.model.city = '';
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 1200;
        const max_width = 600;

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

}
