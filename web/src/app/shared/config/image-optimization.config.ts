import { InjectionToken } from '@angular/core';

export interface ImageOptimizationConfig {
  defaultQuality: number;
  maxWidth: number;
  maxHeight: number;
  enableWebP: boolean;
  enableLazyLoading: boolean;
  responsiveBreakpoints: number[];
  placeholderQuality: number;
  cacheEnabled: boolean;
  cacheDuration: number; // in minutes
}

export const DEFAULT_IMAGE_OPTIMIZATION_CONFIG: ImageOptimizationConfig = {
  defaultQuality: 80,
  maxWidth: 1920,
  maxHeight: 1080,
  enableWebP: true,
  enableLazyLoading: true,
  responsiveBreakpoints: [320, 640, 768, 1024, 1366, 1920],
  placeholderQuality: 20,
  cacheEnabled: true,
  cacheDuration: 60 // 1 hour
};

export const IMAGE_OPTIMIZATION_CONFIG = new InjectionToken<ImageOptimizationConfig>(
  'IMAGE_OPTIMIZATION_CONFIG'
);
