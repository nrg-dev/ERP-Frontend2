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
  selector: "app-profitandloss",
  templateUrl: "./profitandloss.component.html",
  styleUrls: [ "./profitandloss.component.scss" ],
})
export class ProfitandLossComponent implements OnInit, OnDestroy {
  model:any = {};
  profitandLossList: any;
  dialogConfig = new MatDialogConfig();
  public profitTable = false;
  loadinggif:boolean = false;

  constructor(
    private financeService: FinanceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.model.totalDebit = 0;
    this.model.totalCredit = 0;

    this.getProfitandLossList();
  }

  ngOnDestroy() {
    (<HTMLElement>(
      document.querySelector(".mat-drawer-content")
    )).style.overflow = "auto";
  }
  
  getProfitandLossList() {
    this.loadinggif=true;
    this.profitTable = false;
    this.financeService.getProfitLoss().subscribe(
      (res) => {
        this.profitandLossList = res;
        this.loadinggif=false;
        if(this.profitandLossList.length == 0){
          this.profitTable = false;
        }else{
          this.profitTable = true;
          for(let i=0; i<this.profitandLossList.length; i++){
            this.model.totalDebit += this.profitandLossList[i].debit;
            this.model.totalCredit += this.profitandLossList[i].credit;
          }
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
