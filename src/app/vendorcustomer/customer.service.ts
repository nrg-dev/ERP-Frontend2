import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class CustomerService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/customer/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(customer: Customer){
    console.log('custome rservice....');
    return this.http.post<Customer>(this.commonURL+'save',customer);
}
  
// Load 
load(){
    return this.http.get(this.commonURL+'load');
}

// get 
get(id:number){
    return this.http.get<Customer>(this.commonURL+'get?id='+id);
}

// Update 
update(customer: Customer){
    return this.http.put<Customer>(this.commonURL+'update',customer);

}

// Remove 
remove(custcode: string){
    return this.http.delete<Customer>(this.commonURL+'remove?custcode='+custcode);
}
}
