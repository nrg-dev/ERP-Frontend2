import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class PrintDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
