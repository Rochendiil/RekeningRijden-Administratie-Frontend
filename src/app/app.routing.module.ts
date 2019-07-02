import { Routes, RouterModule } from '@angular/router';
import { TrackersComponent } from './trackers/trackers.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { TrackerComponent } from './tracker/tracker.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owner/owner.component';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicle/vehicle.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RatesComponent } from './rates/rates.component';
import { ZoneComponent } from './zone/zone.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate:[AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'trackers',    component: TrackersComponent, canActivate:[AuthGuard]},
    { path: 'tracker/:id', component: TrackerComponent, canActivate:[AuthGuard] },
    { path: 'invoices',    component: InvoicesComponent, canActivate:[AuthGuard]},
    { path: 'invoice/:id', component: InvoiceComponent, canActivate:[AuthGuard] },
    { path: 'owners',      component: OwnersComponent, canActivate:[AuthGuard]  },
    { path: 'owner/:id',   component: OwnerComponent, canActivate:[AuthGuard]   },
    { path: 'vehicles',    component: VehiclesComponent, canActivate:[AuthGuard]},
    { path: 'vehicle/:id', component: VehicleComponent, canActivate:[AuthGuard] },
    { path: 'rates',    component: RatesComponent, canActivate:[AuthGuard]},
    { path: 'zone/:id',    component: ZoneComponent, canActivate:[AuthGuard]},
    { path: '**', redirectTo: '/', canActivate:[AuthGuard] }
];

export const routingModule = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: "reload" });
