import {Component, Input, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn?: boolean;

  constructor(private keycloak: KeycloakService, private router: Router) {
  }

  onLogout() {
    this.keycloak.logout('http://localhost:4200').then(r => {
      console.log(r);
    });
  }

  onClick() {
    console.log(`HeaderComponent : ${this.isLoggedIn}`)
  }

}
