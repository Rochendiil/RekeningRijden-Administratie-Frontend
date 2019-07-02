import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../_model/Vehicle';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';
import { ObjectEditor } from '../ObjectEditor';
import { Owner } from '../_model/Owner';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent extends ObjectEditor<Vehicle> implements OnInit
{
    isNew: boolean = false;
    searchForm = new FormGroup({ query: new FormControl });
    foundOwners: Owner[];

    constructor(route: ActivatedRoute, private http: HttpClient)
    {
        super(new Vehicle);
        route.params.subscribe(params => this.loadVehicle(params.id));
        this.searchForm.controls.query.valueChanges.subscribe(query => this.searchChange(query));
    }

    ngOnInit() { }

    async loadVehicle(id: string)
    {
        if (id == "new") {
            this.value = new Vehicle;
            this.isNew = true;
            return;
        }
        let vehicle = await this.http.get<Vehicle>(`${Globals.url}/vehicle/${id}`).toPromise();
        this.value = vehicle;

        let owner = await this.http.get<Owner>(`${Globals.url}/owner/${vehicle.ownerId}`).toPromise();
        this.setOwner(owner);
    }

    async saveVehicle()
    {
        let url = `${Globals.url}/vehicle`;
        let vehicle = this.value;
        if (!vehicle.trackerId) {
            vehicle.trackerId = null;
        }
        this.value = this.isNew
            ? await this.http.post<Vehicle>(url, vehicle).toPromise()
            : await this.http.put<Vehicle>(url, vehicle).toPromise();
        this.isNew = false;
    }

    setOwner(owner: Owner)
    {
        // Yes this needs to be 3 lines
        let vehicle = this.value;
        vehicle.ownerId = owner.id;
        this.value = vehicle;

        let restore = this.inflight;
        this.inflight = true;
        this.searchForm.controls.query.setValue(owner.lastname + ', ' + owner.firstname + ', ' + owner.city + ' ' + owner.address); 
        this.inflight = restore;
    }

    inflight = false;
    typedInFlight = false;

    async searchChange(value)
    {
        if (this.inflight) {
            this.typedInFlight = true;
        }
        if (value.length <= 3) {
            this.foundOwners = [];
            return;
        }
        this.inflight = true;

        try {
            let owners = await this.http.get<Owner[]>(`${Globals.url}/owner/search/` + value).toPromise();
            this.foundOwners = owners;
        }
        finally
        {
            this.inflight = false;
            if (this.typedInFlight) {
                this.typedInFlight = false;
                this.searchChange(this.searchForm.controls.query.value);
            }
        }
    }
}
