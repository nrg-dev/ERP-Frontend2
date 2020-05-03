import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-purchase-create-return',
  templateUrl: './purchase-create-return.component.html',
  styleUrls: ['./purchase-create-return.component.scss']
})
export class PurchaseCreateReturnComponent implements OnInit {

  btnsave:string = "Create";
  paymentType:string;
  returnType:string;
  quantity:number;


  constructor(    public dialogRef: MatDialogRef<PurchaseCreateReturnComponent>,
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
