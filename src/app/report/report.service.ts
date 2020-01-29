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
export class ReportService {    

    //private commonURL = 'http://35.160.115.237:8095/erp/';
    private commonURL = 'http://localhost:8095/erp/reports/';


    constructor(private http: HttpClient) { }

    //********************* Report ************************

    employeeReport(){
        return this.http.get<Purchase>(this.commonURL+'employeeReport'); 
    }
    
}
