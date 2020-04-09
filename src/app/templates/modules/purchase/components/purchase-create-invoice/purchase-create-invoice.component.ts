import { Component, Inject, OnChanges, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PurchaseService } from "../../services/purchase.service";

@Component({
  selector: "app-purchase-create-invoice",
  templateUrl: "./purchase-create-invoice.component.html",
  styleUrls: ["./purchase-create-invoice.component.scss"],
})
export class PurchaseCreateInvoiceComponent implements OnInit {
  invoiceList = [];

  constructor(
    public dialogRef: MatDialogRef<PurchaseCreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private purchaseService:PurchaseService
  ) {}

  ngOnInit() {
    this.invoiceList = this.data.invoiceItems;
  }

  createPurchaseInvoiceClose(): void {
    this.dialogRef.close();
  }

  removeProduct(product, event): void {
    if (!event.currentTarget.checked) {
      this.invoiceList = this.invoiceList.filter(
        (invoice) => invoice.id !== product.id
      );
      return;
    }

    this.invoiceList = this.invoiceList.concat(product);
  }

  getSubTotal(): number {
    return this.invoiceList.reduce((accu, item) => item.subtotal + accu, 0);
  }

  getTotal(): number {
    return this.getSubTotal() + this.data.delivery;
  }

  createInvoice() {

    const invoice = {
      "createddate": new Date().toJSON().slice(0, 10).split('-').reverse().join('/'),
      "ordernumbers" : ["PO1000"],
      "subtotal": this.getSubTotal(),
      "deliverycharge": this.data.delivery,
      "totalprice": this.getTotal()
    }

    this.purchaseService.createInvoice(invoice).subscribe(result => {
      console.log(result);
    });
    
  }
}
