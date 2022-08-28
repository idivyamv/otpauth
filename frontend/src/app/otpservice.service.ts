import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtpserviceService {
  server_address : String = `http://localhost:5000`;// = `api`;//

  constructor(private http:HttpClient) { }

  create(item:any){
    return this.http.post(`${this.server_address}/create`,{visitor:item});
  }
  
  checkotp(checkotp: any){
      return this.http.post(`${this.server_address}/checkotp`,{otpcheck:checkotp});
  }
}
