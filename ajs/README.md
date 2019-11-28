## Ajs

### init Ajs
> npm install -g @angular/cli

> ng new ajs

> cd ajs

> ng serve

(http://localhost:4200/)

### Install Angular Material (https://material.angular.io/guide/getting-started)
> ng add @angular/material

"@angular/cdk": "~8.2.3",
"@angular/material": "^8.2.3",
"hammerjs": "^2.0.8"

### Parse, validate, manipulate, and display dates and times in JavaScript.
> npm install moment --save

### The internationalization (i18n) library for Angular. (https://github.com/ngx-translate/core)
###### app.module.ts -> TranslateModule.forRoot
> npm install @ngx-translate/core --save
> npm install @ngx-translate/http-loader --save

### Use gmap
> index.html -> <script src="https://maps.googleapis.com/maps/api/js?key={googleAPIKey}" type="text/javascript"></script>

### Package contains type definitions for Google Maps JavaScript API. (https://developers.google.com/maps/)
###### tsconfig.app.json -> "types": ["googlemaps"]
> npm install --save @types/googlemaps
