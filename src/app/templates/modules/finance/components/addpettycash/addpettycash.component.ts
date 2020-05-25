import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { FinanceService } from "../../services/finance.service";
import { Component, OnInit, Inject,Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

// categoryeditdelete end
export interface UsersData {
  id: number;
  unitname: string;
  unitsymbol: string;
  quantityname: string;
  quantitysymbol: string;
  dimensionsymbol: string;
}


@Component({
  selector: 'app-addpettycash',
  templateUrl: './addpettycash.component.html',
  styleUrls: ['./addpettycash.component.scss']
})
export class AddPettycashComponent implements OnInit {
  model: any = {};
  local_data:any;
  showbackbtn:boolean;
  btnsave:string;//="Save";
  typeList:any = {};

  constructor(
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    public dialogRef: MatDialogRef<AddPettycashComponent>,
    private financeService: FinanceService,
    private snackBar: MatSnackBar
  ) { 
    console.log(data);
    this.local_data = {...data};
    this.model.id=this.local_data.id;
    this.model.unitname=this.local_data.unitname;
    this.model.unitsymbol=this.local_data.unitsymbol;
    this.model.quantityname=this.local_data.quantityname;
    this.model.quantitysymbol=this.local_data.quantitysymbol;
    this.model.dimensionsymbol=this.local_data.dimensionsymbol;    
    if(this.local_data.id!=null){
      this.showbackbtn=false;
      this.btnsave="Update";
    }else{
      this.showbackbtn=true;
      this.btnsave="Save";
     // this.showbackbtn=true;
    }
  }

  ngOnInit() {
    this.typeList = ['Cash','Credit'];
  }

  addPetty(btnsave:string) {
    if(btnsave == "Save"){
      this.savePetty();
    }else if(btnsave == "Update"){
      //this.updateUnit();
    }
  }

  addPettyClose(){
    this.dialogRef.close();
  }
  
  savePetty(){
    console.log("savePettyCash");
    console.log("description-->"+this.model.description);
    console.log("addedDate-->"+this.model.addedDate);
    console.log("type-->"+this.model.type);
    console.log("toPerson-->"+this.model.toPerson);
    console.log("totalAmount-->"+this.model.totalAmount);
    this.financeService.save(this.model)
      .subscribe(
      data => {
          setTimeout(() => {
            this.snackBar.open("Petty Cash Saved Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
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

  /* updatePetty(){
    console.log("Update PettyCash");
    console.log("description-->"+this.model.description);
    console.log("addedDate-->"+this.model.addedDate);
    console.log("type-->"+this.model.type);
    console.log("fromPerson-->"+this.model.fromPerson);
    console.log("toPerson-->"+this.model.toPerson);
    console.log("totalAmount-->"+this.model.totalAmount);
    this.financeService.update(this.model)
      .subscribe(
        data => {
          setTimeout(() => {
            this.snackBar.open("Petty Cash Updated Successfully", "", {
              panelClass: ["success"],
              verticalPosition: 'top'      
            });
          });
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
  } */

}
