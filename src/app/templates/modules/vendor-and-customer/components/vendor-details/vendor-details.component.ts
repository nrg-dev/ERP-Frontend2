import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';

import { VendorDetailsService } from './../../services/vendorDetails.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  allCategoryItems = [];
  backAllCategoryItems = [];
  filteredItems = [];
  categoriesForFilter:any = [];
  selectedCategoryInFilter:any;
  dropDownView = false;
  selectedCategory = "All Category"


  @HostListener('document:click', ['$event']) closeNaviOnOutClick(event) {

    if (event.target && event.target.classList.contains('drop-down-arrow')) {
      return;
    }

    if (event.target && event.target.classList.contains('menu-item')) {
      return;
    }

    if(this.dropDownView) {
      this.dropDownView = false;
    }
    return;
  }

  constructor(
    private dialogRef: MatDialogRef<VendorDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private vendorDetailsService:VendorDetailsService
    ) { }

  ngOnInit() {

    // this.vendorDetailsService.loadsidepanel(this.data.vendorcode).subscribe(data => {
    //   console.log(data);
    // })

    this.vendorDetailsService.loadallcategoryitems().subscribe((data:any) => {
        if(!data.length) return;
        this.backAllCategoryItems = data;
      this.filterItems({ categorycode:null});
    })

    this.vendorDetailsService.loadallcategories().subscribe((data:any) => {
      this.categoriesForFilter = data;
    });

  }

  searchItems(event) {

    const searchPhrase = String(event.target.value).trim().toLocaleLowerCase();
    const itemsToSearch = this.filteredItems || [];

    const searchResult = itemsToSearch.filter((item) => {
      return String(item.productname).trim().toLocaleLowerCase().includes(searchPhrase);
    });

    this.allCategoryItems = searchResult;
  }

  filterItems({ categorycode }) {

    if(!categorycode){
      this.allCategoryItems = this.backAllCategoryItems;
      this.filteredItems = this.backAllCategoryItems;
      return;
    }
    this.allCategoryItems = this.backAllCategoryItems.filter((item) => item.categorycode === categorycode);
    this.filteredItems = this.allCategoryItems;
  }

  vendorDetailsClose(): void {
    this.dialogRef.close();
  }

  categoyDropDownHandler():void {
    this.dropDownView = !this.dropDownView;
  }

  selectCategory(item):void {
    this.dropDownView = false;
    this.selectedCategory = item.name;
    this.filterItems(item);
  }

}
