import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { VendorDetail } from "./vendor-and-customer-detail.model";
import { VendorDetailMock } from "../../../../config/mock/vendor-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";
import { Utils } from "src/app/utilities/utilities";

@Component({
  selector: "app-vendor-and-customer-detail",
  templateUrl: "./vendor-and-customer-detail.component.html",
  styleUrls: ["./vendor-and-customer-detail.component.scss"]
})
export class VendorAndCustomerDetailComponent implements OnInit {
  @Input() vendorCode: number;
  @Input() componentType: string;
  @Output() backNavigation = new EventEmitter<null>();

  vendor: VendorDetail;
  fieldLabels: string[];
  isEditMode: boolean;
  isAddNew: boolean;
  isAddNewCustomer:boolean;

  constructor(private ts: TranslateService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.isAddNew) {
        this.vendor = { ...VendorDetailMock };
        this.fieldLabels = Object.keys(this.vendor);
        this.vendor = Utils.resetFields(this.vendor);
      } else {
        this.vendor = { ...VendorDetailMock };
        this.fieldLabels = Object.keys(this.vendor);
      }
    }, 50);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  backToVendorsList() {
    this.backNavigation.emit();
  }

  deleteVendor() {
    this.backNavigation.emit();
  }
}
