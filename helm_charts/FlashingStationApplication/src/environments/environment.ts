// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  settings: {
      //backend: 'localhost:4200',//'http://localhost:5000/api',
      //backendId: 'flashingstation',//'lpad_bff',
      keycloakUrl: 'https://keycloak-sso-test-1.kid.main.conti.de/auth',
      checkLoginIframe: true,
      realm: 'default',
      clientId:'flashingstation', 
      claim: 'ClaimTest'
      //translationUrl: 'TranslationsTest',//'http://localhost:5000/api/translations'
  },
  about: {
      apptitle: 'Flashing Station',
      version: 'v1.0.0',
      deploytime: 'noinfo',
      environment: 'development',
      by: 'Edge2Cloud-Team'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
