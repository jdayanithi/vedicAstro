import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  
  private isProduction = environment.production;

  log(message: any, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.log(message, ...optionalParams);
    }
  }

  info(message: any, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.info(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.warn(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]): void {
    // Always log errors, even in production
    console.error(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.debug(message, ...optionalParams);
    }
  }

  group(groupTitle?: string): void {
    if (!this.isProduction) {
      console.group(groupTitle);
    }
  }

  groupEnd(): void {
    if (!this.isProduction) {
      console.groupEnd();
    }
  }

  table(data: any): void {
    if (!this.isProduction) {
      console.table(data);
    }
  }
}
