import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sales-create-return',
  templateUrl: './sales-create-return.component.html',
  styleUrls: ['./sales-create-return.component.scss']
})
export class SalesCreateReturnComponent implements OnInit {

  btnsave:string = "Create";
  paymentType:string;
  returnType:string;
  quantity:number;


  constructor(    public dialogRef: MatDialogRef<SalesCreateReturnComponent>,
    ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
  addReturn() {
    alert("add Return");
    console.log("addReturn");
  }

}
