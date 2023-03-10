import {Component, Input} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {BloggerService} from "../../data/model/blogger.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn?: boolean;
  @Input() keycloakProfile?: KeycloakProfile | null;

  constructor(private keycloakService: KeycloakService,
              private bloggerService: BloggerService) {
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

  onClick() {
    this.bloggerService.getBloggerById('6bf22cb9-7446-4ce6-b8a7-7c44ed354196')
  }

}
