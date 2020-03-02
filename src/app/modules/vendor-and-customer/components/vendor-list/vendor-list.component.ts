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

import { VendorDetailComponent } from "../vendor-detail/vendor-detail.component";
import { Vendor } from "./vendor-list.model";

@Component({
  selector: "app-vendor-list",
  templateUrl: "./vendor-list.component.html",
  styleUrls: ["./vendor-list.component.scss"]
})
export class VendorListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private vendorDetail: VendorDetailComponent;
  @ViewChild(VendorDetailComponent, { static: false }) set content(
    content: VendorDetailComponent
  ) {
    setTimeout(() => {
      this.vendorDetail = content;
    }, 0);
  }

  showDetail: boolean;
  vendorsDS: Vendor[];
  vendors: MatTableDataSource<Vendor>;
  vendor;
  displayedColumns: string[] = ["vendorCode", "vendorName", "phone", "action"];
  constructor() {}

  ngOnInit() {
    this.vendorsDS = VendorsMock;
    this.vendors = new MatTableDataSource(this.vendorsDS);
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
        } else if (edit === "ADD_NEW") {
          this.vendorDetail.isAddNew = true;
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
}
