import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models';

@Injectable()
export class EmployeeService {    

//private commonURL = 'http://35.160.115.237:8095/erp/';
private commonURL = 'http://localhost:8095/erp/employee/';

constructor(private http: HttpClient) { }

//*********************Employee************************

// Save 
save(employee: Employee){
    console.log('service....');
    return this.http.post<Employee>(this.commonURL+'save',employee);
}

// Load 
load(){
    return this.http.get(this.commonURL+'load');
}

// get 
get(id:number){
    return this.http.get<Employee>(this.commonURL+'get?id='+id);
}

// Update 
update(employee: Employee){
    return this.http.put<Employee>(this.commonURL+'update',employee);

}

// Remove 
remove(id:number){
    return this.http.delete<String>(this.commonURL+'remove?id='+id);
}
}
