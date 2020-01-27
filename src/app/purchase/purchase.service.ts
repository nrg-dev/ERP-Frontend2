import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../_models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Common } from '../_models/index';
import { HttpRequest, HttpEvent} from '@angular/common/http';


@Injectable()
export class PurchaseService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/purchase/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(purchase:Purchase){
   // console.log('Vendor Name ....'+vendorName);
   /* let formdata: FormData = new FormData();
    for (var i = 0; i < purchsearray.length; i++) {
        formdata.append('purchsearray[]', purchsearray[i]);
    }
      //formdata.append('purchsearray[]', purchsearray);
      formdata.append('vendorName', vendorName);
      const req = new HttpRequest('POST', this.commonURL+"save", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req); */

    return this.http.post<Purchase>(this.commonURL+'save',purchase);
    //return this.http.get<Purchase>(this.commonURL+'save?purchsearray='+purchsearray+'&vendorName='+vendorName);

//return this.http.post<any>(this.commonURL+'save?purchsearray='+purchsearray+'&vendorName='+vendorName);

}

// Load 
load(){
    return this.http.get<Purchase>(this.commonURL+'load');

    //         this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{

}

// get 
get(id:number){
    return this.http.get<Purchase>(this.commonURL+'get?id='+id);
}

// Update 
update(purchase: Purchase){
    return this.http.put<Purchase>(this.commonURL+'update',purchase);

}

// Remove 
remove(id:number){
    return this.http.delete<String>(this.commonURL+'remove?id='+id);
}
}
