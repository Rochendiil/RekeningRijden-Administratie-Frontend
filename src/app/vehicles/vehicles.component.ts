import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../_model/Vehicle';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit
{
    vehicles: Vehicle[] = [];

    constructor(private http: HttpClient)
    {
        this.loadVehicles();
    }

    ngOnInit() {
    }

    async loadVehicles()
    {
        let vehicles = await this.http.get<Vehicle[]>(`${Globals.url}/vehicle/all`).toPromise();
        this.vehicles = vehicles;
    }
}
