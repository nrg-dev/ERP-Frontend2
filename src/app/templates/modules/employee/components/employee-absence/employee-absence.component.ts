import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { EmployeeService } from "../../services/employee.service";
import { CommonService } from "../../../../../core/common/_services/common.service";

@Component({
  selector: "app-employee-absence",
  templateUrl: "./employee-absence.component.html",
  styleUrls: ["./employee-absence.component.scss"]
})
export class EmployeeAbsenceComponent implements OnInit {
  displayedColumns: string[] = ["EmployeeName", "Empcode"];
  dataSource: MatTableDataSource<any>;
  empDetailsList: any;
  employeeList: any = {};
  model: any = {};
  searchText:string;

  // TODO : Move the models out
  employees: { name: string; code: number }[];
  absentCardDetails: {
    date: string;
    checkIn: string;
    checkInReason: string;
    checkOut: string;
    checkoutReason: string;
  }[];
  previewDetails: {
    name: string;
    code: number;
    date: string;
    time: string;
    status: string;
    reason: string;
  };
  @Output() closeAbsencePopup: EventEmitter<any> = new EventEmitter<any>();
  @Input() absenceItem: any;

  constructor(private employeeService: EmployeeService,
              public commonService: CommonService) {}

  ngOnInit() {
   this.model.report = '';
  }

  absencePopupClose() { 
    this.closeAbsencePopup.emit(false);
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  saveAbsence() {
    let msg = '';
    this.model.employeecode = this.absenceItem.employeecode;
    this.model.type = 'save';
    this.model.date = this.commonService.getTodayDate();
    msg = 'Absence has been added successfully';
    this.employeeService.saveEmployeeAbsent(this.model).subscribe((res: any) => {
      this.commonService.getSuccessErrorMsg(res,msg);
      if (res === null) {
        this.absencePopupClose();
      }
    }); 
  }
}
