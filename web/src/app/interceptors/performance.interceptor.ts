import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { PerformanceMonitorService } from '../services/performance-monitor.service';

@Injectable()
export class PerformanceInterceptor implements HttpInterceptor {
  constructor(private performanceMonitor: PerformanceMonitorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const measureName = `API: ${req.method} ${this.getUrlPath(req.url)}`;
    const startTime = Date.now();
    
    this.performanceMonitor.startMeasure(measureName, 'api', {
      method: req.method,
      url: req.url,
      headers: req.headers.keys(),
      requestSize: this.getRequestSize(req)
    });

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.performanceMonitor.endMeasure(measureName, 'api', {
              method: req.method,
              url: req.url,
              status: event.status,
              success: true,
              responseSize: this.getResponseSize(event),
              statusText: event.statusText
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.performanceMonitor.endMeasure(measureName, 'api', {
            method: req.method,
            url: req.url,
            status: error.status,
            success: false,
            error: error.message,
            errorName: error.name
          });
        }
      })
    );
  }

  private getResponseSize(response: HttpResponse<any>): number {
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      return parseInt(contentLength, 10);
    }
    
    // Estimate size if content-length is not available
    try {
      const bodyString = JSON.stringify(response.body);
      return new Blob([bodyString]).size;
    } catch {
      return 0;
    }
  }

  private getRequestSize(request: HttpRequest<any>): number {
    try {
      if (request.body) {
        const bodyString = typeof request.body === 'string' 
          ? request.body 
          : JSON.stringify(request.body);
        return new Blob([bodyString]).size;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  private getUrlPath(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      // If it's a relative URL
      return url.split('?')[0];
    }
  }
}
