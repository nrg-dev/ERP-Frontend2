import { Component, OnInit, Input } from "@angular/core";

export interface widgetData {
  bgColor: string;
  title: string;
  icon: string;
  value: string | number;
  description: string;
}

@Component({
  selector: "app-dashboard-widget",
  templateUrl: "./dashboard-widget.component.html",
  styleUrls: ["./dashboard-widget.component.scss"]
})
export class DashboardWidgetComponent implements OnInit {
  @Input() param: widgetData;
  constructor() {}

  ngOnInit() {}
}
