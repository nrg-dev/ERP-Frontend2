import { Component, Inject, ElementRef, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';

import { VendorDetailsService } from './../../services/vendorDetails.service';
import { element } from 'protractor';

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
  selectedCategory = "All Category";
  editIndex = -1;
  onEdit = -1;
  isLabelEdited = false;
  labelNewText="";


  @HostListener('document:click', ['$event']) closeNaviOnOutClick(event) {

    if (event.target && event.target.classList.contains('drop-down-arrow')) {
      return;
    }

    if (event.target && event.target.classList.contains('menu-item')) {
      return;
    }

    if (event.target && event.target.classList.contains('input')) {
      return;
    }

    if (event.target && event.target.classList.contains('menu-edit')) {
      return;
    }

    if(this.dropDownView) {
      this.dropDownView = false;
    }
    return;
  }

  constructor(
    private dialogRef: MatDialogRef<VendorDetailsComponent>,
    private eRef: ElementRef,
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
    this.editMenu(-1);
    this.isLabelEdited = false;
  }

  selectCategory(item):void {
    this.dropDownView = false;
    this.selectedCategory = item.name;
    this.filterItems(item);
  }

  showEditMenu(index){
    this.editIndex = index;
  }

  editMenu(i){
    this.onEdit = i;
    this.dropDownView = true;
  }

  menuLabelChange(event){
    if (!event.target.value.trim()) {
      this.isLabelEdited = false;
      this.labelNewText = "";
      return;
    }
    this.isLabelEdited = true;
    this.labelNewText = event.target.value;
    
  }

  updateMenu(index){
    this.categoriesForFilter[index]['name'] = this.labelNewText;
    this.dropDownView = false;
  }

}
