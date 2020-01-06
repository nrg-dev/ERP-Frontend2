import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../_models';

@Injectable()
export class PurchaseService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/purchase/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(purchsearray: Array<any>){
    console.log('service....');
    return this.http.post<Purchase>(this.commonURL+'save',purchsearray);
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
