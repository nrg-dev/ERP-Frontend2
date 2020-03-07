import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
  AfterContentChecked
} from "@angular/core";

import { MatTableDataSource, MatPaginator } from "@angular/material";
import { VendorsMock } from "src/app/config/mock/vendors.mock";

import { VendorAndCustomerDetailComponent } from "../vendor-and-customer-detail/vendor-and-customer-detail.component";
import { Vendor } from "./vendor-and-customer-list.component.model";

@Component({
  selector: "app-vendor-and-customer-list",
  templateUrl: "./vendor-and-customer-list.component.html",
  styleUrls: ["./vendor-and-customer-list.component.scss"]
})
export class VendorAndCustomerListComponent implements OnInit, OnChanges {
  @Input() tabChange: boolean = false;
  @Input() componentType: "string";
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private vendorDetail: VendorAndCustomerDetailComponent;
  @ViewChild(VendorAndCustomerDetailComponent, { static: false }) set content(
    content: VendorAndCustomerDetailComponent
  ) {
    setTimeout(() => {
      this.vendorDetail = content;
    }, 0);
  }

  showDetail: boolean;
  vendorsDS: Vendor[];
  vendors: MatTableDataSource<Vendor>;
  vendor:Vendor;
  displayedColumns: string[] = ["vendorCode", "vendorName", "phone", "action"];
  constructor() {}

  ngOnInit() {
    this.vendorsDS = VendorsMock;
    this.vendors = new MatTableDataSource(this.vendorsDS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabChange) {
      this.showDetail = false;
      if (this.vendors) {
        this.vendors.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit(): void {
    this.vendors.paginator = this.paginator;
  }

  toggleVendorDetailView(vendorCode?, edit?) {
    this.showDetail = !this.showDetail;
    this.vendor = undefined;

    if (vendorCode) {
      const chosenEmployee = this.vendorsDS.filter(
        vendor => vendor.vendorCode === vendorCode
      );
      if (chosenEmployee.length && chosenEmployee.length > 0) {
        this.vendor = chosenEmployee[0];
      }

      setTimeout(() => {
        if (edit && this.vendorDetail) {
          this.vendorDetail.isEditMode = true;
          this.vendorDetail.isAddNew = false;
        }
      }, 50);
    } else {
      setTimeout(() => {
        if (edit === "ADD_NEW") {
          alert("vendor");

          this.vendorDetail.isAddNew = true;
          this.vendorDetail.isAddNewCustomer = false;
          this.vendorDetail.isEditMode = false;
        }
        if (edit === "ADD_NEW_CUST") {
          alert("customer");
          this.vendorDetail.isAddNewCustomer = true;
          this.vendorDetail.isAddNew = false;
          this.vendorDetail.isEditMode = false;
        }

        

      }, 50);
    }
  }

  deleteVendor(vendorCode: number) {
    this.vendorsDS = this.vendorsDS.filter(
      vendor => vendor.vendorCode !== vendorCode
    );
    this.vendors.data = this.vendorsDS;
  }

  backNavigation() {
    this.showDetail = false;
    setTimeout(() => {
      this.vendors.paginator = this.paginator;
    }, 0);
  }

  applyFilter(filterValue: string) {
    this.vendors.filter = filterValue.trim().toLowerCase();

    if (this.vendors.paginator) {
      this.vendors.paginator.firstPage();
    }
  }
}
