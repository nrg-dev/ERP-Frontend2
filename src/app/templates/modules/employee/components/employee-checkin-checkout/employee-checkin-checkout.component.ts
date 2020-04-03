import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { CommonService } from "../../../../../core/common/_services/common.service";
import {formatDate } from '@angular/common';

@Component({
  selector: "app-employee-checkin-checkout",
  templateUrl: "./employee-checkin-checkout.component.html",
  styleUrls: ["./employee-checkin-checkout.component.scss"]
})
export class EmployeeChecinCheckoutComponent implements OnInit {
  model: any = {};
  @Output() closeCheckinCheckoutPopup: EventEmitter<any> = new EventEmitter<any>();
  @Input() absenceItem: any;
  @Input() getAbsentDetail: any;
  isSaveAbsent: boolean = false;
  todayTime: any;

  constructor(private employeeService: EmployeeService,
              public commonService: CommonService) {
                this.todayTime = formatDate(this.commonService.getCurrentTime(), 'HH:mm', 'en-US', '+0530');
              }

  ngOnInit() { 
   setTimeout(() => { 
    this.model.reason = this.getAbsentDetail !== undefined ? this.getAbsentDetail.reason:'';
  }, 1300);
  }

  checkinCheckoutPopupClose() { 
    this.closeCheckinCheckoutPopup.emit(false);
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }
  saveCheckinCheckedout(type: string) { console.log('details', this.getAbsentDetail)
    this.model.employeecode = this.absenceItem.employeecode;
    this.model.type = this.getAbsentDetail === undefined ? 'save':'update';
    this.model.date = this.commonService.getTodayDate();
    let msg = '';
    if (type === 'checkedin') {
      this.model.checkinreason = this.model.reason;
      this.model.checkintime = this.todayTime;
      this.model.checkoutreason = null;
      this.model.checkouttime = null;
    } else {
      this.model.checkoutreason = this.model.reason;
      this.model.checkouttime = this.todayTime;
      this.model.checkinreason = this.getAbsentDetail.checkinreason;
      this.model.checkintime = this.getAbsentDetail.checkintime; 
      msg = 'Checkedout updated successfully';
    }
    
    this.model.absent = null;
    this.model.reason = null;
    if (this.model.reason !== '') {
          this.employeeService.saveEmployeeAbsent(this.model).subscribe((res: any) => {
          this.commonService.getSuccessErrorMsg(res,msg);
          if (res === null) {
            this.checkinCheckoutPopupClose();
          }
        });
    }
  }
}
