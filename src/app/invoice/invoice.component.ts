import { Component, OnInit } from '@angular/core';
import { Invoice } from '../_model/Invoice';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../Globals';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit
{
    invoice: Invoice = new Invoice;

    constructor(private route: ActivatedRoute, private http: HttpClient)
    {
        this.route.params.subscribe(params => this.loadInvoice(+params.id));
    }

    ngOnInit() { }

    async loadInvoice(id: number)
    {
        let invoice = await this.http.get<Invoice>(`${Globals.url}/invoice/${id}`).toPromise();
        this.invoice = invoice;
    }

    async recalculateInvoice()
    {
        let invoice = await this.http.get<Invoice>(`${Globals.url}/invoice/${this.invoice.id}/regenerate`).toPromise();
        this.invoice = invoice;
    }
}
