import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../_model/Invoice';
import { Globals } from '../Globals';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit
{
    invoices: Invoice[] = [];

    constructor(private http: HttpClient)
    {
        this.loadInvoices();
    }

    ngOnInit() { }

    async loadInvoices()
    {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let invoices = await this.http.get<Invoice[]>(`${Globals.url}/invoice/all?year=${year}&month=${month}`).toPromise();
        this.invoices = invoices || [];
    }

    async generateInvoices()
    {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        await this.http.get<any>(`${Globals.url}/invoice/generate?year=${year}&month=${month}`).toPromise();
    }
}
