import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource, MatPaginator } from "@angular/material";
import { EmployeesMock } from "src/app/config/mock/employees.mock";
import { Employee } from "./employee-list.model";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  showDetail: boolean = false;

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
    this.employees = new MatTableDataSource(EmployeesMock);
  }

  ngAfterViewInit(): void {
    this.employees.paginator = this.paginator;
  }

  toggleEmployeeDetailView(employeeCode) {
    this.showDetail = !this.showDetail;
    this.employee = undefined;
    if (employeeCode) {
      this.employee = EmployeesMock.filter(
        employee => employee.employeecode === employeeCode
      );
    }
  }
}
