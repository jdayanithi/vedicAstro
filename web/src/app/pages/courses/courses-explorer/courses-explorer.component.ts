import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService, CourseWithAccess } from '../../../service/course.service';
import { CategoryService, Category } from '../../../service/category.service';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseFormComponent } from '../purchase-form/purchase-form.component';

@Component({
  selector: 'app-courses-explorer',
  templateUrl: './courses-explorer.component.html',
  styleUrls: ['./courses-explorer.component.scss']
})
export class CoursesExplorerComponent implements OnInit {
  allCourses: CourseWithAccess[] = [];
  filteredCourses: CourseWithAccess[] = [];
  categories: Category[] = [];
  selectedCategory: number | null = null;
  selectedTab: 'all' | 'free' | 'paid' | 'my-courses' = 'all';
  loading = true;
  searchTerm = '';
  currentUserId: number | null = null;
  isLoggedIn = false;  constructor(
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}ngOnInit(): void {
    // Check authentication status first
    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        // Get current user ID from session
        const session = this.authService.getSession();
        this.currentUserId = session?.userId || session?.id || session?.loginId || null;
      } else {
        this.currentUserId = null;
      }
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    
    // Load categories
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.filter(cat => cat.isPublished);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    // Load courses based on selected tab
    this.loadCoursesForTab();
  }

  loadCoursesForTab(): void {
    let courseObservable;

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
    }    courseObservable.subscribe({
      next: (courses) => {
        this.allCourses = courses.filter(course => course.isPublished);
        
        this.filterCourses();
        this.loading = false;
      },
      error: (error) => {
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
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : 'Unknown';
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
    if (!this.isLoggedIn) {
      return course.isFree ? 'Start Course' : 'Purchase Course';
    }

    if (course.isEnrolled) {
      if (course.paymentStatus === 'pending') {
        return 'Payment Pending';
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
}
