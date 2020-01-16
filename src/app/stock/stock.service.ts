import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../_models';

@Injectable()
export class StockService {    

    //private commonURL = 'http://35.160.115.237:8095/erp/';
    private commonURL = 'http://localhost:8095/erp/sales/';

    constructor(private http: HttpClient) { }

    //********************* Stock ************************
    // Load 
    load(){
        return this.http.get<Stock>(this.commonURL+'load');
    }

}
