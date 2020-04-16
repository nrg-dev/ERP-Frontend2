import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';

import { VendorDetailsService } from './../../services/vendorDetails.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<VendorDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private vendorDetailsService:VendorDetailsService
    ) { }

  ngOnInit() {
    console.log(this.data.vendorcode);
    this.vendorDetailsService.loadsidepanel(this.data.vendorcode).subscribe(data => {
      console.log(data);
    })

    this.vendorDetailsService.loadallcategory().subscribe(data => {
      console.log('all', data);
    })
  }

}
