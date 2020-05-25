import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";

import { API_ENDPOINTS } from "./../usermgt.config";

@Injectable()
export class UserManagementService {
  constructor(private http: HttpClient) {}

 
}
