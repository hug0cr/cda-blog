import { Injectable } from '@angular/core';
import {KeycloakProfile} from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  keycloakProfile?: KeycloakProfile;

}
