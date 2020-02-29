import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "../employee-list/employee-list.model";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  @Output() backNavigation = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  navigateBack() {
    this.backNavigation.emit("");
  }
}
