import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../_models';

@Injectable()
export class StockService {    

    public url = require("../apiurl.json");
    private commonURL = this.url[0].apiurl+'stock/';
    
    constructor(private http: HttpClient) { }

    //********************* Stock ************************
    // Load 
    loadReturn(){
        return this.http.get<Stock>(this.commonURL+'loadStockReturn');
    }

    saveStockReturn(stock: Stock){
        return this.http.post<Stock>(this.commonURL+'saveStockReturn',stock);
    }

    save(stock: Stock){
        return this.http.post<Stock>(this.commonURL+'save',stock);
    }

    // Load 
    loadDamage(){
        return this.http.get<Stock>(this.commonURL+'loadStockDamage');
    }
    // Update 
    update(stock: Stock){
        return this.http.put<Stock>(this.commonURL+'update',stock);
    }

}
