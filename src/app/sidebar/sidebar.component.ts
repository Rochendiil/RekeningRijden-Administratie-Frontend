import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/authservice';
import { Alert } from 'selenium-webdriver';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit
{
    //public logoutbool: boolean;
    items: { title: string, route: string }[] = [
        { title: "Home", route: '/' },
        { title: "Trackers", route: '/trackers' },
        { title: "Invoices", route: '/invoices' },
        { title: "Owners", route: '/owners' },
        { title: "Vehicles", route: '/vehicles' },
        { title: "Region rates", route: '/rates'}
    ];

    constructor(private AuthService: AuthService) {
    
    }

    get logoutbool(): boolean {
        return !!this.AuthService.currentUserValue;
    }

    ngOnInit() { 
    }

    logout(){
        if(confirm("Are you sure you want to logout?")) {
            this.AuthService.logout();
        }
    }
}
