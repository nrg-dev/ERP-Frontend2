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
   
    public url = require("../apiurl.json");
    private commonURL = this.url[0].apiurl+'purchase/';
    private categoryURL = this.url[0].apiurl+'category/';
    private productURL = this.url[0].apiurl+'item/';


    constructor(private http: HttpClient) { }

    //*********************Purchase************************

    loadVendor(){
        return this.http.get<Purchase>(this.commonURL+'loadVendor'); 
    }
    // Save 
    // Save 
    save(purchasesearcharray: Array<any>,vendorName:string,deliveryCost:string){
        purchasesearcharray.push([{vendorname:vendorName,podate:"09-sep-2020",deliveryCost:deliveryCost}]);
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

    geteditDetails(id: string){
        return this.http.get<Purchase>(this.commonURL+'get?id='+id);
    }

    removePartId(id:string,invoiceNumber:string){
        return this.http.delete<String>(this.commonURL+'removePartId?id='+id+'&invoiceNumber='+invoiceNumber);
    }

    loadCategory(){
        return this.http.get<Purchase>(this.categoryURL+'load');
    }

    loadCategoryName(){
        return this.http.get<Purchase>(this.categoryURL+'loadCategoryName');
    }

    //loadItem(category:string){
    loadItem(){
        return this.http.get<Purchase>(this.productURL+'load');
        //return this.http.get<Purchase>(this.commonURL+'loadItem?category='+category);
    }

    loadItemName(){
        return this.http.get<Purchase>(this.productURL+'loadItemName');
    }

    getUnitPrice(productName:string,category:string){
        return this.http.get<Purchase>(this.commonURL+'getUnitPrice?productName='+productName+'&category='+category);
    }
}
