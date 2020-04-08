import { Component, OnInit, ViewChild ,ElementRef,Inject} from '@angular/core';
import { MatExpansionPanel, MatSnackBar, Sort } from "@angular/material";
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss', './purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent implements OnInit {
  
  invoiceList: any;
  constructor(
    private purchaseservice: PurchaseService,
    private snackBar: MatSnackBar
  ) { 
       
  }
  

  ngOnInit() { 
      this.getInvoiceLists();
  }

  getInvoiceLists() {
    this.purchaseservice.load().subscribe(res => { 
      this.invoiceList = res;
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

  generatePdf(data: any){
    if (data === null) {
      setTimeout(() => {
        this.snackBar.open("PDF data is empty", "dismss", {
          panelClass: ["error"],
          verticalPosition: 'top'      
        });
      });
    } else {  
      const width = 620;
      const height = 370;
      var left = (screen.width/2)-(width/2);
      var top = (screen.height/2)-(height/2);
      const win = window.open("","", 'toolbar=0, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);

      //const win = window.open("","", 'width='+width+', height='+height+', top='+top+', left='+left);
      let html = '';

      html += '<html>';
      html += '<body style="margin:0!important">';
      html += '<embed width="100%" height="100%" src="data:application/pdf;base64,'+data+'" type="application/pdf" />';
      html += '</body>';
      html += '</html>';

      setTimeout(() => {
        win.document.write(html);
      }, 0);
    }
  }

}
