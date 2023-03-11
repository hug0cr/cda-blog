import {Component, Input} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-blogger-information',
  templateUrl: './blogger-information.component.html',
  styleUrls: ['./blogger-information.component.scss']
})
export class BloggerInformationComponent {
  @Input() keycloakProfile?: KeycloakProfile;
}
