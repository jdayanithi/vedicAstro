import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService, CourseWithAccess, Course } from '../../../service/course.service';
import { CategoryService, Category } from '../../../service/category.service';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseFormComponent } from '../purchase-form/purchase-form.component';
import { map, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-explorer',
  templateUrl: './courses-explorer.component.html',
  styleUrls: ['./courses-explorer.component.scss']
})
export class CoursesExplorerComponent implements OnInit, OnDestroy {
  allCourses: CourseWithAccess[] = [];
  filteredCourses: CourseWithAccess[] = [];
  categories: Category[] = [];
  categoryMap: Map<number, string> = new Map(); // Cache for category names
  categoriesLoaded = false;
  selectedCategory: number | null = null;
  selectedTab: 'all' | 'free' | 'paid' | 'my-courses' = 'all';
  loading = true;
  searchTerm = '';
  currentUserId: number | null = null;
  isLoggedIn = false;
  private authSubscription?: Subscription;
  private visibilityChangeHandler?: () => void;  constructor(
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Setup page visibility listener
    this.setupPageVisibilityListener();
    
    // Load categories immediately when component initializes
    this.loadCategoriesIfNeeded();
    
    // Check authentication status first
    this.authSubscription = this.authService.isAuthenticated$.subscribe(async (isAuth: boolean) => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        // Get current user ID from session
        const session = await this.authService.getSession();
        this.currentUserId = session?.userId || session?.id || session?.loginId || null;
      } else {
        this.currentUserId = null;
      }
      
      // Only load data if page is visible
      if (!document.hidden) {
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and event listeners
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }
  }

  private setupPageVisibilityListener(): void {
    this.visibilityChangeHandler = () => {
      if (!document.hidden) {
        // Page became visible, load data if needed
        this.loadData();
      }
    };
    
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  loadData(): void {
    // Don't load data if page is not visible
    if (document.hidden) {
      console.log('Page is hidden, skipping course data load');
      return;
    }
    
    this.loading = true;
    
    // Don't load categories immediately - load them only when needed
    // this.categoryService.getAllCategories().subscribe({
    //   next: (categories) => {
    //     this.categories = categories.filter(cat => cat.isPublished);
    //   },
    //   error: (error) => {
    //     console.error('Error loading categories:', error);
    //   }
    // });

    // Load courses based on selected tab
    this.loadCoursesForTab();
  }

  // Lazy load categories only when needed
  private loadCategoriesIfNeeded(): void {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = true; // Set flag to prevent multiple calls
      this.categoryService.getAllCategories().subscribe({
        next: (categories) => {
          this.categories = categories.filter(cat => cat.isPublished);
          // Build category map for quick lookup
          this.categoryMap.clear();
          this.categories.forEach(cat => {
            this.categoryMap.set(cat.categoryId, cat.name);
          });
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.categoriesLoaded = false; // Reset flag on error
        }
      });
    }
  }

  // Load categories when user opens the category dropdown
  onCategoryDropdownOpen(): void {
    this.loadCategoriesIfNeeded();
  }

