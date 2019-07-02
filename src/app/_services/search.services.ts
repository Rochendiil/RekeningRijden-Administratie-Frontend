import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from '../_model/Owner';
import {Globals} from '../Globals';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient : HttpClient) { }

  search(queryString : string){
    return this.httpClient.get<Owner[]>(`${Globals.url}/owner/search/` + queryString);
  }
}
