import { Component, OnInit } from '@angular/core';
import { Tracker } from '../_model/Tracker';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';

import { ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
    selector: 'app-trackers',
    templateUrl: './trackers.component.html',
    styleUrls: ['./trackers.component.scss']
})
export class TrackersComponent implements OnInit
{
    trackers: Tracker[] = [];
    @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective
    elements: any = [];
    previous: any = [];
    headElements = ['TrackerId', 'Owner', 'Edit'];
    searchText: string = '';
    previous1: string;
    constructor(private http: HttpClient)
    {
        this.loadTrackers();
    }

    @HostListener('input') oninput() {
        this.searchItems();
      }

    ngOnInit() { }

    async loadTrackers()
    {
        let trackers = await this.http.get<Tracker[]>(`${Globals.url}/tracker/all`).toPromise();
        this.trackers = trackers || [];
        this.mdbTable.setDataSource(this.trackers);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
    }
    searchItems() {
        console.log(this.searchText);
        const prev = this.mdbTable.getDataSource();
        
        if (!this.searchText) {
          this.mdbTable.setDataSource(this.previous);
          this.elements = this.mdbTable.getDataSource();
        }
    
        if (this.searchText) {
          this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
          this.mdbTable.setDataSource(prev);
        }
      }
}
