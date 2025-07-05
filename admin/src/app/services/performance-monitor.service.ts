import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  type: 'navigation' | 'component' | 'api' | 'custom';
  details?: any;
}

export interface PerformanceStats {
  totalMeasurements: number;
  averageDuration: number;
  slowestOperation: PerformanceMetric | null;
  fastestOperation: PerformanceMetric | null;
  recentMetrics: PerformanceMetric[];
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private metrics: PerformanceMetric[] = [];
  private activeMarks: Map<string, number> = new Map();
  private metricsSubject = new BehaviorSubject<PerformanceMetric[]>([]);
  
  // Thresholds for performance warnings
  private readonly SLOW_THRESHOLD = 100; // ms
  private readonly CRITICAL_THRESHOLD = 500; // ms
  private readonly MAX_METRICS = 1000; // Keep only last 1000 metrics

  constructor() {
    this.initializeNavigationMetrics();
  }

  /**
   * Start measuring performance for a specific operation
   */
  startMeasure(name: string, type: PerformanceMetric['type'] = 'custom', details?: any): void {
    const markName = `${name}-start`;
    performance.mark(markName);
    this.activeMarks.set(name, Date.now());
    
    console.debug(`🏁 Performance measure started: ${name}`, details);
  }

  /**
   * End measurement and record the metric
   */
  endMeasure(name: string, type: PerformanceMetric['type'] = 'custom', details?: any): number {
    const startTime = this.activeMarks.get(name);
    if (!startTime) {
      console.warn(`⚠️ No start mark found for: ${name}`);
      return 0;
    }

    const endMarkName = `${name}-end`;
    const measureName = `measure-${name}`;
    
    try {
      performance.mark(endMarkName);
      performance.measure(measureName, `${name}-start`, endMarkName);
      
      const measure = performance.getEntriesByName(measureName)[0];
      const duration = measure ? measure.duration : Date.now() - startTime;
      
      const metric: PerformanceMetric = {
        name,
        duration,
        timestamp: Date.now(),
        type,
        details
      };

      this.recordMetric(metric);
      this.activeMarks.delete(name);
      
      // Clean up performance entries
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(endMarkName);
      performance.clearMeasures(measureName);
      
      return duration;
    } catch (error) {
      console.error(`❌ Error measuring performance for ${name}:`, error);
      return 0;
    }
  }

  /**
   * Record a custom metric directly (for use with decorators)
   */
  recordCustomMetric(name: string, duration: number, details?: any): void {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      type: 'custom',
      details
    };
    this.recordMetric(metric);
  }

  /**
   * Record a component lifecycle metric
   */
  recordComponentMetric(name: string, duration: number, details?: any): void {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      type: 'component',
      details
    };
    this.recordMetric(metric);
  }

  /**
   * Record an API call metric
   */
  recordApiMetric(name: string, duration: number, details?: any): void {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      type: 'api',
      details
    };
    this.recordMetric(metric);
  }

  /**
   * Record a metric and emit to subscribers
   */
  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);
    
    // Keep only the most recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // Log performance warnings
    this.logPerformanceWarnings(metric);
    
    // Emit updated metrics
    this.metricsSubject.next([...this.metrics]);
  }

  /**
   * Log performance warnings based on thresholds
   */
  private logPerformanceWarnings(metric: PerformanceMetric): void {
    if (metric.duration > this.CRITICAL_THRESHOLD) {
      console.error(`🚨 CRITICAL: ${metric.name} took ${metric.duration.toFixed(2)}ms`, metric);
    } else if (metric.duration > this.SLOW_THRESHOLD) {
      console.warn(`⚠️ SLOW: ${metric.name} took ${metric.duration.toFixed(2)}ms`, metric);
    } else {
      console.debug(`✅ ${metric.name} completed in ${metric.duration.toFixed(2)}ms`);
    }
  }

  /**
   * Get observable stream of metrics
   */
  getMetrics(): Observable<PerformanceMetric[]> {
    return this.metricsSubject.asObservable();
  }

  /**
   * Get performance statistics
   */
  getStats(): PerformanceStats {
    if (this.metrics.length === 0) {
      return {
        totalMeasurements: 0,
        averageDuration: 0,
        slowestOperation: null,
        fastestOperation: null,
        recentMetrics: []
      };
    }

    const durations = this.metrics.map(m => m.duration);
    const averageDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
    
    const slowestOperation = this.metrics.reduce((slowest, current) => 
      current.duration > slowest.duration ? current : slowest
    );
    
    const fastestOperation = this.metrics.reduce((fastest, current) => 
      current.duration < fastest.duration ? current : fastest
    );

    return {
      totalMeasurements: this.metrics.length,
      averageDuration,
      slowestOperation,
      fastestOperation,
      recentMetrics: this.metrics.slice(-10)
    };
  }

  /**
   * Get metrics by type
   */
  getMetricsByType(type: PerformanceMetric['type']): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.type === type);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    this.metricsSubject.next([]);
    console.info('🧹 Performance metrics cleared');
  }

  /**
   * Initialize navigation performance metrics
   */
  private initializeNavigationMetrics(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Wait for page to fully load
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            // Record various navigation metrics
            this.recordMetric({
              name: 'DOM Content Loaded',
              duration: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              timestamp: Date.now(),
              type: 'navigation',
              details: { phase: 'domContentLoaded' }
            });

            this.recordMetric({
              name: 'Page Load Complete',
              duration: navigation.loadEventEnd - navigation.loadEventStart,
              timestamp: Date.now(),
              type: 'navigation',
              details: { phase: 'loadComplete' }
            });

            this.recordMetric({
              name: 'Total Navigation Time',
              duration: navigation.loadEventEnd - navigation.fetchStart,
              timestamp: Date.now(),
              type: 'navigation',
              details: { phase: 'totalNavigation' }
            });
          }
        }, 100);
      });
    }
  }

  /**
   * Get memory usage statistics
   */
  getMemoryStats(): any {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      };
    }
    return null;
  }
}
