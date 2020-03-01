import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";

import { MatTableDataSource, MatPaginator } from "@angular/material";
import { CustomersMock } from "src/app/config/mock/customers.mock";

import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
import { Customer } from "./customer-list.model";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"]
})
export class CustomerListComponent implements OnInit, OnChanges {
  @Input() tabChange: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private customerDetail: CustomerDetailComponent;
  @ViewChild(CustomerDetailComponent, { static: false }) set content(
    content: CustomerDetailComponent
  ) {
    setTimeout(() => {
      this.customerDetail = content;
    }, 0);
  }

  showDetail: boolean = false;
  customersDS: Customer[];
  customers: MatTableDataSource<Customer>;
  customer;
  displayedColumns: string[] = ["code", "name", "contactNumber", "action"];
  constructor() {}

  ngOnInit() {
    this.customersDS = CustomersMock;
    this.customers = new MatTableDataSource(this.customersDS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabChange) {
      this.showDetail = false;
      if (this.customers) {
        this.customers.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit(): void {
    this.customers.paginator = this.paginator;
  }

  toggleCustomerDetailView(customerCode?, edit?) {
    this.showDetail = !this.showDetail;
    this.customer = undefined;
    if (customerCode) {
      const chosenEmployee = this.customersDS.filter(
        customer => customer.customercode === customerCode
      );
      if (chosenEmployee.length && chosenEmployee.length > 0) {
        this.customer = chosenEmployee[0];
      }

      setTimeout(() => {
        if (edit && this.customerDetail) {
          this.customerDetail.isEditMode = true;
        }
      }, 50);
    }
  }

  deleteEmployee(customerCode: number) {
    this.customersDS = this.customersDS.filter(
      customer => customer.customercode !== customerCode
    );
    this.customers.data = this.customersDS;
  }
}
