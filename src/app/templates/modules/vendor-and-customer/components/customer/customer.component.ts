import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
  AfterContentChecked
} from "@angular/core";

import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { VendorAndCustomerDetailComponent } from "../vendor-and-customer-detail/vendor-and-customer-detail.component";
import { CustomerAddComponent } from "../customer-add/customer-add.component";
//import { Vendor } from "./vendor-and-customer-list.component.model";
import { VendorService } from "../../services/vendor.service";
import { CustomerService } from "../../services/customer.service";
import { Customer, Vendor } from "src/app/core/common/_models";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
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
  dialogConfig = new MatDialogConfig();

  chosenId: any;
  showDetail: boolean;
  vendorListshow: boolean;
  customerListshow: boolean;
  //vendorsDS: Vendor[];
  vendorsDS: any = {};
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

  constructor(
    private vendorService: VendorService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private printDialogService: PrintDialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.getAllVendorDetails();
    // this.vendorsDS = this.getAllVendorDetails();
    //this.vendors = new MatTableDataSource(this.vendorsDS);
    this.getAllCustomerDetails();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.tabChange && changes.componentType.currentValue) {
  //     this.showDetail = false;
  //     if (changes.componentType.currentValue === "Vendor") {
  //       this.getAllVendorDetails();
  //       this.vendorListshow = true;
  //       this.customerListshow = false;
  //     } else {
  //       this.getAllCustomerDetails();
  //       this.customerListshow = true;
  //       this.vendorListshow = false;
  //     }
  //     if (this.vendors) {
  //       this.vendors.paginator = this.paginator;
  //     }
  //   }
  // }

  getAllCustomerDetails() {
    console.log("getAllCustomerDetails");
    this.customerService.load().subscribe(
      (data: Customer[]) => {
        this.customersDS = data;
        this.customers = new MatTableDataSource(this.customersDS);
        this.customers.paginator = this.paginator;
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

  addCustomer() {
    let data = {};
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.position = {
      'top': '1000',
      left: '100'
    };
    this.dialog.open(CustomerAddComponent,{
      panelClass: 'addcustomer',
      data: data,
      disableClose: true,
      hasBackdrop: false
    })
    .afterClosed().subscribe(result => {
     this.getAllCustomerDetails();
    });
   
  }

  toggleVendorDetailView(code?, edit?) {
    this.showDetail = !this.showDetail;
    this.vendor = undefined;
    this.chosenId = code;
    this.isEditMode = edit;
    let assignValue = '';
    if (code && !edit) {
      assignValue = 'viewCustomer';
    } else {
      assignValue = edit ? 'Customer':'addCustomer';
    }
    this.customerService.getComponentType(assignValue);
   }

  deleteVendorCustomer(code: string, deleteType: string) {
    console.log("code -->" + code);
    console.log("remove type -->" + deleteType);
    // if (deleteType == "vendor") {
    //   this.vendorService.remove(code).subscribe(
    //     data => {
    //       this.vendor = data;
    //       if (this.vendor.status == "Success") {
    //         setTimeout(() => {
    //           this.snackBar.open("Vendor is detleted successfully", "", {
    //             panelClass: ["error"],
    //             verticalPosition: "top"
    //           });
    //         });
    //         this.getAllVendorDetails();
    //       } else {
    //         setTimeout(() => {
    //           this.snackBar.open(
    //             "Network error: server is temporarily unavailable",
    //             "dismss",
    //             {
    //               panelClass: ["error"],
    //               verticalPosition: "top"
    //             }
    //           );
    //         });
    //       }
    //     },
    //     error => {
    //       setTimeout(() => {
    //         this.snackBar.open(
    //           "Network error: server is temporarily unavailable",
    //           "dismss",
    //           {
    //             panelClass: ["error"],
    //             verticalPosition: "top"
    //           }
    //         );
    //       });
    //     }
    //   );
    // } else {
      this.customerService.remove(code).subscribe(
        data => {
          this.customer = data;
          if (this.customer.status == "Success") {
            setTimeout(() => {
              this.snackBar.open("Customer is detleted successfully", "", {
                panelClass: ["error"],
                verticalPosition: "top"
              });
            });
            this.getAllCustomerDetails();
          } else {
            setTimeout(() => {
              this.snackBar.open(
                "Network error: server is temporarily unavailable",
                "",
                {
                  panelClass: ["error"],
                  verticalPosition: "top"
                }
              );
            });
          }
        },
        error => {
          setTimeout(() => {
            this.snackBar.open(
              "Network error: server is temporarily unavailable",
              "",
              {
                panelClass: ["error"],
                verticalPosition: "top"
              }
            );
          });
        }
      );
    //}

    //  this.vendorsDS = this.vendorsDS.filter(
    //   vendor => vendor.vendorCode !== vendorCode
    // );
    // this.vendors.data = this.vendorsDS;
  }

  backNavigation() {
    // if (this.vendorListshow == true) {
    //   this.getAllVendorDetails();
    // } else {
    //   this.getAllCustomerDetails();
    // }
    this.getAllCustomerDetails();
    this.showDetail = false;
  }

  applyFilter(filterValue: string) {
    if (this.vendorListshow == true) {
      this.vendors.filter = filterValue.trim().toLowerCase();
      if (this.vendors.paginator) {
        this.vendors.paginator.firstPage();
      }
    } else {
      this.customers.filter = filterValue.trim().toLowerCase();
      if (this.customers.paginator) {
        this.customers.paginator.firstPage();
      }
    }
    //this.vendors.filter = filterValue.trim().toLowerCase();
    //if (this.vendors.paginator) {
    //   this.vendors.paginator.firstPage();
    //  }
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }
}
