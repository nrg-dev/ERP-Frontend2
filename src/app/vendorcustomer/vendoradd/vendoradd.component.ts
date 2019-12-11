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

  public vendordetails = false;
  public vendoreditdetails=false;
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
countryList: any = ['India', 'Malaysia', 'Indonesia', 'Singapore'];

  constructor(private router: Router, private alertService: AlertService) { }

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
    this.vendoreditdetails=false;
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
    }
  }

  vendoreditDetails(){
    this.vendordetails=false;
    this.vendoreditdetails=true;
  }
  updateDetails(){
    this.alertService.success("Successfully Updated");
    this.alertService=null;

  }
  closeMethod(){
    this.vendordetails=true;
    this.vendoreditdetails=false;
  }
}