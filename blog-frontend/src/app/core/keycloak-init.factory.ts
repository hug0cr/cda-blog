import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080' + '/auth',
        realm: 'cda-blog',
        clientId: 'frontend',
      },
      initOptions: {
        pkceMethod: 'S256',
        // must match to the configured value in keycloak
        redirectUri: 'http://localhost:4200',
        // this will solve the error
        checkLoginIframe: false
      }
    });
}