  loadCoursesForTab(): void {
    let courseObservable;

    if (this.isLoggedIn) {
      // For logged-in users, use "with-access" APIs to get enrollment/payment status
      switch (this.selectedTab) {
        case 'free':
          courseObservable = this.courseService.getFreeCoursesWithAccess();
          break;
        case 'paid':
          courseObservable = this.courseService.getPaidCoursesWithAccess();
          break;
        case 'my-courses':
          courseObservable = this.courseService.getMyCoursesWithAccess();
          break;
        default:
          courseObservable = this.courseService.getAllCoursesWithAccess();
      }
    } else {
      // For non-logged-in users, use public APIs (no access info needed)
      switch (this.selectedTab) {
        case 'free':
          // Filter free courses from all courses
          courseObservable = this.courseService.getAllCourses().pipe(
            map((courses: Course[]) => courses
              .filter(course => course.price === 0 || course.price === null)
              .map(course => this.mapCourseToWithAccess(course))
            )
          );
          break;
        case 'paid':
          // Filter paid courses from all courses
          courseObservable = this.courseService.getAllCourses().pipe(
            map((courses: Course[]) => courses
              .filter(course => course.price && course.price > 0)
              .map(course => this.mapCourseToWithAccess(course))
            )
          );
          break;
        case 'my-courses':
          // Non-logged-in users have no courses, return empty array
          courseObservable = of([]);
          break;
        default:
          // Get all courses and map to CourseWithAccess format
          courseObservable = this.courseService.getAllCourses().pipe(
            map((courses: Course[]) => courses.map(course => this.mapCourseToWithAccess(course)))
          );
      }
    }    courseObservable.subscribe({
      next: (courses: CourseWithAccess[]) => {
        this.allCourses = courses.filter(course => course.isPublished);
        
        this.filterCourses();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });}

  onCategoryChange(): void {
    this.filterCourses();
  }

  filterCourses(): void {
    let filtered = [...this.allCourses];
    
    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(course => course.categoryId === this.selectedCategory);
    }
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description?.toLowerCase().includes(searchLower) ||
        course.categoryName?.toLowerCase().includes(searchLower)
      );
    }

    this.filteredCourses = filtered;
  }

  onCategoryFilter(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.filterCourses();
  }  onTabChange(tab: 'all' | 'free' | 'paid' | 'my-courses'): void {
    this.selectedTab = tab;
    this.selectedCategory = null; // Reset category filter
    this.searchTerm = ''; // Reset search
    this.loading = true; // Show loading state
    this.loadCoursesForTab();
  }

  onSearchChange(): void {
    this.filterCourses();
  }

  getCategoryName(categoryId: number): string {
    // Use cached category map instead of loading categories every time
    return this.categoryMap.get(categoryId) || 'Unknown Category';
  }

  getDifficultyColor(level?: string): string {
    switch (level?.toLowerCase()) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#9e9e9e';
    }
  }

  formatDuration(hours?: number): string {
    if (!hours || hours < 1) {
      return hours ? `${Math.round(hours * 60)} min` : 'N/A';
    } else if (hours < 24) {
      return `${hours} hr${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days} day${days !== 1 ? 's' : ''} ${remainingHours > 0 ? remainingHours + ' hr' : ''}`;
    }
  }

  trackByFn(index: number, course: CourseWithAccess): number {
    return course.courseId;
  }

  get freeCoursesCount(): number {
    return this.allCourses.filter(course => course.isFree).length;
  }

  get paidCoursesCount(): number {
    return this.allCourses.filter(course => course.isPaid).length;
  }

  get myCoursesCount(): number {
    return this.allCourses.filter(course => course.isEnrolled).length;
  }

  getPaymentStatus(course: CourseWithAccess): string | null {
    return course.paymentStatus || null;
  }

  hasAccess(course: CourseWithAccess): boolean {
    return course.hasAccess || false;
  }

  canAccess(course: CourseWithAccess): boolean {
    return course.canAccess || false;
  }  enrollInCourse(course: CourseWithAccess): void {
    if (!this.isLoggedIn) {
      // Redirect to login page
      this.authService.redirectToLogin();
      return;
    }

    // If user is already enrolled and has access, start the course
    if (course.isEnrolled && course.hasAccess) {
      this.startCourse(course);
      return;
    }

    // If user is enrolled but payment is pending, do nothing (button should be disabled)
    if (course.isEnrolled && course.paymentStatus === 'pending') {
      return;
    }

    // If user is enrolled but doesn't have access, do nothing (button should be disabled)
    if (course.isEnrolled && !course.hasAccess) {
      return;
    }

    // For new enrollments
    if (course.isFree) {
      this.startCourse(course);
    } else {
      this.initiatePayment(course);
    }
  }

  getButtonText(course: CourseWithAccess): string {
    // Debug logging to identify the issue
    console.log('Course Debug Info:', {
      courseId: course.courseId,
      title: course.title,
      isLoggedIn: this.isLoggedIn,
      isEnrolled: course.isEnrolled,
      hasAccess: course.hasAccess,
      paymentStatus: course.paymentStatus,
      isFree: course.isFree,
      isPaid: course.isPaid
    });

    if (!this.isLoggedIn) {
      return course.isFree ? 'Start Course' : 'Purchase Course';
    }

    if (course.isEnrolled) {
      if (course.paymentStatus === 'pending') {
        return 'Payment Pending';
      } else if (course.paymentStatus === 'completed' && course.hasAccess) {
        return 'Continue Course';
      } else if (course.hasAccess) {
        return 'Continue Course';
      } else {
        return 'Access Denied';
      }
    } else {
      return course.isFree ? 'Start Course' : 'Purchase Course';
    }
  }
  getButtonColor(course: CourseWithAccess): string {
    if (!this.isLoggedIn) {
      return course.isFree ? 'primary' : 'accent';
    }

    if (course.isEnrolled) {
      if (course.paymentStatus === 'pending') {
        return 'warn';
      } else if (course.paymentStatus === 'completed' && course.hasAccess) {
        return 'primary';
      } else if (course.hasAccess) {
        return 'primary';
      } else {
        return 'basic';
      }
    } else {
      return course.isFree ? 'primary' : 'accent';
    }
  }

  getButtonClass(course: CourseWithAccess): string {
    if (!this.isLoggedIn) {
      return course.isFree ? 'start-course' : 'purchase-course';
    }

    if (course.isEnrolled) {
      if (course.paymentStatus === 'pending') {
        return 'pending-payment';
      } else if (course.hasAccess) {
        return 'continue-course';
      } else {
        return 'access-denied';
      }
    } else {
      return course.isFree ? 'start-course' : 'purchase-course';
    }
  }
  isButtonDisabled(course: CourseWithAccess): boolean {
    if (!this.isLoggedIn) {
      return false;
    }

    // If user is enrolled
    if (course.isEnrolled) {
      // Disable if payment is pending
      if (course.paymentStatus === 'pending') {
        return true;
      }
      // Enable if payment is completed and has access
      if (course.paymentStatus === 'completed' && course.hasAccess) {
        return false;
      }
      // Disable if no access (e.g., payment failed or access revoked)
      if (!course.hasAccess) {
        return true;
      }
      // Enable if has access (for "Continue Course")
      return false;
    }

    // For non-enrolled users, button is always enabled
    return false;
  }

  private initiatePayment(course: CourseWithAccess): void {
    const dialogRef = this.dialog.open(PurchaseFormComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { course },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        alert(`Payment submitted successfully! Your course access will be activated once payment is verified.`);
        this.loadCoursesForTab();
      }
    });
  }  private startCourse(course: CourseWithAccess): void {
    // Navigate to the customer course view to show topics and lessons
    this.router.navigate(['/customer-course', course.courseId]);
  }

  private mapCourseToWithAccess(course: Course): CourseWithAccess {
    return {
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      loginId: 0, // Not applicable for non-logged-in users
      categoryId: course.categoryId,
      categoryName: '', // Will be populated if needed
      difficultyLevel: course.difficultyLevel,
      price: course.price,
      durationHours: course.estimatedDuration,
      thumbnailUrl: course.thumbnailUrl,
      isPublished: course.isPublished,
      createdAt: new Date(),
      updatedAt: new Date(),
      
      // Course type flags
      isFree: !course.price || course.price === 0,
      isPaid: !!course.price && course.price > 0,
      
      // Access and enrollment info - defaults for non-logged-in users
      isEnrolled: false,
      hasAccess: !course.price || course.price === 0, // Free courses have access
      canAccess: !course.price || course.price === 0, // Free courses can be accessed
      
      // Payment details - not applicable for non-logged-in users
      paymentStatus: undefined,
      paymentDate: undefined,
      transactionId: undefined,
      paidAmount: undefined,
      paymentMethod: undefined,
      paymentProofUrl: undefined,
      expiryDate: undefined
    };
  }
}
