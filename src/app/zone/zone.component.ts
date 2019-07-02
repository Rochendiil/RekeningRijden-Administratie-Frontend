import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Zone } from '../_model/Zone';
import { Globals } from '../Globals';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Rate } from '../_model/Rate';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  rate : Rate;
  zone : Zone;
  form: FormGroup;
  response : Response;
  rates: Rate[];
  id : number;
    constructor(route: ActivatedRoute, private http: HttpClient)
    {
        route.params.subscribe(params => this.id = params.id);
        this.loadZone(this.id);
        this.form = new FormGroup({
            from: new FormControl(),
            until: new FormControl(),
            price: new FormControl()
        })
        this.getRates(this.id);
      }

  ngOnInit() {
    
  }
  
  public getDate(hour:number, minute:number){
      let date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      return date;
  }

  async onRemove(id: number){
      await this.http.delete(`${Globals.url}/rate/` + id).toPromise();
      this.getRates(this.id);
  }

  async getRates(id:number){
    this.rates = await this.http.get<Rate[]>(`${Globals.url}/rate/zone/` + id + "/customrates").toPromise();
  }
  async loadZone(id:number){
      let zone = await this.http.get<Zone>(`${Globals.url}/rate/zone/` + id).toPromise();
      console.log(zone.name)
      this.zone = zone;
  }
  async onSubmit(){
    this.rate = new Rate();
    let c = this.form.controls;
    let from : string[];
    let until : string[];
    from = c.from.value.split(":");
    until = c.until.value.split(":");
    this.rate.price = c.price.value;
    this.rate.fromHour = parseInt(from[0]);
    this.rate.fromMinute = parseInt(from[1]);
    this.rate.untilHour = parseInt(until[0]);
    this.rate.untilMinute = parseInt(until[1]);
    this.rate.zoneId = this.id;
    let url = `${Globals.url}/rate/zone/` + this.id + "/customrate";
    await this.http.post<any>(url, this.rate).toPromise();
    this.getRates(this.id);
  }
  

}
