import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PerformanceMonitorService, PerformanceMetric, PerformanceStats } from '../../services/performance-monitor.service';

@Component({
  selector: 'app-performance-dashboard',
  templateUrl: './performance-dashboard.component.html',
  styleUrls: ['./performance-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  stats: PerformanceStats | null = null;
  metrics: PerformanceMetric[] = [];
  filteredMetrics: PerformanceMetric[] = [];
  selectedType: string = 'all';
  memoryStats: any = null;
  
  metricTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'component', label: 'Components' },
    { value: 'api', label: 'API Calls' },
    { value: 'custom', label: 'Custom' }
  ];

  constructor(
    private performanceMonitor: PerformanceMonitorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.performanceMonitor.getMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.metrics = metrics;
        this.updateStats();
        this.filterMetrics();
        this.updateMemoryStats();
        this.cdr.markForCheck();
      });

    // Update memory stats every 5 seconds
    setInterval(() => {
      this.updateMemoryStats();
      this.cdr.markForCheck();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTypeFilterChange(): void {
    this.filterMetrics();
  }

  clearMetrics(): void {
    this.performanceMonitor.clearMetrics();
  }

  exportMetrics(): void {
    const dataStr = JSON.stringify(this.metrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `performance-metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
  }

  getPerformanceColor(duration: number): string {
    if (duration > 500) return '#f44336'; // Red for critical
    if (duration > 100) return '#ff9800'; // Orange for slow
    return '#4caf50'; // Green for fast
  }

  formatDuration(duration: number): string {
    return `${duration.toFixed(2)}ms`;
  }

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  private updateStats(): void {
    this.stats = this.performanceMonitor.getStats();
  }

  private filterMetrics(): void {
    if (this.selectedType === 'all') {
      this.filteredMetrics = [...this.metrics].reverse(); // Show newest first
    } else {
      this.filteredMetrics = this.metrics
        .filter(metric => metric.type === this.selectedType)
        .reverse();
    }
  }

  private updateMemoryStats(): void {
    this.memoryStats = this.performanceMonitor.getMemoryStats();
  }

  trackByFn(index: number, item: PerformanceMetric): string {
    return `${item.name}-${item.timestamp}`;
  }

  getSlowOperations(): PerformanceMetric[] {
    return this.metrics
      .filter(metric => metric.duration > 100)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);
  }

  getApiMetrics(): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.type === 'api');
  }

  getAverageApiTime(): number {
    const apiMetrics = this.getApiMetrics();
    if (apiMetrics.length === 0) return 0;
    
    const totalTime = apiMetrics.reduce((sum, metric) => sum + metric.duration, 0);
    return totalTime / apiMetrics.length;
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
