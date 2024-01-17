import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {

  
    providers: [
    provideRouter(routes), provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())),
    provideAnimations()
]
};
