import { Component, OnInit } from '@angular/core';
import { Tracker } from '../_model/Tracker';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';
import { isArray } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Owner } from '../_model/Owner';
import { SearchService } from '../_services/search.services'
import { Vehicle } from '../_model/Vehicle';
import { VehicleService} from '../_services/vehicle.serves'

@Component({
    selector: 'app-tracker',
    templateUrl: './tracker.component.html',
    styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
    isNew: boolean = false;
    tracker: Tracker = new Tracker;
    searchForm: FormGroup;
    foundOwners: Owner[];
    foundVehicles: Vehicle[];
    selectedOwner: Owner;
    selectedVehicle: Vehicle;

    constructor(route: ActivatedRoute, private http: HttpClient, private searchService: SearchService, private fb: FormBuilder, private vehicleService : VehicleService) {
        route.params.subscribe(params => this.loadTracker(params.id));
    }

    ngOnInit() { }
    
    async loadTracker(trackerId: string)
    {
        if (trackerId == 'new') {
            this.tracker = { trackerId: 'FR_' + Globals.getUuid(), ownerId: 0, ownerName: "", ownerLastName: "", isActive: true};
            this.isNew = true;
            return;
        }

        let tracker = await this.http.get<Tracker | Tracker[]>(`${Globals.url}/tracker/${trackerId}`).toPromise();
        this.tracker = isArray(tracker) ? tracker[0] : tracker;
    }

    async saveTracker()
    {
        let url = `${Globals.url}/tracker`;
        this.tracker = this.isNew
            ? await this.http.post<Tracker>(url, this.tracker).toPromise()
            : await this.http.put<Tracker>(url, this.tracker).toPromise();
        this.isNew = false;
        alert("save succesfull");
    }
}
