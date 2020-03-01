import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { VendorDetail } from "./vendor-detail.model";
import { VendorDetailMock } from "./../../../../config/mock/vendor-detail.mock";
import { TranslateService } from "src/app/core/services/translate/translate.service";

@Component({
  selector: "app-vendor-detail",
  templateUrl: "./vendor-detail.component.html",
  styleUrls: ["./vendor-detail.component.scss"]
})
export class VendorDetailComponent implements OnInit {
  @Input() vendorCode: number;
  @Output() backNavigation = new EventEmitter<null>();

  vendor: VendorDetail;
  fieldLabels: string[];
  isEditMode: boolean = false;
  isAddNew: boolean = false;

  constructor(private ts: TranslateService) {}

  ngOnInit() {
    this.vendor = { ...VendorDetailMock };
    this.fieldLabels = Object.keys(this.vendor);
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
