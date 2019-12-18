import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.css']
})
export class VendoraddComponent implements OnInit {
  custtempid = null;
  tempid=null;
  message=null;
  mainmessage=null;

  public vendordetails=false;
  public vendoreditdetails=false;

  public vendordetailsstart=false;
  public customerdetailsstart=false;

  public customerdetails=false;
  public customereditdetails=false;

  public vendordragAndDrop =false;
  public customerdragAndDrop =false;

  successdialog = 'none';

  model:any ={};
  user:User;

  vendorList : any = [ {
    vendorcode:'VEN001',
    vendorName :'PT NRG',
    phoneNumber : '+62 878-2277-7490',
    mobileNumber : '+62 675-777-8998',
    address : 'No 2, Main Street,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'nrgadmin@neotural.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
  },
  {vendorcode:'VEN002',
  vendorName :'CV. PURNAMA RAYA FOOD',
  phoneNumber : '+62 878-2277-7450',
  mobileNumber : '+62 675-777-8998',
  address : 'No 32, East Street,Jakarta,India',
  country :  'Indonesia',
  city : 'Jakarta',
  email : 'purnama@raya.com',
  lastedit : '17/9/2019',
  addeddate : '1/9/2019'
},
 {vendorcode:'VEN003',
  vendorName :'AGARINDO BOGATAMA, PT',
  phoneNumber : '+62 878-2233-7490',
  mobileNumber : '+62 675-777-8998',
  address : 'No 54, Kungan city,Jakarta,Indonesia',
  country :  'Indonesia',
  city : 'Jakarta',
  email : 'admin@bogatama.com',
  lastedit : '17/9/2019',
  addeddate : '1/9/2019'
},
  {vendorcode:'VEN004',
   vendorName :'Manggar Natural',
    phoneNumber : '+62 878-2277-8490',
    mobileNumber : '+62 675-777-8998',
    address : 'No 23, Near T Rasuna,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'manggar@gmail.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},
{vendorcode:'VEN005',
    vendorName :'CD Craft Bethesda - Denara',
    phoneNumber : '+62 878-2277-7590',
    mobileNumber : '+62 675-777-8998',
    address : 'No 47, East Costal road ,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'admin@denara.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},
{vendorcode:'VEN006',
    vendorName :'Golden Manyaran, PT',
    phoneNumber : '+62 878-2277-7690',
    mobileNumber : '+62 675-777-8998',
    address : 'No 2/4, South Street,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'admin@golden.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},

];
custList : any = [ 
  {
    custcode:'CUST001',
    customerName :' WIROTO CRAFT',
    phoneNumber : '+62 878-2277-7490',
    mobileNumber : '+62 675-777-8998',
    address : 'No 2, Main Street,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'nrgadmin@neotural.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
  },
  {custcode:'CUST002',
  customerName :'PT. Adi Jaya Naturindo',
  phoneNumber : '+62 878-2277-7450',
  mobileNumber : '+62 675-777-8998',
  address : 'No 32, East Street,Jakarta,India',
  country :  'Indonesia',
  city : 'Jakarta',
  email : 'purnama@raya.com',
  lastedit : '17/9/2019',
  addeddate : '1/9/2019'
},
 {custcode:'CUST003',
  customerName :'Editha Artcraft',
  phoneNumber : '+62 878-2233-7490',
  mobileNumber : '+62 675-777-8998',
  address : 'No 54, Kungan city,Jakarta,Indonesia',
  country :  'Indonesia',
  city : 'Jakarta',
  email : 'admin@bogatama.com',
  lastedit : '17/9/2019',
  addeddate : '1/9/2019'
},
  { custcode:'CUST004',
    customerName :'PONDAN PANGAN MAKMUR INDONESIA PT',
    phoneNumber : '+62 878-2277-8490',
    mobileNumber : '+62 675-777-8998',
    address : 'No 23, Near T Rasuna,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'manggar@gmail.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},
{   custcode:'CUST005',
    customerName :'Sumatra Copper and Gold',
    phoneNumber : '+62 878-2277-7590',
    mobileNumber : '+62 675-777-8998',
    address : 'No 47, East Costal road ,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'admin@denara.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},
{   custcode:'CUST006',
    customerName :'MANOHARA ASRI PT',
    phoneNumber : '+62 878-2277-7690',
    mobileNumber : '+62 675-777-8998',
    address : 'No 2/4, South Street,Jakarta,Indonesia',
    country :  'Indonesia',
    city : 'Jakarta',
    email : 'admin@golden.com',
    lastedit : '17/9/2019',
    addeddate : '1/9/2019'
},

];

countryList: any = ['India', 'Malaysia', 'Indonesia', 'Singapore'];

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.vendordetailsstart = true;
    this.customerdetailsstart = false;

