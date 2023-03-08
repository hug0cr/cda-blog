import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080' + '/auth',
        realm: 'cda-blog',
        clientId: 'frontend',
      },
      // loadUserProfileAtStartUp: true,
      initOptions: {
        pkceMethod: 'S256',
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        redirectUri: 'http://localhost:4200',
        // this will solve the error
        // checkLoginIframe: false
      }
    });
}
