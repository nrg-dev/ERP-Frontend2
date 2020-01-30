import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product } from '../_models';

@Injectable()
export class CategoryproductService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL1 = 'http://localhost:8095/erp/category/';
private commonURL2 = 'http://localhost:8095/erp/item/';


constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(category: Category){
    console.log('service....');
    return this.http.post<Category>(this.commonURL1+'save',category);
}

//producsave
producsave(product: Product){
    console.log('product service call....');
    return this.http.post<Product>(this.commonURL2+'productsave',product);
}

//category Load 
load(){
    return this.http.get(this.commonURL1+'load');
}
//item Load 
loadItem(){
    return this.http.get<Product>(this.commonURL2+'load');
}
// get 
get(id:number){
    return this.http.get<Category>(this.commonURL1+'get?id='+id);
}

// Update 
update(category: Category){
    return this.http.put<Category>(this.commonURL1+'update',category);
}
// product update 
productupdate(product: Product){
    return this.http.put<Product>(this.commonURL2+'update',product);
}

// Remove 
remove(categorycode:string){
    return this.http.delete<Category>(this.commonURL1+'remove?categorycode='+categorycode);
}
// product Remove 
productremove(prodcode: string){
    return this.http.delete<Product>(this.commonURL2+'remove?prodcode='+prodcode);
}

}