    this.vendordetails = false;
    this.customerdetails = false;
    this.customereditdetails=false;
    
    this.vendoreditdetails = false;
    this.customereditdetails = false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    document.getElementById("vendorstyle").style.borderBottom='2px solid #007bff';
    document.getElementById("customerstyle").style.borderBottom='none';
    document.getElementById("vendorstyle").style.fontWeight='bold';
  }

  //Vendor details methos start
  vendorDetails(vendorcode:string){
    if(this.tempid!==null){
      document.getElementById(this.tempid).style.backgroundColor='white';
      this.tempid=null;

    }
    this.tempid=vendorcode;
    this.vendordragAndDrop=false;
    document.getElementById(this.tempid).style.backgroundColor='#DDEDF9';
    //-- VendorDetails Div Calling --
    this.vendordetailsstart = true;
    this.customerdetailsstart = false;

    this.vendordetails = true;
    this.customerdetails = false;

    this.vendoreditdetails=false;
    this.customereditdetails = false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    if(vendorcode == "VEN001"){
      this.model.vendorcode = this.vendorList[0].vendorcode;
      this.model.vendorName = this.vendorList[0].vendorName;
      this.model.phoneNumber = this.vendorList[0].phoneNumber;
      this.model.mobileNumber = this.vendorList[0].mobileNumber;
      this.model.address = this.vendorList[0].address;
      this.model.country = this.vendorList[0].country;
      this.model.city = this.vendorList[0].city;
      this.model.email = this.vendorList[0].email;
      this.model.lastedit = this.vendorList[0].lastedit;
      this.model.addeddate = this.vendorList[0].addeddate;
      this.alertService.success("");

    }else if(vendorcode == "VEN002"){
      this.model.vendorcode = this.vendorList[1].vendorcode;
      this.model.vendorName = this.vendorList[1].vendorName;
      this.model.phoneNumber = this.vendorList[1].phoneNumber;
      this.model.mobileNumber = this.vendorList[1].mobileNumber;
      this.model.country = this.vendorList[1].country;
      this.model.city = this.vendorList[1].city;
      this.model.email = this.vendorList[1].email;
      this.model.lastedit = this.vendorList[1].lastedit;
      this.model.addeddate = this.vendorList[1].addeddate;
      this.alertService.success("");
    }
    else if(vendorcode == "VEN003"){
      this.model.vendorcode = this.vendorList[2].vendorcode;
      this.model.vendorName = this.vendorList[2].vendorName;
      this.model.phoneNumber = this.vendorList[2].phoneNumber;
      this.model.mobileNumber = this.vendorList[2].mobileNumber;
      this.model.address = this.vendorList[2].address;
      this.model.country = this.vendorList[2].country;
      this.model.city = this.vendorList[2].city;
      this.model.email = this.vendorList[2].email;
      this.model.lastedit = this.vendorList[2].lastedit;
      this.model.addeddate = this.vendorList[2].addeddate;
      this.alertService.success("");
    }
    else if(vendorcode == "VEN004"){
      this.model.vendorcode = this.vendorList[3].vendorcode;
      this.model.vendorName = this.vendorList[3].vendorName;
      this.model.phoneNumber = this.vendorList[3].phoneNumber;
      this.model.mobileNumber = this.vendorList[3].mobileNumber;
      this.model.address = this.vendorList[3].address;
      this.model.country = this.vendorList[3].country;
      this.model.city = this.vendorList[3].city;
      this.model.email = this.vendorList[3].email;
      this.model.lastedit = this.vendorList[3].lastedit;
      this.model.addeddate = this.vendorList[3].addeddate;
      this.alertService.success("");
    }
    else if(vendorcode == "VEN005"){
      this.model.vendorcode = this.vendorList[4].vendorcode;
      this.model.vendorName = this.vendorList[4].vendorName;
      this.model.phoneNumber = this.vendorList[4].phoneNumber;
      this.model.mobileNumber = this.vendorList[4].mobileNumber;
      this.model.address = this.vendorList[4].address;
      this.model.country = this.vendorList[4].country;
      this.model.city = this.vendorList[4].city;
      this.model.email = this.vendorList[4].email;
      this.model.lastedit = this.vendorList[4].lastedit;
      this.model.addeddate = this.vendorList[4].addeddate;
      this.alertService.success("");
    }

    else if(vendorcode == "VEN006"){
      this.model.vendorcode = this.vendorList[5].vendorcode;
      this.model.vendorName = this.vendorList[5].vendorName;
      this.model.phoneNumber = this.vendorList[5].phoneNumber;
      this.model.mobileNumber = this.vendorList[5].mobileNumber;
      this.model.address = this.vendorList[5].address;
      this.model.country = this.vendorList[5].country;
      this.model.city = this.vendorList[5].city;
      this.model.email = this.vendorList[5].email;
      this.model.lastedit = this.vendorList[5].lastedit;
      this.model.addeddate = this.vendorList[5].addeddate;
      this.alertService.success("");
    }
  }

  vendoreditDetails(){
    this.vendordetails=false;
    this.vendoreditdetails=true;
    this.customereditdetails=false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  vendorupdateDetails(){
    this.message="Vendor detailsupdated Successfully."
    this.mainmessage="Successfully Saved."
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
      this.vendordetails=true;
      this.vendordetails=false;
      this.vendoreditdetails=false;
      this.customereditdetails=false;
      this.customerdragAndDrop = false;
    }, 1500);
  }
  vendorcloseMethod(){
    this.vendordetails=true;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  vendordragdropcloseMethod(){
    this.vendordetails=true;
    this.vendoreditdetails=false;
    this.vendordragAndDrop=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  addVendor(){
    this.vendordragAndDrop=true;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.customerdragAndDrop = false;
  }
  vendordelete(){
    this.message="Vendor DetailsDeleted Successfully."
    this.mainmessage="Deleted."
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
      this.vendordetails=true;
      this.vendordragAndDrop=false;
      this.vendoreditdetails=false;
      this.customerdetails = false;
      this.customereditdetails = false;
      this.customerdragAndDrop = false;
    }, 1500);
  }




