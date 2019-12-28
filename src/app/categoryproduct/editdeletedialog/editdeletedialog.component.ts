import { Component, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from "@angular/material";
import { Inject } from '@angular/core'

@Component({
  selector: 'app-editdeletedialog',
  templateUrl: './editdeletedialog.component.html',
  styleUrls: ['./editdeletedialog.component.css']
})
export class EditdeletedialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditdeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

          console.log('data', this.data);

  }

  ngOnInit() {
  }

}
