import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PerformanceMonitorService } from '../services/performance-monitor.service';

export const performanceInterceptor: HttpInterceptorFn = (req, next) => {
  const performanceService = inject(PerformanceMonitorService);
  const startTime = performance.now();
  const requestKey = `${req.method} ${req.url}`;
  
  // Start measuring the request
  performanceService.startMeasure(requestKey, 'api', {
    method: req.method,
    url: req.url,
    headers: req.headers.keys()
  });

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          // Record the API metric
          performanceService.recordApiMetric(requestKey, duration, {
            method: req.method,
            url: req.url,
            status: event.status,
            statusText: event.statusText,
            responseSize: getResponseSize(event)
          });

          // End the measurement
          performanceService.endMeasure(requestKey, 'api', {
            status: event.status,
            responseSize: getResponseSize(event)
          });
        }
      },
      error: (error) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Record the failed API metric
        performanceService.recordApiMetric(`${requestKey} (ERROR)`, duration, {
          method: req.method,
          url: req.url,
          error: error.message || 'Unknown error',
          status: error.status || 0
        });

        // End the measurement
        performanceService.endMeasure(requestKey, 'api', {
          error: error.message,
          status: error.status
        });
      }
    })
  );
};

function getResponseSize(response: HttpResponse<any>): number {
  try {
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      return parseInt(contentLength, 10);
    }
    
    // Estimate size based on response body
    if (response.body) {
      return JSON.stringify(response.body).length;
    }
    
    return 0;
  } catch (error) {
    return 0;
  }
}
