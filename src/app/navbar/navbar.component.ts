import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/authservice';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

}
