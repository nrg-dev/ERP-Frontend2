import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sales } from '../_models';

@Injectable()
export class SalesService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/sales/';

constructor(private http: HttpClient) { }

//********************* Sales ************************

// Save 
save(salesarray: Array<any>){
    console.log('service....');
    return this.http.post<Sales>(this.commonURL+'save',salesarray);
}

// Load 
load(){
    return this.http.get<Sales>(this.commonURL+'load');

    //         this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{

}

// get 
get(id:number){
    return this.http.get<Sales>(this.commonURL+'get?id='+id);
}

// Update 
update(sales: Sales){
    return this.http.put<Sales>(this.commonURL+'update',sales);

}

// Remove 
remove(id:number){
    return this.http.delete<String>(this.commonURL+'remove?id='+id);
}
}
