import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routingModule } from './app.routing.module';
import { TrackersComponent } from './trackers/trackers.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InvoicesComponent } from './invoices/invoices.component';
import { TrackerComponent } from './tracker/tracker.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owner/owner.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RatesComponent } from './rates/rates.component';
import { ZoneComponent } from './zone/zone.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    TrackersComponent,
    InvoiceComponent,
    InvoicesComponent,
    TrackerComponent,
    OwnersComponent,
    OwnerComponent,
    VehiclesComponent,
    VehicleComponent,
    LoginComponent,
    HomeComponent,
    RatesComponent,
    ZoneComponent,

  ],
  imports: [
    routingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    CurrencyMaskModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent, SidebarComponent, NavbarComponent]
})
export class AppModule { }
