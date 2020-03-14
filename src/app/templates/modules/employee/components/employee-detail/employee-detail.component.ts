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
import { EmployeeDetailMock } from "./../../../../../config/mock/employee-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { EmployeeService } from "../../services/employee.service";
import { Utils } from "./../../../../../utilities/utilities";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employeeCode: string;
  @Input() isAddNew: boolean = false;
  @Output() cancelAddNewEmployee = new EventEmitter<number>();
  @Output() navigateBack = new EventEmitter<null>();
  @Output() deleteEmployee = new EventEmitter<string>();

  employee: EmployeeDetail;
  fieldLabels: string[];
  isEditMode: boolean = false;
  model: any = {};

  constructor(
    private ts: TranslateService,
    private employeeService: EmployeeService,
    private printDialogService: PrintDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.employeeCode) {
      this.getEmployee();
    }
    if (changes.isAddNew && changes.isAddNew.currentValue) {
      this.employee = Utils.resetFields(this.employee);
    } else {
      // TODO: REMOVE THE ELSE
      this.ngOnInit();
    }
  }

  ngOnInit() {
    // this.employee = { ...EmployeeDetailMock };
  }

  getEmployee() {
    this.employeeService.get(this.employeeCode).subscribe(
      (data: any) => {
        this.employee = data[0];
        this.fieldLabels = Object.keys(this.employee);
        if (this.isAddNew) {
          this.isEditMode = false;
        }
      },
      err => console.log(err)
    );
  }

  saveEmployee() {
    this.employeeService.save(this.employee).subscribe(
      success => {
        this.backToEmployeesList();

        this.snackBar.open("Employee updated successfully", "", {
          panelClass: ["success"],
          verticalPosition: "top"
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.isAddNew = false;
  }

  deleteEmployeeEmitter() {
    this.deleteEmployee.emit(this.employeeCode);
    this.backToEmployeesList();
  }

  cancelAddNew() {
    this.cancelAddNewEmployee.emit(0);
  }

  backToEmployeesList() {
    this.navigateBack.emit();
  }

  printPage(data) {
    this.printDialogService.openDialog(data);
  }
}
