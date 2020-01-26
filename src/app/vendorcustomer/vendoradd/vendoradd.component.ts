import { Component, OnInit } from '@angular/core';
import { Customer,Vendor } from 'src/app/_models';
import { AlertService } from 'src/app/_services/index';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { VendorService } from '../vendor.service';
import { HttpClientModule } from '@angular/common/http';


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
  customer:Customer;
  vendor:Vendor;
  vendorList: any = {};
  customerList: any={};


countryList: any = ['India', 'Malaysia', 'Indonesia', 'Singapore'];

  constructor(private router: Router,
     private alertService: AlertService,
     private vendorService: VendorService,
     private customerService: CustomerService,

      
    ) { }

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
    this.getAllVendorDetails();
    this.getAllCustomerDetails();
  }

  getAllVendorDetails(){
    this.vendorList="";
    this.vendorService.load()
    .subscribe(
      data => {
        this.vendorList = data;
      },
      error => {
        alert("server error");
      }
    );
  }
  getAllCustomerDetails(){
    this.customerList="";
    this.customerService.load()
    .subscribe(
      data => {
        this.customerList = data;
      },
      error => {
        alert("server error");
      }
    )
  }

  //Vendor details methos start
  vendorDetails(vendorcode:string){
    if(this.tempid!==null){
      document.getElementById(this.tempid).style.backgroundColor='#243641';
      this.tempid=null;

    }
    this.tempid=vendorcode;
    document.getElementById(this.tempid).style.backgroundColor='#2F4756';
    //-- VendorDetails Div Calling --
    this.vendordetailsstart = true;
    this.customerdetailsstart = false;

    this.vendordetails = true;
    this.customerdetails = false;

    this.vendoreditdetails=false;
    this.customereditdetails = false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    var lenth = this.vendorList.lenth;
    console.log ("vendor Size -->" + this.vendorList.length);
    console.log ("vendor code -->" + vendorcode);
    for(let j=0;j<this.vendorList.length;j++){
      console.log ("Block statement execution no." + j);
      if(this.vendorList[j].vendorcode==vendorcode)
        {
          console.log("Inside if vendor code -->"+vendorcode);
        this.model.vendorcode = this.vendorList[j].vendorcode;
        this.model.vendorName = this.vendorList[j].vendorName;
        this.model.phoneNumber = this.vendorList[j].phoneNumber;
        this.model.mobileNumber = this.vendorList[j].mobileNumber;
        this.model.address = this.vendorList[j].address;
        this.model.country = this.vendorList[j].country;
        this.model.city = this.vendorList[j].city;
        this.model.email = this.vendorList[j].email;
        this.model.lastedit = this.vendorList[j].lastedit;
        this.model.addeddate = this.vendorList[j].addeddate;
        break;
      }
    }
  }

  vendoreditDetails(){
    this.vendordetails=false;
    this.vendoreditdetails=true;
    this.customereditdetails=false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  saveVendor(){
    this.vendorService.save(this.model)
    .subscribe(
      data => {
        this.vendor =   data;    
        console.log("Response -->"+this.vendor.status) 
        if(this.vendor.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
            this.vendordetails=false;
            this.vendoreditdetails=false;
            this.vendordragAndDrop=false;
            this.customereditdetails=false;
            this.customerdragAndDrop = false;
          }, 2000);
        }
        if(this.vendor.status=="failure"){
          this.alertService.success("Server issue");
        }
      },
      error => {
        this.alertService.success("Serve Error ");
    setTimeout(() => {
      this.alertService.clear();
      this.alertService.clear();
      this.vendordetails=false;
      this.vendoreditdetails=false;
      this.vendordragAndDrop=false;
      this.customereditdetails=false;
      this.customerdragAndDrop = false;
    }, 2000);
      }
    );  
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
    this.vendordetails=false;
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
    this.alertService.success("Delete Successfully");
    setTimeout(() => {
      this.successdialog = 'none';
      this.alertService.clear();
      this.vendordetails=false;
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
      document.getElementById(this.custtempid).style.backgroundColor='#243641';
      this.custtempid=null;

    }
    this.custtempid=custcode;
    document.getElementById(this.custtempid).style.backgroundColor='#2F4756';
//customer div calling
    this.vendordetailsstart = false;
    this.customerdetailsstart = true;

    this.vendordetails = false;
    this.customerdetails = true;
    
    this.vendoreditdetails = false;
    this.customereditdetails=false;

    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;

    // this.custList; json list 
    var lenth = this.customerList.lenth;
    console.log ("Cust Size -->" + this.customerList.length);
    console.log ("Cust code -->" + custcode);

    for (let i = 0; i < this.customerList.length; i++) {
      console.log ("Block statement execution no." + i);
      if(this.customerList[i].custcode==custcode){
        console.log("Inside if customer code -->"+custcode);
        this.model.custcode = this.customerList[i].custcode;
        this.model.customerName = this.customerList[i].customerName;
        this.model.phoneNumber = this.customerList[i].phoneNumber;
        this.model.mobileNumber = this.customerList[i].mobileNumber;
        this.model.address = this.customerList[i].address;
        this.model.country = this.customerList[i].country;
        this.model.city = this.customerList[i].city;
        this.model.email = this.customerList[i].email;
        this.model.lastedit = this.customerList[i].lastedit;
        this.model.addeddate = this.customerList[i].addeddate;
        break;
      }

    }
/*
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
    }*/
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
    this.customerdetails=false;
    this.customereditdetails=false;
    this.vendoreditdetails = false;
    this.vendordragAndDrop = false;
    this.customerdragAndDrop = false;
    this.alertService.success("");
  }
  customerupdateDetails(){
    this.alertService.success("Saved Successfully");
    setTimeout(() => {
      this.alertService.clear();
      this.customerdetails = false;
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
  saveCustomer(){
    console.log("country name-->"+this.model.country);
    // call rest ful api 
    this.customerService.save(this.model)
    .subscribe(
      data => {
        this.customer =   data;    
        console.log("Response -->"+this.customer.status) 
        if(this.customer.status=="success"){
          this.alertService.success("Saved Successfully");
          setTimeout(() => {
            this.alertService.clear();
            this.alertService.clear();
            this.customerdetails = false;
            this.vendordetails=false;
            this.vendoreditdetails=false;
            this.customereditdetails=false;
            this.customerdragAndDrop = false;
          }, 2000);
        }
        if(this.customer.status=="failure"){
          this.alertService.success("Server issue");
        }
      },
      error => {
        this.alertService.success("Serve Error ");
    setTimeout(() => {
      this.alertService.clear();
      this.alertService.clear();
      this.customerdetails = false;
      this.vendordetails=false;
      this.vendoreditdetails=false;
      this.customereditdetails=false;
      this.customerdragAndDrop = false;
    }, 2000);
      }
    );  


   
  }
  customerdelete(){
    this.alertService.success("Delete Successfully");
    setTimeout(() => {
      this.successdialog = 'none';
      this.alertService.clear();
      this.customerdetails = false;
      this.customereditdetails=false;
      this.vendoreditdetails = false;
      this.vendordragAndDrop = false;
      this.customerdragAndDrop = false;
    }, 1500);
  }
}