import { Component, OnInit } from '@angular/core';
import { Zone } from '../_model/Zone';
import { Globals } from '../Globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  zones : Zone[];

  constructor(private http: HttpClient) { 
    this.loadZones();
  }

  ngOnInit() {
  }

  async loadZones(){
      let zones = await this.http.get<Zone[]>(`${Globals.url}/rate/zones`).toPromise();

      this.zones = zones;
  }
}
