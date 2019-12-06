import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-vendoradd',
  templateUrl: './vendoradd.component.html',
  styleUrls: ['./vendoradd.component.css']
})
export class VendoraddComponent implements OnInit {

  public vendordetails = false;
  model:any ={};

  vendorList : any = [ {
    vendorcode:'VEN001',
    name :'PT NRG',
    contactNumber : '+62 878-2277-7490',
    address : 'No 2, Main Street,Jakarta,Indonesia',
    country :  'Indonesia',
    email : 'nrgadmin@neotural.com'
  },
  {vendorcode:'VEN002',
  name :'CV. PURNAMA RAYA FOOD',
  contactNumber : '+62 878-2277-7450',
  address : 'No 32, East Street,Jakarta,India',
  country :  'Indonesia',
  email : 'purnama@raya.com'
},
 {vendorcode:'VEN003',
  name :'AGARINDO BOGATAMA, PT',
  contactNumber : '+62 878-2233-7490',
  address : 'No 54, Kungan city,Jakarta,Indonesia',
  country :  'Indonesia',
  email : 'admin@bogatama.com'
},
  {vendorcode:'VEN004',
    name :'Manggar Natural',
    contactNumber : '+62 878-2277-8490',
    address : 'No 23, Near T Rasuna,Jakarta,Indonesia',
    country :  'Indonesia',
    email : 'manggar@gmail.com'
},
{vendorcode:'VEN005',
    name :'CD Craft Bethesda - Denara',
    contactNumber : '+62 878-2277-7590',
    address : 'No 47, East Costal road ,Jakarta,Indonesia',
    country :  'Indonesia',
    email : 'admin@denara.com'
},
{vendorcode:'VEN006',
    name :'Golden Manyaran, PT',
    contactNumber : '+62 878-2277-7690',
    address : 'No 2/4, South Street,Jakarta,Indonesia',
    country :  'Indonesia',
    email : 'admin@golden.com'
},

];

  constructor() { }

  ngOnInit() {
  }
   tempid=null;
  vendorDetails(vendorcode:string){
    if(this.tempid!==null){
      document.getElementById(this.tempid).style.backgroundColor='white';
      this.tempid=null;

    }
    this.tempid=vendorcode;
    document.getElementById(this.tempid).style.backgroundColor='#DDEDF9';


    this.vendordetails = true;
    if(vendorcode == "VEN001"){
      this.model.vendorcode = this.vendorList[0].vendorcode;
      this.model.name = this.vendorList[0].name;
      this.model.contactNumber = this.vendorList[0].contactNumber;
      this.model.address = this.vendorList[0].address;
      this.model.country = this.vendorList[0].country;
      this.model.email = this.vendorList[0].email;
    }else if(vendorcode == "VEN002"){
      this.model.vendorcode = this.vendorList[1].vendorcode;
      this.model.name = this.vendorList[1].name;
      this.model.address = this.vendorList[1].address;
      this.model.contactNumber = this.vendorList[1].contactNumber;
      this.model.email = this.vendorList[1].email;
    }
    else if(vendorcode == "VEN003"){
      this.model.vendorcode = this.vendorList[2].vendorcode;
      this.model.name = this.vendorList[2].name;
      this.model.address = this.vendorList[2].address;
      this.model.contactNumber = this.vendorList[2].contactNumber;
      this.model.email = this.vendorList[2].email;
    }
    else if(vendorcode == "VEN004"){
      this.model.vendorcode = this.vendorList[3].vendorcode;
      this.model.name = this.vendorList[3].name;
      this.model.address = this.vendorList[3].address;
      this.model.contactNumber = this.vendorList[3].contactNumber;
      this.model.email = this.vendorList[3].email;
    }
    else if(vendorcode == "VEN005"){
      this.model.vendorcode = this.vendorList[4].vendorcode;
      this.model.name = this.vendorList[4].name;
      this.model.address = this.vendorList[4].address;
      this.model.contactNumber = this.vendorList[4].contactNumber;
      this.model.email = this.vendorList[4].email;
    }

    else if(vendorcode == "VEN006"){
      this.model.vendorcode = this.vendorList[5].vendorcode;
      this.model.name = this.vendorList[5].name;
      this.model.address = this.vendorList[5].address;
      this.model.contactNumber = this.vendorList[5].contactNumber;
      this.model.email = this.vendorList[5].email;
    }
  }
  
}