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

  passwordtype = "password";
  purchaseArray: Array<any> = [];
  prodArray: Array<any> = [];
  salesArray: Array<any> = [];
  
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddUserMgtComponent>,
    private snackBar: MatSnackBar,
    private userMgtService: UserManagementService
  ) { 
    
  }

  ngOnInit() {
    this.model.password = "";
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
  
  onPurchaseSelect(item: any) {
    alert('Purchase onItemSelect'+item);
    this.purchaseArray.push({
      pursubmenu : item
    });
  }
  onPurSelectAll(items: any) {
    alert('purchase onSelectAll'+items);
    this.purchaseArray.push({
      pursubmenu : items
    });
  }

  onProductSelect(item: any) {
    alert('Product onItemSelect'+item);
    this.prodArray.push({
      productsubmenu : item
    });
  }

  onprodSelectAll(items: any) {
    alert('product onSelectAll'+items);
    this.prodArray.push({
      productsubmenu : items
    });
  }

  onSalesSelect(item: any) {
    alert('Sales onItemSelect'+item);
    this.salesArray.push({
      productsubmenu : item
    });
  }

  onSalesAll(items: any) {
    alert('Sales onSelectAll'+items);
    this.salesArray.push({
      productsubmenu : items
    });
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

  saveUserMgt(){
    alert("user Name -->"+this.model.username);
    alert("Password -->"+this.model.password);
    alert("Department Name -->"+this.model.departmentname);
    alert("Menu Name1 -->"+this.model.menuItem1);
    alert("Menu Name2 -->"+this.model.menuItem2);
    alert("Menu Name3 -->"+this.model.menuItem3);
    alert("Menu Name4 -->"+this.model.menuItem4);
    alert("Menu Name5 -->"+this.model.menuItem5);
    alert("Menu Name6 -->"+this.model.menuItem6);
    alert("Menu Name7 -->"+this.model.menuItem7);
    alert("Menu Name8 -->"+this.model.menuItem8);
    alert("Menu Name9 -->"+this.model.menuItem9);
    alert("Purchase Sub Name -->"+this.purchaseArray);
    alert("Product Sub Name -->"+this.prodArray);
    alert("Sales Name -->"+this.salesArray);
  }
}
