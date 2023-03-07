import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  isLoggedIn$: Promise<boolean> = this.keycloakService.isLoggedIn();

  constructor(private keycloakService: KeycloakService) {
  }

  onLogin() {
    this.keycloakService.login()
  }
}
