// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:9999/api/v1',
  },
  auth : {
    authUrl: 'http://localhost:9999/api/v1'
  },
  googleAPIKey: 'AIzaSyANV1UHEvYVT9hiG4omF8n6QGmxMx-LmIs || AIzaSyBNg_O4VHVbCB9tUs4w5wX90yuvWyOpAA4',
  defaultLang: 'en'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
