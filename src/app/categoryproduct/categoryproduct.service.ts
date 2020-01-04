import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models';

@Injectable()
export class CategoryproductService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/category/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(category: Category){
    console.log('service....');
    return this.http.post<Category>(this.commonURL+'save',category);
}

// Load 
load(){
    return this.http.get(this.commonURL+'load');
}

// get 
get(id:number){
    return this.http.get<Category>(this.commonURL+'get?id='+id);
}

// Update 
update(category: Category){
    return this.http.put<Category>(this.commonURL+'update',category);

}

// Remove 
remove(id:number){
    return this.http.delete<String>(this.commonURL+'remove?id='+id);
}
}
