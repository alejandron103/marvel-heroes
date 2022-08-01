// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_API: 'https://gateway.marvel.com:443/v1/public/',
  API_KEY : '8f750505355890a01761cbe9d299b9ae',
  PRIVATE_KEY : 'd3cae9978a9d9634cd124daf6db3b3eef6eb0fb3',
  TIME_STAMP: new Date().getTime(),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
