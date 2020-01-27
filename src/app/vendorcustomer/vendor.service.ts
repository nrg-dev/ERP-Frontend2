import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../_models';

@Injectable()
export class VendorService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/vendor/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(vendor: Vendor){
    console.log('service....');
    return this.http.post<Vendor>(this.commonURL+'save',vendor);
}

// Load 
load(){
    console.log("Load vendor service..");
    return this.http.get(this.commonURL+'load');
}

// get 
get(id:number){
    return this.http.get<Vendor>(this.commonURL+'get?id='+id);
}

// Update 
update(vendor: Vendor){
    return this.http.put<Vendor>(this.commonURL+'update',vendor);

} 

// Remove 
remove(id:number){
    return this.http.delete<String>(this.commonURL+'remove?id='+id);
}
}
