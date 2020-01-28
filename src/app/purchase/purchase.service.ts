import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../_models';
import { Vendor } from '../_models';
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

    //*********************Purchase************************

    loadVendor(){
        return this.http.get<Purchase>(this.commonURL+'loadVendor'); 
    }
    // Save 
    // Save 
save(purchasesearcharray: Array<any>,vendorName:string){
    purchasesearcharray.push([{vendorname:vendorName,podate:"09-sep-2020"}]);
    return this.http.post(this.commonURL+'save',purchasesearcharray);
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
    remove(invoiceNumber:string){
        return this.http.delete<String>(this.commonURL+'remove?invoiceNumber='+invoiceNumber);
    }


    getVendorDetails(vendorname: string){
        return this.http.get<Purchase>(this.commonURL+'getVendorDetails?vendorname='+vendorname);
    }
}
