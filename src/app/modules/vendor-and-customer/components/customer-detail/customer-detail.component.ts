import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerDetailComponent implements OnInit {
  isEditMode: boolean = false;
  @Input() customerCode: string;
  constructor() {}

  ngOnInit() {}
}
