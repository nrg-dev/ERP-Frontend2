import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { Utils } from "src/app/utilities/utilities";
import { VendorService } from "../../services/vendor.service";
import { CustomerService } from "../../services/customer.service";
import { Vendor, Customer } from "src/app/_models";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-vendor-and-customer-detail",
  templateUrl: "./vendor-and-customer-detail.component.html",
  styleUrls: ["./vendor-and-customer-detail.component.scss"]
})
export class VendorAndCustomerDetailComponent implements OnInit {
  @Input() code: number;
  @Input() componentType: string;
  @Input() isEditMode: boolean;
  @Output() backNavigation = new EventEmitter<null>();

  //  vendor: VendorDetail;
  vendor: any = new Vendor();
  customer: any = new Customer();

  fieldLabels: string[];
  trackByIndex:number;
  isAddNew: boolean;

  model: any = {};
  countryList: any;

  constructor(
    private ts: TranslateService,
    private vendorService: VendorService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    this.countryList = require("../../../../../country.json");
  }

  ngOnInit() {
    console.log(this.vendor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.code && changes.code.currentValue) {
      if (this.componentType === "Customer") {
        this.customerService.get(this.code).subscribe(
          data => {
            this.model = data[0];
            this.fieldLabels = Object.keys(this.model);
          },
          err => console.log(err)
        );
      } else {
        this.vendorService.get(this.code).subscribe(
          data => {
            this.model = data[0];
            this.fieldLabels = Object.keys(this.model);
          },
          err => console.log(err)
        );
      }
    } else {
      this.isAddNew = true;
      if (this.componentType === "Customer") {
        this.fieldLabels = Object.keys(new Customer());
      } else {
        this.fieldLabels = Object.keys(new Vendor());
      }
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  backToVendorsList() {
    this.backNavigation.emit();
  }

  deleteVendor() {
    this.backNavigation.emit();
  }

  save() {
    if (this.componentType === "Customer") {
      this.saveCustomer();
    } else {
      this.saveVendor();
    }
  }

  saveCustomer() {
    this.customerService.save(this.model).subscribe(
      data => {
        this.customer = data;
        console.log("Response -->" + this.customer.status);
        if (this.customer.status == "success") {
          setTimeout(() => {
            this.snackBar.open("Customer created Successfully", "", {
              panelClass: ["success"],
              verticalPosition: "top"
            });
          });
        }
        if (this.customer.status == "failure") {
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

  saveVendor() {
    this.vendorService.save(this.model).subscribe(
      data => {
        this.vendor = data;
        console.log("Response -->" + this.vendor.status);
        if (this.vendor.status == "success") {
          setTimeout(() => {
            this.snackBar.open("Sales Order created Successfully", "dismss", {
              panelClass: ["success"],
              verticalPosition: "top"
            });
          });
        }
        if (this.vendor.status == "failure") {
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
}
