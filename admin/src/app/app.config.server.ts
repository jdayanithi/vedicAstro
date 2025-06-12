import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideQuillConfig } from 'ngx-quill';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: false // Disable toolbar on server-side
      }
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
