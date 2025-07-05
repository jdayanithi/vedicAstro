import { PerformanceMonitorService } from '../services/performance-monitor.service';
import { inject } from '@angular/core';

/**
 * Decorator to measure method execution time
 */
export function TrackPerformance(metricName?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;
    const methodName = metricName || `${className}.${propertyKey}`;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      
      try {
        const result = originalMethod.apply(this, args);
        
        // Handle both sync and async methods
        if (result && typeof result.then === 'function') {
          return result.finally(() => {
            const endTime = performance.now();
            const performanceService = inject(PerformanceMonitorService);
            performanceService.recordCustomMetric(methodName, endTime - startTime);
          });
        } else {
          const endTime = performance.now();
          const performanceService = inject(PerformanceMonitorService);
          performanceService.recordCustomMetric(methodName, endTime - startTime);
          return result;
        }
      } catch (error) {
        const endTime = performance.now();
        const performanceService = inject(PerformanceMonitorService);
        performanceService.recordCustomMetric(methodName, endTime - startTime);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Decorator to measure Angular lifecycle hooks
 */
export function TrackLifecyclePerformance(hookName?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;
    const lifecycleName = hookName || `${className}.${propertyKey}`;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      
      try {
        const result = originalMethod.apply(this, args);
        
        if (result && typeof result.then === 'function') {
          return result.finally(() => {
            const endTime = performance.now();
            const performanceService = inject(PerformanceMonitorService);
            performanceService.recordComponentMetric(lifecycleName, endTime - startTime);
          });
        } else {
          const endTime = performance.now();
          const performanceService = inject(PerformanceMonitorService);
          performanceService.recordComponentMetric(lifecycleName, endTime - startTime);
          return result;
        }
      } catch (error) {
        const endTime = performance.now();
        const performanceService = inject(PerformanceMonitorService);
        performanceService.recordComponentMetric(lifecycleName, endTime - startTime);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Class decorator to automatically track all public methods
 */
export function TrackAllMethods(metricPrefix?: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const className = constructor.name;
    const prefix = metricPrefix || className;

    // Get all method names from prototype
    const methodNames = Object.getOwnPropertyNames(constructor.prototype)
      .filter(name => {
        return name !== 'constructor' && 
               typeof constructor.prototype[name] === 'function' &&
               !name.startsWith('_'); // Skip private methods
      });

    // Apply performance tracking to each method
    methodNames.forEach(methodName => {
      const originalMethod = constructor.prototype[methodName];
      const metricName = `${prefix}.${methodName}`;

      constructor.prototype[methodName] = function (...args: any[]) {
        const startTime = performance.now();
        
        try {
          const result = originalMethod.apply(this, args);
          
          if (result && typeof result.then === 'function') {
            return result.finally(() => {
              const endTime = performance.now();
              const performanceService = inject(PerformanceMonitorService);
              performanceService.recordCustomMetric(metricName, endTime - startTime);
            });
          } else {
            const endTime = performance.now();
            const performanceService = inject(PerformanceMonitorService);
            performanceService.recordCustomMetric(metricName, endTime - startTime);
            return result;
          }
        } catch (error) {
          const endTime = performance.now();
          const performanceService = inject(PerformanceMonitorService);
          performanceService.recordCustomMetric(metricName, endTime - startTime);
          throw error;
        }
      };
    });

    return constructor;
  };
}
