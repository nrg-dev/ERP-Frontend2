import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customeradd',
  templateUrl: './customeradd.component.html',
  styleUrls: ['./customeradd.component.css']
})
export class CustomeraddComponent implements OnInit {
  public customerdetails = false;
  public customereditdetails=false;
  model:any ={};

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

  constructor() { }

  ngOnInit() {
    }
    tempid=null;
    customerDetails(custcode:string){
      if(this.tempid!==null){
        document.getElementById(this.tempid).style.backgroundColor='white';
        this.tempid=null;
  
      }
      this.tempid=custcode;
      document.getElementById(this.tempid).style.backgroundColor='#DDEDF9';
  
      this.customerdetails = true;
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
      }
    }
    customerEditDetails(){
      this.customerdetails=false;
      this.customereditdetails=true;
    }
    closeMethod(){
      this.customerdetails=true;
      this.customereditdetails=false;
    }
    
  }