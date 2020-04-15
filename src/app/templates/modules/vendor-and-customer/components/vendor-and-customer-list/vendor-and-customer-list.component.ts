import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
  AfterContentChecked,
  OnDestroy
} from "@angular/core";

import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { VendorAndCustomerDetailComponent } from "../vendor-and-customer-detail/vendor-and-customer-detail.component";
//import { Vendor } from "./vendor-and-customer-list.component.model";
import { VendorService } from "../../services/vendor.service";
import { CustomerService } from "../../services/customer.service";
import { Customer, Vendor } from "src/app/core/common/_models";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";

@Component({
  selector: "app-vendor-and-customer-list",
  templateUrl: "./vendor-and-customer-list.component.html",
  styleUrls: ["./vendor-and-customer-list.component.scss"]
})
export class VendorAndCustomerListComponent implements OnInit, OnDestroy {
  @Input() tabChange: boolean = false;
  @Input() componentType: string;
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

  chosenId: any;
  showDetail: boolean;
  vendorListshow: boolean;
  customerListshow: boolean;
  //vendorsDS: Vendor[];
  vendorsDS = [];
  customersDS: any = {};
  vendors: MatTableDataSource<Vendor>;
  vendor: Vendor;
  isEditMode: boolean;
  displayedColumns: string[] = [
    "vendorCode",
    "vendorName",
    "addeddate",
    "phone",
    "action"
  ];

  customers: MatTableDataSource<Customer>;
  customer: Customer;
  displayedColumns2: string[] = [
    "custcode",
    "customerName",
    "addeddate",
    "phoneNumber",
    "action"
  ];

  isSortCodeDesc: boolean = false;
  isSortCodeAsc: boolean = true;
  
  constructor(
    private vendorService: VendorService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private printDialogService: PrintDialogService
  ) {}

  ngOnInit() {
     this.getAllVendorDetails();
     this.removeScrollBar();
  }
 
  ngOnDestroy() {
    (<HTMLElement>(
      document.querySelector(".mat-drawer-content")
    )).style.overflow = "auto";
  }

  removeScrollBar() {
    setTimeout(function () {
      (<HTMLElement>(
        document.querySelector(".mat-drawer-content")
      )).style.overflow = "inherit";
    }, 300);
  }

  getAllVendorDetails() {
    console.log("getAllVendorDetails");
    this.vendorService.load().subscribe(
      (data: Vendor[]) => {
        this.vendorsDS = data;
        this.vendors = new MatTableDataSource(this.vendorsDS);
        this.vendors.paginator = this.paginator;
      },
      error => {
        setTimeout(() => {
          this.snackBar.open(
            "Network error: server is temporarily unavailable",
            "dismss",
            {
              panelClass: ["error"],
              verticalPosition: "top"
            }
          );
        });
      }
    );
  }

  sortByOrder(column: string, order: string) {
    if (column === "code" && order === "desc") {
      this.isSortCodeDesc = true;
      this.isSortCodeAsc = false;
      this.vendorsDS.sort((a, b) => b.vendorcode.localeCompare(a.vendorcode));
    } else if (column === "code" && order === "asc") {
      this.isSortCodeDesc = false;
      this.isSortCodeAsc = true;
      this.vendorsDS.sort((a, b) => a.vendorcode.localeCompare(b.vendorcode));
    } 
  }
}
