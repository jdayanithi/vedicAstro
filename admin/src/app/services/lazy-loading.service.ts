import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface LazyModule {
  route: string;
  loadChildren: () => Promise<any>;
  preload?: boolean;
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingService {
  private preloadedModules = new Set<string>();
  private loadingModules = new Map<string, Promise<any>>();
  
  // Configuration for lazy modules with preloading priorities
  private readonly lazyModules: LazyModule[] = [
    {
      route: 'auth',
      loadChildren: () => import('../pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
      preload: true,
      priority: 10
    },
    {
      route: 'dashboard',
      loadChildren: () => import('../pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      preload: true,
      priority: 9
    },
    {
      route: 'users',
      loadChildren: () => import('../pages/users/users.routes').then(m => m.USERS_ROUTES),
      preload: true,
      priority: 8
    },
    {
      route: 'courses',
      loadChildren: () => import('../pages/courses/courses.routes').then(m => m.COURSES_ROUTES),
      preload: true,
      priority: 7
    },
    {
      route: 'categories',
      loadChildren: () => import('../pages/categories/categories.routes').then(m => m.CATEGORY_ROUTES),
      preload: false,
      priority: 6
    },
    {
      route: 'topics',
      loadChildren: () => import('../pages/topics/topics.routes').then(m => m.TOPICS_ROUTES),
      preload: false,
      priority: 5
    },
    {
      route: 'lessons',
      loadChildren: () => import('../pages/lessons/lessons.routes').then(m => m.LESSONS_ROUTES),
      preload: false,
      priority: 4
    },
    {
      route: 'keynotes',
      loadChildren: () => import('../pages/keynotes/keynotes.routes').then(m => m.KEYNOTES_ROUTES),
      preload: false,
      priority: 3
    },
    {
      route: 'tags',
      loadChildren: () => import('../pages/tags/tags.routes').then(m => m.TAGS_ROUTES),
      preload: false,
      priority: 2
    },
    {
      route: 'notifications',
      loadChildren: () => import('../pages/notifications/notifications.routes').then(m => m.NOTIFICATIONS_ROUTES),
      preload: false,
      priority: 2
    },
    {
      route: 'payments',
      loadChildren: () => import('../pages/payments/payments.routes').then(m => m.PAYMENT_ROUTES),
      preload: false,
      priority: 1
    },
    {
      route: 'customers',
      loadChildren: () => import('../pages/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES),
      preload: false,
      priority: 1
    }
  ];

  constructor(private router: Router) {
    this.initializePreloading();
  }

  /**
   * Preload modules based on priority and user behavior
   */
  private async initializePreloading(): Promise<void> {
    // Wait for initial page load
    await this.waitForPageLoad();

    // Preload high-priority modules
    await this.preloadByPriority();

    // Setup intersection observer for route-based preloading
    this.setupRoutePreloading();

    // Setup idle time preloading
    this.setupIdlePreloading();
  }

  /**
   * Wait for page to be fully loaded before starting preloading
   */
  private waitForPageLoad(): Promise<void> {
    return new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });
  }

  /**
   * Preload modules by priority during idle time
   */
  private async preloadByPriority(): Promise<void> {
    const sortedModules = this.lazyModules
      .filter(module => module.preload)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));

    for (const module of sortedModules) {
      await this.preloadModule(module);
      // Add small delay to not block the main thread
      await this.delay(100);
    }
  }

  /**
   * Preload a specific module
   */
  private async preloadModule(module: LazyModule): Promise<void> {
    if (this.preloadedModules.has(module.route)) {
      return;
    }

    if (this.loadingModules.has(module.route)) {
      return this.loadingModules.get(module.route);
    }

    const loadPromise = this.loadModuleWithRetry(module);
    this.loadingModules.set(module.route, loadPromise);

    try {
      await loadPromise;
      this.preloadedModules.add(module.route);
      console.debug(`🚀 Preloaded admin module: ${module.route}`);
    } catch (error) {
      console.warn(`⚠️ Failed to preload admin module: ${module.route}`, error);
    } finally {
      this.loadingModules.delete(module.route);
    }
  }

  /**
   * Load module with retry logic
   */
  private async loadModuleWithRetry(module: LazyModule, maxRetries = 2): Promise<any> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await module.loadChildren();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxRetries) {
          // Exponential backoff
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Setup route-based preloading using intersection observer
   */
  private setupRoutePreloading(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const route = entry.target.getAttribute('data-preload-route');
            if (route) {
              this.preloadRouteModule(route);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    // Observe navigation elements
    setTimeout(() => {
      const navElements = document.querySelectorAll('[routerLink]');
      navElements.forEach(element => {
        const routerLink = element.getAttribute('routerLink');
        if (routerLink) {
          element.setAttribute('data-preload-route', routerLink);
          observer.observe(element);
        }
      });
    }, 1000);
  }

  /**
   * Setup idle time preloading
   */
  private setupIdlePreloading(): void {
    if ('requestIdleCallback' in window) {
      const preloadDuringIdle = () => {
        (window as any).requestIdleCallback(() => {
          this.preloadRemainingModules();
        });
      };

      // Preload after 5 seconds of idle time for admin (less aggressive)
      setTimeout(preloadDuringIdle, 5000);
    }
  }

  /**
   * Preload remaining modules that haven't been preloaded yet
   */
  private async preloadRemainingModules(): Promise<void> {
    const remainingModules = this.lazyModules.filter(
      module => !this.preloadedModules.has(module.route)
    );

    for (const module of remainingModules) {
      await this.preloadModule(module);
      await this.delay(500); // Longer delay for admin background preloading
    }
  }

  /**
   * Preload a specific route module
   */
  private preloadRouteModule(route: string): void {
    const cleanRoute = route.startsWith('/') ? route.substring(1) : route;
    const module = this.lazyModules.find(m => m.route === cleanRoute);
    
    if (module) {
      this.preloadModule(module);
    }
  }

  /**
   * Get preloading status
   */
  getPreloadingStatus(): {
    preloaded: string[];
    loading: string[];
    remaining: string[];
  } {
    return {
      preloaded: Array.from(this.preloadedModules),
      loading: Array.from(this.loadingModules.keys()),
      remaining: this.lazyModules
        .filter(m => !this.preloadedModules.has(m.route))
        .map(m => m.route)
    };
  }

  /**
   * Manually trigger preloading of a specific module
   */
  async preloadRoute(route: string): Promise<void> {
    const module = this.lazyModules.find(m => m.route === route);
    if (module) {
      await this.preloadModule(module);
    }
  }

  /**
   * Preload modules based on user role/permissions
   */
  async preloadForRole(userRole: string): Promise<void> {
    const roleBasedModules = this.getRoleBasedModules(userRole);
    
    for (const module of roleBasedModules) {
      await this.preloadModule(module);
      await this.delay(100);
    }
  }

  /**
   * Get modules to preload based on user role
   */
  private getRoleBasedModules(userRole: string): LazyModule[] {
    const roleModules: { [key: string]: string[] } = {
      'admin': ['dashboard', 'users', 'courses', 'categories', 'topics', 'lessons', 'keynotes', 'tags', 'notifications', 'payments', 'customers'],
      'instructor': ['dashboard', 'courses', 'topics', 'lessons', 'keynotes', 'tags'],
      'student': ['dashboard', 'courses']
    };

    const allowedRoutes = roleModules[userRole] || [];
    return this.lazyModules.filter(module => allowedRoutes.includes(module.route));
  }

  /**
   * Clear all preloaded modules (useful for memory management)
   */
  clearPreloadedModules(): void {
    this.preloadedModules.clear();
    this.loadingModules.clear();
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
