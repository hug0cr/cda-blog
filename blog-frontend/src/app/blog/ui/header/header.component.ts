import {Component, Input} from '@angular/core';
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
  @Input() keycloakProfile?: KeycloakProfile | null;

  constructor(private keycloakService: KeycloakService, private router: Router) {
  }

  onSignUp() {
    this.keycloakService.register({
      action: 'register',
      redirectUri: 'http://localhost:4200'
    }).then(r => {
      console.log(r);
    });
  }

  onSignIn() {
    this.keycloakService.login()
  }

  onLogout() {
    this.keycloakService.logout('http://localhost:4200').then(r => {
      console.log(r);
    });
  }

}