//Tab Method start
  vendorcust(vencust:number){
    if(vencust == 1){
      this.vendordetailsstart = true; // vendor details 
      this.customerdetailsstart = false;
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendordetails = false;
       document.getElementById("vendorstyle").style.borderBottom='2px solid #007bff';
       document.getElementById("customerstyle").style.borderBottom='none';
       document.getElementById("vendorstyle").style.fontWeight='bold';
       document.getElementById("customerstyle").style.fontWeight='normal';
    }else if(vencust == 2){
      this.customerdetailsstart = true; // customer  details.
      this.vendordetailsstart = false;
      
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendordetails = false;
       document.getElementById("customerstyle").style.borderBottom='2px solid #007bff';
       document.getElementById("vendorstyle").style.borderBottom='none';
       document.getElementById("vendorstyle").style.fontWeight='normal';
       document.getElementById("customerstyle").style.fontWeight='bold';
    }
  }




  //Customer method start
  customerDetails(custcode:string){
    if(this.custtempid!==null){
      document.getElementById(this.custtempid).style.backgroundColor='white';
      this.custtempid=null;

    }
    this.custtempid=custcode;
    document.getElementById(this.custtempid).style.backgroundColor='#DDEDF9';
//customer div calling
    this.vendordetailsstart = false;
    this.customerdetailsstart = true;

    this.vendordetails = false;
    this.customerdetails = true;
    
    this.vendoreditdetails = false;
    this.customereditdetails=false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    if(custcode == "CUST001"){
      this.model.custcode = this.custList[0].custcode;
      this.model.customerName = this.custList[0].customerName;
      this.model.phoneNumber = this.custList[0].phoneNumber;
      this.model.mobileNumber = this.custList[0].mobileNumber;
      this.model.address = this.custList[0].address;
      this.model.country = this.custList[0].country;
      this.model.city = this.custList[0].city;
      this.model.email = this.custList[0].email;
      this.model.lastedit = this.custList[0].lastedit;
      this.model.addeddate = this.custList[0].addeddate;
    }else if(custcode == "CUST002"){
      this.model.custcode = this.custList[1].custcode;
      this.model.customerName = this.custList[1].customerName;
      this.model.phoneNumber = this.custList[1].phoneNumber;
      this.model.mobileNumber = this.custList[1].mobileNumber;
      this.model.country = this.custList[1].country;
      this.model.city = this.custList[1].city;
      this.model.email = this.custList[1].email;
      this.model.lastedit = this.custList[1].lastedit;
      this.model.addeddate = this.custList[1].addeddate;
      this.alertService.success("");
    }
    else if(custcode == "CUST003"){
      this.model.custcode = this.custList[2].custcode;
      this.model.customerName = this.custList[2].customerName;
      this.model.phoneNumber = this.custList[2].phoneNumber;
      this.model.mobileNumber = this.custList[2].mobileNumber;
      this.model.address = this.custList[2].address;
      this.model.country = this.custList[2].country;
      this.model.city = this.custList[2].city;
      this.model.email = this.custList[2].email;
      this.model.lastedit = this.custList[2].lastedit;
      this.model.addeddate = this.custList[2].addeddate;
      this.alertService.success("");
    }

    else if(custcode == "CUST004"){
      this.model.custcode = this.custList[3].custcode;
      this.model.customerName = this.custList[3].customerName;
      this.model.phoneNumber = this.custList[3].phoneNumber;
      this.model.mobileNumber = this.custList[3].mobileNumber;
      this.model.address = this.custList[3].address;
      this.model.country = this.custList[3].country;
      this.model.city = this.custList[3].city;
      this.model.email = this.custList[3].email;
      this.model.lastedit = this.custList[3].lastedit;
      this.model.addeddate = this.custList[3].addeddate;
      this.alertService.success("");
    }
    else if(custcode == "CUST005"){
      this.model.custcode = this.custList[4].custcode;
      this.model.customerName = this.custList[4].customerName;
      this.model.phoneNumber = this.custList[4].phoneNumber;
      this.model.mobileNumber = this.custList[4].mobileNumber;
      this.model.address = this.custList[4].address;
      this.model.country = this.custList[4].country;
      this.model.city = this.custList[4].city;
      this.model.email = this.custList[4].email;
      this.model.lastedit = this.custList[4].lastedit;
      this.model.addeddate = this.custList[4].addeddate;
      this.alertService.success("");
    }

    else if(custcode == "CUST006"){
      this.model.custcode = this.custList[5].custcode;
      this.model.customerName = this.custList[5].customerName;
      this.model.phoneNumber = this.custList[5].phoneNumber;
      this.model.mobileNumber = this.custList[5].mobileNumber;
      this.model.address = this.custList[5].address;
      this.model.country = this.custList[5].country;
      this.model.city = this.custList[5].city;
      this.model.email = this.custList[5].email;
      this.model.lastedit = this.custList[5].lastedit;
      this.model.addeddate = this.custList[5].addeddate;
      this.alertService.success("");
    }
  }
  customerEditDetails(){
    this.customerdetails=false;
    this.customereditdetails=true;
    this.vendoreditdetails=false;
    this.alertService.success("");
  }
  customercloseMethod(){
    this.customerdetails=true;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.alertService.success("");
  }
  customerdragdropcloseMethod(){
    this.customerdetails=true;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  customerdragdropclose(){
    this.customerdetails=true;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  customerupdateDetails(){
    this.message="Customer details saved Successfully."
    this.mainmessage="Successfully Saved."
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
      this.customerdetails = true;
      this.customereditdetails=false;
      this.vendoreditdetails = false;
      this.vendordragAndDrop = false;
      this.customerdragAndDrop = false;
    }, 1500);
  }
  addCustomer(){
    this.customerdragAndDrop = true;
    this.vendordetails=false;
    this.vendoreditdetails=false;
    this.customerdetails = false;
    this.customereditdetails = false;
    this.vendordragAndDrop = false;
  }
  customerdelete(){
    this.message="Customer details Deleted Successfully."
    this.mainmessage="Deleted."
    this.successdialog = 'block';
    setTimeout(() => {
      this.successdialog = 'none';
      this.customerdetails = true;
      this.customereditdetails=false;
      this.vendoreditdetails = false;
      this.vendordragAndDrop = false;
      this.customerdragAndDrop = false;
    }, 1500);
  }
}