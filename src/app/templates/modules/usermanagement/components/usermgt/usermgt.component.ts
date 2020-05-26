import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: "app-usermgt",
  templateUrl: "./usermgt.component.html",
  styleUrls: ["./usermgt.component.scss"]
})
export class UserManagementComponent implements OnInit {
  activeTab: number = 0;
  disabled = false;
  showFilter = false;
  limitSelection = false;
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  model:any = {};

  constructor() {
    
  }


  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.showFilter,
      closeDropDownOnSelection: true,
    };

  }

  onItemSelect(item: any) {
    console.log('onItemSelect',item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll',items);
  }

  tabChanged(event) {
    this.activeTab = event;
  }

  setTabIndex(tabIndex) {
    this.activeTab = tabIndex;
  }


}
