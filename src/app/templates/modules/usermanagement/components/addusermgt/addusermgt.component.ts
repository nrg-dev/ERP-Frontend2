import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { Component, OnInit, Inject,Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserManagementService } from "../../services/usermanagement.service";

@Component({
  selector: 'app-addusermgt',
  templateUrl: './addusermgt.component.html',
  styleUrls: ['./addusermgt.component.scss']
})
export class AddUserMgtComponent implements OnInit {
  disabled = false;
  showFilter = false;
  limitSelection = false;
  purdropdownList:any = [];
  proddropdownList:any = [];
  saledropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  model:any = {};
  departmentList:any = {};

  public purchase = false;
  public product = false;
  public sales = false;
  
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddUserMgtComponent>,
    private snackBar: MatSnackBar,
    private userMgtService: UserManagementService
  ) { 
    
  }

  ngOnInit() {
    this.userMgtService.loadDepartment().subscribe(
      data => { 
        this.departmentList = data;
      },
      error => { }
    );

    this.purdropdownList = [
      { item_id: 1, item_text: 'Orders' },
      { item_id: 2, item_text: 'Invoices' },
      { item_id: 3, item_text: 'Return' }
    ];

    this.proddropdownList = [
      { item_id: 1, item_text: 'product' },
      { item_id: 2, item_text: 'units' },
      { item_id: 3, item_text: 'category' }
    ];

    this.saledropdownList = [
      { item_id: 1, item_text: 'Orders' },
      { item_id: 2, item_text: 'Invoices' },
      { item_id: 3, item_text: 'Customer' },
      { item_id: 4, item_text: 'Return' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
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

  userMgtClose(){
    this.dialogRef.close();
  }

  getPurchase(){
    this.purchase = true;
  }

  getProduct(){
    this.product = true;
  }

  getSales(){
    this.sales = true;
  }

}
