import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {

  tempid=null;
  public leftdetails=false;
  public discountdetails=false;
  public editdeletediv=false;

  successdialog = 'none';

  categorylist: any =[
  {
    number:'01',
    allproduct:'All Product',
  },
  {
    number:'02',
    discount:'Discount',
  },
  {
    number:'03',
    freegifts:'Free Gifts',
  },
  {
    number:'04',
    fiber:'Fiber',
  },
  {
    number:'05',
    pigmen:'Pigmen',
  },
  {
    number:'06',
    brush:'Brush',
  },
  {
    number:'07',
    sandpaper:'Sandpaper',
  },
  {
    number:'08',
    hardware:'Hardware',
  },
  {
    number:'09',
    accesories:'Accesories'
  }
];


dataDiscountList : any = [];

  constructor() { }

  ngOnInit() {

    for (let i = 0; i <5; i++) {
      console.log ("Block statement execution no." + i);
      
     
      this.dataDiscountList[i] = 
      { 
      ProductName:'Apple Watch',
      ProductCode :' PRO001 ',
      discount : '10%',
      discounttime : '23-sep-2019',
      qty : '40',
      prize : 'p. 30.000/kg',

      }
    }
    
    this.leftdetails=true;
  }
  
categorydetails(number: string){
  if(this.tempid!==null){
    document.getElementById(this.tempid).style.backgroundColor='#272E34';
  }
  this.tempid=number;
  document.getElementById(this.tempid).style.backgroundColor='#5B6065';
  this.leftdetails=true;

  if(number=='01'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='02'){
    this.discountdetails=true;
    this.editdeletediv=false;
  }
  if(number=='03'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='04'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  if(number=='05'){
    this.leftdetails=true;
    this.discountdetails=false;
    this.editdeletediv=false;
  }
  }
  editdelete(){
    this.editdeletediv=true;
    this.discountdetails=false;
  }
  addpromotion(){
    this.successdialog = 'block';
  }

  }
