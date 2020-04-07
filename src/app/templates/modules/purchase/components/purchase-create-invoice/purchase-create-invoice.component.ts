import { Component, Inject, OnChanges, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-purchase-create-invoice",
  templateUrl: "./purchase-create-invoice.component.html",
  styleUrls: ["./purchase-create-invoice.component.scss"],
})
export class PurchaseCreateInvoiceComponent implements OnInit {
  invoiceList = [];

  constructor(
    public dialogRef: MatDialogRef<PurchaseCreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data
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
}
