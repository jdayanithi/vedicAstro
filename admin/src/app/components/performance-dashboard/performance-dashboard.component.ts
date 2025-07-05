import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceMonitorService, PerformanceMetric, PerformanceStats } from '../../services/performance-monitor.service';
import { Subscription, interval } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-dashboard.component.html',
  styleUrls: ['./performance-dashboard.component.scss']
})
export class PerformanceDashboardComponent implements OnInit, OnDestroy {
  stats: PerformanceStats = {
    totalMeasurements: 0,
    averageDuration: 0,
    slowestOperation: null,
    fastestOperation: null,
    recentMetrics: []
  };

  recentMetrics: PerformanceMetric[] = [];
  memoryStats: any = null;
  isVisible = false;
  
  private metricsSubscription?: Subscription;
  private memoryUpdateSubscription?: Subscription;

  // Chart data for metrics by type
  chartData: { [key: string]: number } = {
    navigation: 0,
    component: 0,
    api: 0,
    custom: 0
  };

  constructor(private performanceService: PerformanceMonitorService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeToMetrics();
    this.startMemoryMonitoring();
  }

  ngOnDestroy(): void {
    this.metricsSubscription?.unsubscribe();
    this.memoryUpdateSubscription?.unsubscribe();
  }

  private subscribeToMetrics(): void {
    this.metricsSubscription = this.performanceService.getMetrics().subscribe(metrics => {
      this.stats = this.performanceService.getStats();
      this.recentMetrics = metrics.slice(-20); // Show last 20 metrics
      this.updateChartData(metrics);
    });
  }

  private startMemoryMonitoring(): void {
    // Update memory stats every 5 seconds
    this.memoryUpdateSubscription = interval(5000).subscribe(() => {
      this.memoryStats = this.performanceService.getMemoryStats();
    });
    
    // Initial update
    this.memoryStats = this.performanceService.getMemoryStats();
  }

  private updateChartData(metrics: PerformanceMetric[]): void {
    // Reset chart data
    this.chartData = {
      navigation: 0,
      component: 0,
      api: 0,
      custom: 0
    };

    // Count metrics by type
    metrics.forEach(metric => {
      this.chartData[metric.type]++;
    });
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  clearMetrics(): void {
    this.performanceService.clearMetrics();
  }

  getMetricTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      navigation: '#4CAF50',
      component: '#2196F3',
      api: '#FF9800',
      custom: '#9C27B0'
    };
    return colors[type] || '#757575';
  }

  getPerformanceRating(duration: number): string {
    if (duration < 50) return 'excellent';
    if (duration < 100) return 'good';
    if (duration < 500) return 'moderate';
    return 'poor';
  }

  getPerformanceIcon(duration: number): string {
    if (duration < 50) return 'ðŸŸ¢';
    if (duration < 100) return 'ðŸŸ¡';
    if (duration < 500) return 'ðŸŸ ';
    return 'ðŸ”´';
  }

  formatMemorySize(bytes: number): string {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  getMemoryUsagePercentage(): number {
    if (!this.memoryStats || !this.memoryStats.totalJSHeapSize) {
      return 0;
    }
    return (this.memoryStats.usedJSHeapSize / this.memoryStats.totalJSHeapSize) * 100;
  }

  exportMetrics(): void {
    const data = {
      stats: this.stats,
      recentMetrics: this.recentMetrics,
      memoryStats: this.memoryStats,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-metrics-${Date.now()}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  trackByMetric(index: number, metric: PerformanceMetric): string {
    return `${metric.name}-${metric.timestamp}`;
  }
}

