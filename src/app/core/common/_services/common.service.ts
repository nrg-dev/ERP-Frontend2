import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";

@Injectable()
export class CommonService { 
    currentDate = new Date();
    todayDate: any;   
    constructor(public snackBar: MatSnackBar) {
        this.todayDate = formatDate(this.currentDate, 'dd/MMM/yyy', 'en-US');
    }

    getTodayDate() {
        return this.todayDate;
    }

    getSuccessErrorMsg(res: any, msg: string) {
      if (res === null) {
        setTimeout(() => {
          this.snackBar.open(msg, "dismss", {
            panelClass: ["success"],
            verticalPosition: 'top'      
          });
        });
      } else if (res === 500) {
        setTimeout(() => {
          this.snackBar.open("Internal server error", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      } else {
        setTimeout(() => {
          this.snackBar.open("Bad request error", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
      }
       error => {
        setTimeout(() => {
          this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
            panelClass: ["error"],
            verticalPosition: 'top'      
          });
        });
  }
  }
}
