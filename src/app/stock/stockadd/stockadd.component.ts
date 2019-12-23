import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { DataTablesModule } from 'angular-datatables';
import * as jQuery from 'jquery';
 

@Component({
  selector: 'app-stockadd',
  templateUrl: './stockadd.component.html',
  styleUrls: ['./stockadd.component.css']
})
export class StockaddComponent implements OnInit {

  dataList : any = [];
  constructor() { }

  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    
    for (let i = 0; i < 50; i++) {
      console.log ("Block statement execution no." + i);
      
     
      this.dataList[i] = 
      { 
      Company:'CUST001',
      Contact :' WIROTO CRAFT',
      Country : '+62 878-2277-7490',
      state : '+62 675-777-8998',
      Phone : 'No 2, Main Street,Jakarta,Indonesia',
      email :  'Indonesia',
      address : 'Jakarta',
      name : 'nrgadmin@neotural.com',
      status : 'active',
      }
    }


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }
  }

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


public openAsPDF(){
  alert("open pdf");
  
}
  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });
    //doc.open('tableToPdf.pdf');
    doc.text(20, 20, 'Employee Information');
    
    let left = 15;
    let top = 8;
    const imgWidth = 100;
    const imgHeight = 100;
    var img = new Image();
    var imgData = './assets/images/nrg_logo.png'
    //doc.addImage('./assets/images/nrg_logo.png', 'PNG', left, top, imgWidth, imgHeight);
    //doc.addImage(imgData, 'PNG', 15, 40, 180, 180);

   // doc.output('dataurlnewwindow'); //opens pdf in new tab
//doc.setFontSize(26);
    doc.save('tableToPdf.pdf');
  }
}
