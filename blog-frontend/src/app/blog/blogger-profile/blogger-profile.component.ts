import { Component } from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-blogger-profile',
  templateUrl: './blogger-profile.component.html',
  styleUrls: ['./blogger-profile.component.scss']
})
export class BloggerProfileComponent {
  isLoggedIn$: Promise<boolean> = this.keycloakService.isLoggedIn();
  keycloakProfile$: Promise<KeycloakProfile | null> = this.keycloakService.loadUserProfile()
    .catch(reason => {
      console.log(reason)
      return null;
    });

  constructor(private keycloakService: KeycloakService) {
  }

}
