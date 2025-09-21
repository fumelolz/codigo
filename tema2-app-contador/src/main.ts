import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(FormsModule)
  ]
})
  .catch((err) => console.error(err));
