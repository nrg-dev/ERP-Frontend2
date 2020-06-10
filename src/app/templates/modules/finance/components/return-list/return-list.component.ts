import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FinanceService } from "../../services/finance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";

@Component({
  selector: "app-returnlist",
  templateUrl: "./return-list.component.html",
  styleUrls: [ "./return-list.component.scss" ],
})
export class ReturnListComponent implements OnInit, OnDestroy {
  returnList: any;
  dialogConfig = new MatDialogConfig();
  public returnTable = false;

  constructor(
    private financeService: FinanceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getReturnList();
  }

  ngOnDestroy() {
    (<HTMLElement>(
      document.querySelector(".mat-drawer-content")
    )).style.overflow = "auto";
  }
  
  getReturnList() {
    this.financeService.getReturnList().subscribe(
      (res) => {
        this.returnList = res;
        if(this.returnList.length == 0){
          this.returnTable = false;
        }else{
          this.returnTable = true;
        }
      },
      (error) => {
        setTimeout(() => {
          this.snackBar.open(
            "Network error: server is temporarily unavailable",
            "dismss",
            {
              panelClass: ["error"],
              verticalPosition: "top",
            }
          );
        });
      }
    );
  }

}
