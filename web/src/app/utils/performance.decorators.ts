import { PerformanceMonitorService } from '../services/performance-monitor.service';

/**
 * Decorator to automatically measure method performance
 */
export function MeasurePerformance(name?: string, type: 'component' | 'api' | 'custom' = 'custom') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const measureName = name || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = function (...args: any[]) {
      // Try to get performance service from component instance
      const perfService: PerformanceMonitorService = 
        (this as any).performanceMonitor || 
        (this as any).perfService ||
        ((this as any).injector && (this as any).injector.get(PerformanceMonitorService));

      if (perfService) {
        perfService.startMeasure(measureName, type);

        try {
          const result = originalMethod.apply(this, args);

          if (result && typeof result.then === 'function') {
            // Handle async methods (Promises)
            return result
              .then((res: any) => {
                perfService.endMeasure(measureName, type);
                return res;
              })
              .catch((error: any) => {
                perfService.endMeasure(measureName, type, { error: true });
                throw error;
              });
          } else {
            perfService.endMeasure(measureName, type);
            return result;
          }
        } catch (error) {
          perfService.endMeasure(measureName, type, { error: true });
          throw error;
        }
      } else {
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}

/**
 * Decorator specifically for component lifecycle methods
 */
export function MeasureLifecycle(componentName?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const name = componentName || target.constructor.name;
    return MeasurePerformance(`${name}.${propertyKey}`, 'component')(target, propertyKey, descriptor);
  };
}

/**
 * Class decorator to automatically measure all public methods
 */
export function MonitorPerformance(componentName?: string) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    const name = componentName || constructor.name;
    
    // Get all method names from prototype
    const methodNames = Object.getOwnPropertyNames(constructor.prototype)
      .filter(prop => {
        return typeof constructor.prototype[prop] === 'function' && 
               prop !== 'constructor' &&
               !prop.startsWith('_') && // Skip private methods
               !prop.startsWith('ng'); // Skip Angular lifecycle methods (we'll handle them separately)
      });

    // Wrap each method with performance monitoring
    methodNames.forEach(methodName => {
      const originalMethod = constructor.prototype[methodName];
      
      constructor.prototype[methodName] = function (...args: any[]) {
        const perfService: PerformanceMonitorService = 
          (this as any).performanceMonitor || 
          (this as any).perfService ||
          ((this as any).injector && (this as any).injector.get(PerformanceMonitorService));

        if (perfService) {
          const measureName = `${name}.${methodName}`;
          perfService.startMeasure(measureName, 'component');

          try {
            const result = originalMethod.apply(this, args);

            if (result && typeof result.then === 'function') {
              return result
                .then((res: any) => {
                  perfService.endMeasure(measureName, 'component');
                  return res;
                })
                .catch((error: any) => {
                  perfService.endMeasure(measureName, 'component', { error: true });
                  throw error;
                });
            } else {
              perfService.endMeasure(measureName, 'component');
              return result;
            }
          } catch (error) {
            perfService.endMeasure(measureName, 'component', { error: true });
            throw error;
          }
        } else {
          return originalMethod.apply(this, args);
        }
      };
    });

    return constructor;
  };
}
