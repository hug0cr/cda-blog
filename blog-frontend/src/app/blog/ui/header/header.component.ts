import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated?: boolean;
  kcProfile?: KeycloakProfile;

  constructor(private keycloak: KeycloakService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn().then(() => {
      if (this.isAuthenticated) this.getProfil();
    });
  }

  async onLogin() {
    await this.keycloak.login({
      redirectUri: window.location.origin + this.router.url,
    });
  }

  onLogout() {
    this.keycloak.logout('http://localhost:4200').then(r => {
      console.log(r);
    });
  }

  async isLoggedIn(): Promise<void> {
    this.keycloak.isLoggedIn().then(value => this.isAuthenticated = value);
  }

  getProfil() {
    this.keycloak.loadUserProfile().then(value => {
      this.kcProfile = value;
    });
  }

}
