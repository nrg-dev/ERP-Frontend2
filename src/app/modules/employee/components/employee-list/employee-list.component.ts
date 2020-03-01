import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";

import { MatTableDataSource, MatPaginator } from "@angular/material";
import { EmployeesMock } from "src/app/config/mock/employees.mock";
import { Employee } from "./employee-list.model";
import { EmployeeDetailComponent } from "../employee-detail/employee-detail.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit, OnChanges {
  @Input() tabChange: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // To get the child component reference after *ngIf
  private employeeDetail: EmployeeDetailComponent;
  @ViewChild(EmployeeDetailComponent, { static: false }) set content(
    content: EmployeeDetailComponent
  ) {
    setTimeout(() => {
      this.employeeDetail = content;
    }, 0);
  }

  showDetail: boolean = false;
  employeesDS: Employee[];
  employees: MatTableDataSource<Employee>;
  employee;
  displayedColumns: string[] = [
    "code",
    "name",
    "rank",
    "contactNumber",
    "action"
  ];
  constructor() {}

  ngOnInit() {
    this.employeesDS = EmployeesMock;
    this.employees = new MatTableDataSource(this.employeesDS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabChange) {
      this.showDetail = false;
      if (this.employees) {
        this.employees.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit(): void {
    this.employees.paginator = this.paginator;
  }

  toggleEmployeeDetailView(employeeCode?, edit?) {
    this.showDetail = !this.showDetail;
    this.employee = undefined;
    if (employeeCode) {
      const chosenEmployee = this.employeesDS.filter(
        employee => employee.employeecode === employeeCode
      );
      if (chosenEmployee.length && chosenEmployee.length > 0) {
        this.employee = chosenEmployee[0];
      }

      setTimeout(() => {
        if (edit && this.employeeDetail) {
          this.employeeDetail.isEditMode = true;
        }
      }, 50);
    }
  }

  deleteEmployee(employeeCode: string) {
    this.employeesDS = this.employeesDS.filter(
      employee => employee.employeecode !== employeeCode
    );
    this.employees.data = this.employeesDS;
  }
}
