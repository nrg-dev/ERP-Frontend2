import { Component, OnInit, ViewChildren, ViewChild, QueryList, ElementRef, Inject } from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
//import { StockService } from '../stock.service';
//import { Stock } from 'src/app/_models/stock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-pettycashadd',
  templateUrl: './pettycashadd.component.html',
  styleUrls: ['./pettycashadd.component.css']
})
export class PettycashaddComponent implements OnInit {
  model: any = {};
  user: User;
  //stock:Stock;
  empList: any = {};
  salesList: any = {};

  productList: any = {};
  categoryList: any = {};
  empNameList: any = {};
  customerList: any = {};
  dateList: any ={};

  dialogConfig = new MatDialogConfig();
  isDtInitialized: boolean = false;

  public empDetailsDiv = false;
  public salesDetailsDiv = false;
  public addSalesDiv = false;

  firstColumns: string[] = ['EmployeeName', 'Code', 'Rank', 'BasicSalary', 'OverTime', 'Bonus', 'Total'];
  secondColumns: string[] = ['Date', 'CustomerName', 'Invoice', 'SubTotal', 'DeliveryFee', 'Total'];
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
  ) {
    const empReportdata = require("../../EmpReportTable.json");
    this.empList = empReportdata;
    this.dataSource1 = new MatTableDataSource(this.empList);
    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];


    const salesdata = require("../../salesdata.json");
    this.salesList=salesdata;
    this.dataSource2 = new MatTableDataSource(this.salesList);
    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1]; 
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator.toArray()[0];
    this.dataSource1.sort = this.sort.toArray()[0];

    this.dataSource2.paginator = this.paginator.toArray()[1];
    this.dataSource2.sort = this.sort.toArray()[1];
  }

  ngOnInit() {
    this.empDetailsDiv = false;
    this.salesDetailsDiv = false;
    this.addSalesDiv = false;
    this.empNameList = ["Josni", "Adam", "Nisho", "Alex", "Abraham"].sort((a, b) => b < a ? 1 : -1);
    this.customerList = ["Josni", "Jeff", "Nisho", "Alex", "Roch"].sort((a, b) => b < a ? 1 : -1);
    this.productList = ['Mobile', 'Computer', 'Cloths', 'TV'];
    this.categoryList = ['Electronic', 'Manufactorning', 'Institue', 'Mining'];
   this.dateList = ['oct 2019','nov 2019','dec 2019','Jan 2020','Feb 2020','Mar 2020','Apr 2020']; 
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  empDetails(empcode: string) {
    this.empDetailsDiv = true;
    for (let i = 0; i < this.empList.length; i++) {
      if (this.empList[i].empcode == empcode) {
        this.model.empcode = this.empList[i].empcode;
        this.model.employeeName = this.empList[i].employeeName;
        this.model.rank = this.empList[i].rank;
        this.model.monthName = this.empList[i].join;
        this.model.workingDays = this.empList[i].workingDays;
        this.model.absentDays = this.empList[i].absentDays;
        this.model.lateDays = this.empList[i].lateDays;
        this.model.earlyLeaveDays = this.empList[i].earlyLeaveDays;
        this.model.overTime = this.empList[i].overTime;
        this.model.monthlySalary = this.empList[i].monthlySalary;
        this.model.commission = this.empList[i].commission;
        this.model.absentDeduction = this.empList[i].absentDeduction;
        this.model.overtimeSalary = this.empList[i].overtimeSalary;
        this.model.totalAmount = this.empList[i].totalAmount;
      }
    }
  }

  applySalesFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  salesDetails(invoiceNumber: string){
    this.salesDetailsDiv = true;
    this.addSalesDiv = true;
    for(let j=0; j<this.salesList.length; j++){
      if(this.salesList[j].invoiceNumber == invoiceNumber){
        this.model.invoiceNumber = this.salesList[j].invoiceNumber;
        this.model.customerName = this.salesList[j].customerName;
        this.model.custcode = this.salesList[j].custcode;
        this.model.addedDate = this.salesList[j].addedDate;
        this.model.category = this.salesList[j].category;
        this.model.deliveryCost = this.salesList[j].deliveryCost;
        this.model.totalAmount = this.salesList[j].totalAmount;
      }
    }
  }
}
