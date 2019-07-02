import { Component, OnInit } from '@angular/core';
import { Owner } from '../_model/Owner';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit
{
    owners: Owner[] = [];

    constructor(private http: HttpClient)
    {
        this.loadOwners();
    }

    ngOnInit() {
    }

    async loadOwners()
    {
        let owners = await this.http.get<Owner[]>(`${Globals.url}/owner`).toPromise();
        this.owners = owners;
    }
}
