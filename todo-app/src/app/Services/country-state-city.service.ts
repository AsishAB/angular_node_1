import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../Models/global-url.model';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http : HttpClient) { }


  getAllCountries() {
    return this.http.get<{response:any}>(api_url+"ext-api/get-all-countries");
  }
  getAllStates(id:any) {
    return this.http.get<{response:any}>(api_url+"ext-api/get-all-states/"+id);
  }
  getAllCities(id:any) {
    return this.http.get<{response:any}>(api_url+"ext-api/get-all-cities/"+id);
  }
}
