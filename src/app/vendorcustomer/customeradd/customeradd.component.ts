import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customeradd',
  templateUrl: './customeradd.component.html',
  styleUrls: ['./customeradd.component.css']
})
export class CustomeraddComponent implements OnInit {
  public vendordetails = false;
  model:any ={};

  custList : any = [ 
  {
    custcode:'CUST001',
    name :' WIROTO CRAFT',
    contactNumber : '+62 274 373346',
    address : 'Istimewa Yogyakarta 55172, Indonesia',
    country :  'Indonesia',
    email : 'admin@wirotocraft.com'
  },
  {custcode:'CUST002',
  name :'PT. Adi Jaya Naturindo',
  contactNumber : '+61 3234321',
  address : 'No 3, South Street,KL,Indonesia',
  country :  'Indonesia',
  email : 'admin@adijaya.com'
},
 {custcode:'CUST003',
  name :'Editha Artcraft',
  contactNumber : '+61 7234321',
  address : 'No 32, North Street,jakarta,Indonesia',
  country :  'Indonesia',
  email : 'admin@edinthn.com'
},
  { custcode:'CUST004',
    name :'PONDAN PANGAN MAKMUR INDONESIA PT',
    contactNumber : '+61 3234324',
    address : 'No 21, North Street,jakarta,Indonesia',
    country :  'Indonesia',
    email : 'admin@pondan.com'
},
{   custcode:'CUST005',
    name :'Sumatra Copper and Gold',
    contactNumber : '+61 3234332',
    address : 'No 212, North Street,jakarta,Indonesia',
    country :  'Indonesia',
    email : 'admin@sumatra.com'
},
{   custcode:'CUST006',
    name :'MANOHARA ASRI PT',
    contactNumber : '+61 38234321',
    address : 'No 2/7, North Street,jakarta,Indonesia',
    country :  'Indonesia',
    email : 'admin@manohar.com'
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
  
      this.vendordetails = true;
      if(custcode == "CUST001"){
        this.model.custcode = this.custList[0].custcode;
        this.model.name = this.custList[0].name;
        this.model.contactNumber = this.custList[0].contactNumber;
        this.model.address = this.custList[0].address;
        this.model.country = this.custList[0].country;
        this.model.email = this.custList[0].email;
      }else if(custcode == "CUST002"){
        this.model.custcode = this.custList[1].custcode;
        this.model.name = this.custList[1].name;
        this.model.contactNumber = this.custList[1].contactNumber;
        this.model.address = this.custList[1].address;
        this.model.country = this.custList[1].country;
        this.model.email = this.custList[1].email;
      }
      else if(custcode == "CUST003"){
        this.model.custcode = this.custList[2].custcode;
        this.model.name = this.custList[2].name;
        this.model.contactNumber = this.custList[2].contactNumber;
        this.model.address = this.custList[2].address;
        this.model.country = this.custList[2].country;
        this.model.email = this.custList[2].email;
      }

      else if(custcode == "CUST004"){
        this.model.custcode = this.custList[3].custcode;
        this.model.name = this.custList[3].name;
        this.model.contactNumber = this.custList[3].contactNumber;
        this.model.address = this.custList[3].address;
        this.model.country = this.custList[3].country;
        this.model.email = this.custList[3].email;
      }
      else if(custcode == "CUST005"){
        this.model.custcode = this.custList[4].custcode;
        this.model.name = this.custList[4].name;
        this.model.contactNumber = this.custList[4].contactNumber;
        this.model.address = this.custList[4].address;
        this.model.country = this.custList[4].country;
        this.model.email = this.custList[4].email;
      }

      else if(custcode == "CUST006"){
        this.model.custcode = this.custList[5].custcode;
        this.model.name = this.custList[5].name;
        this.model.contactNumber = this.custList[5].contactNumber;
        this.model.address = this.custList[5].address;
        this.model.country = this.custList[5].country;
        this.model.email = this.custList[5].email;
      }
    }
    
  }