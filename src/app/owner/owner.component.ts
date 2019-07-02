import { Component, OnInit } from '@angular/core';
import { Owner } from '../_model/Owner';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../Globals';
import { ObjectEditor } from '../ObjectEditor';

@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss']
})
export class OwnerComponent extends ObjectEditor<Owner> implements OnInit
{
    isNew: boolean = false;

    constructor(route: ActivatedRoute, private http: HttpClient)
    {
        super(new Owner);
        route.params.subscribe(params => this.loadOwner(params.id))
    }

    ngOnInit() {
    }

    async loadOwner(id: string)
    {
        if (id == "new") {
            this.value = new Owner;
            this.isNew = true;
            return;
        }
        let owner = await this.http.get<Owner>(`${Globals.url}/owner/${id}`).toPromise();
        this.value = owner;
    }

    async saveOwner()
    {
        let url = `${Globals.url}/owner`;
        this.value = this.isNew
            ? await this.http.post<Owner>(url, this.value).toPromise()
            : await this.http.put<Owner>(url, this.value).toPromise();
        this.isNew = false;
    }
}
