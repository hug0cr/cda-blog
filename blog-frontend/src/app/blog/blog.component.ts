import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  isLoggedIn$: Promise<boolean> = this.keycloakService.isLoggedIn();
  keycloakProfile$: Promise<KeycloakProfile | null> = this.keycloakService.loadUserProfile()
    .catch(reason => {
      console.log(reason)
      return null;
    });

  constructor(private keycloakService: KeycloakService) {
  }

}
