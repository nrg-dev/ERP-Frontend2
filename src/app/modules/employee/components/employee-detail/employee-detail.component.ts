import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from "@angular/core";
import { EmployeeDetail } from "./employee-detail.model";
import { EmployeeDetailMock } from "./../../../../config/mock/employee-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employeeCode: string;
  @Input() isAddNew: boolean = false;
  @Output() cancelAddNewEmployee = new EventEmitter<number>();

  employee: EmployeeDetail;
  fieldLabels: string[];
  isEditMode: boolean = false;

  constructor(private ts: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isAddNew && changes.isAddNew.currentValue) {
      this.resetFields();
    } else {
      // TODO: REMOVE THE ELSE
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.employee = { ...EmployeeDetailMock };
    this.fieldLabels = Object.keys(this.employee);

    if (this.isAddNew) {
      this.isEditMode = false;
    }
  }

  navigateBack() {
    this.toggleEditMode();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.isAddNew = false;
  }

  deleteEmployee() {
    this.toggleEditMode();
  }

  cancelAddNew() {
    this.cancelAddNewEmployee.emit(0);
  }

  resetFields() {
    let employee = this.employee;
    for (var key in employee) {
      if (employee.hasOwnProperty(key)) {
        employee[key] = "";
      }
    }
  }
}
