import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Finance } from "../../../../core/common/_models";
import { environment } from "src/environments/environment";

import { API_ENDPOINTS } from "./../finance.config";

@Injectable()
export class FinanceService {
  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<Finance>(
      `${environment.apiUrl}${API_ENDPOINTS.LOAD_PETTY}`);
  }

  save(data:any) {
    return this.http.post(
      `${environment.apiUrl}${API_ENDPOINTS.SAVE_PETTY}`,
      data
    )
  }

  remove(id:string){
    return this.http.delete<String>(`${environment.apiUrl}${API_ENDPOINTS.REMOVE_PETTY+'?id='+id}`); 
  }

}
