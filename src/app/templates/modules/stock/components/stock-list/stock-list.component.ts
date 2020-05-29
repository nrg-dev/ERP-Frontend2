import {
  Component,
  OnInit,
  ViewChild,
  Input,
} from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { StockService } from "../../services/stock.service";
import { AlertService } from "src/app/core/common/_services/index";
import { PrintDialogService } from "src/app/core/services/print-dialog/print-dialog.service";
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { CommonService } from "../../../../../core/common/_services/common.service";
import {formatDate } from '@angular/common';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.scss"]
})
export class StockListComponent implements OnInit {
	constructor(private router: Router,
		private dialog: MatDialog,
		private stockService: StockService,
		private snackBar: MatSnackBar
	) { }

	stockList:any = {};
	model:any = {};
	public stockTable = false;

	ngOnInit() {
		this.loadStock();
	}

	loadStock(){
		let status = "Ready for Sales";
		this.stockService.load(status)
			.subscribe(
			data => {
				this.stockList = data;
				if(this.stockList.length == 0){
					this.stockTable = false;
				}else{
					this.stockTable = true;
				}
			},
			error => {
				setTimeout(() => {
					this.snackBar.open("Network error: server is temporarily unavailable", "dismss", {
						panelClass: ["error"],
						verticalPosition: 'top'      
					});
				});   
			}
		);
	}
}
