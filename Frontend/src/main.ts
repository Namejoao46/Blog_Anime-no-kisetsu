import { bootstrapApplication } from '@angular/platform-browser';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));