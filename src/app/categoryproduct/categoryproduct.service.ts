import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Product } from '../_models';
import { Discount } from '../_models/discount';

@Injectable()
export class CategoryproductService {    

public url = require("../apiurl.json");
private commonURL1 = this.url[0].apiurl+'category/';
private commonURL2 = this.url[0].apiurl+'item/';


constructor(private http: HttpClient) { }

//*********************Employee************************

//category Save 
save(category: Category){
    console.log('service....');
    return this.http.post<Category>(this.commonURL1+'save',category);
}

//producsave
producsave(product: Product){
    console.log('product service call....');
    return this.http.post<Product>(this.commonURL2+'productsave',product);
}

//add promotion save
addpromotionsave(discount:Discount){
    return this.http.post<Discount>(this.commonURL2+'addpromotionsave',discount);
}



//category Load 
load(){
    return this.http.get(this.commonURL1+'load');
}

//category Load 
loadCategoryName(){
    return this.http.get(this.commonURL1+'loadCategoryName');
}

//item Load 
loadItem(){
    return this.http.get<Product>(this.commonURL2+'load');
}
// Load only item name for auto search text box
loadItemName(){
    return this.http.get<String>(this.commonURL2+'loadItemName');

}
//discount Load 
loadDiscount(){
    return this.http.get<Discount>(this.commonURL2+'discountload');
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
// Discount update 
discountupdate(discount: Discount){
    return this.http.put<Discount>(this.commonURL2+'discountupdate',discount);
}



// Remove 
remove(categorycode:string){
    return this.http.delete<Category>(this.commonURL1+'remove?categorycode='+categorycode);
}
// product Remove 
productremove(prodcode: string){
    return this.http.delete<Product>(this.commonURL2+'remove?prodcode='+prodcode);
}
// Discount Remove 
discountremove(discountcode: string){
    return this.http.delete<Discount>(this.commonURL2+'discountremove?discountcode='+discountcode);
}

}
