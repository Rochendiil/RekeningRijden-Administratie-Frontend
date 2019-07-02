import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../Globals';
import { Vehicle } from '../_model/Vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private httpClient : HttpClient) { }

  searchByOwner(ownerId : string){
    return this.httpClient.get<Vehicle[]>(`${Globals.url}/vehicle/byowner/` + ownerId);
  }
}
