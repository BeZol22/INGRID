import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localeHu, 'hu');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
