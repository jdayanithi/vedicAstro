import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../../service/course.service';
import { CategoryService, Category } from '../../../service/category.service';
import { PaymentService, UserCourseAccess, UserEnrolledCourse, EnrolledCourseWithStatus } from '../../../service/payment.service';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseFormComponent } from '../purchase-form/purchase-form.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-courses-explorer',
  templateUrl: './courses-explorer.component.html',
  styleUrls: ['./courses-explorer.component.scss']
})
export class CoursesExplorerComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: Category[] = [];
  userCourseAccess: UserCourseAccess[] = [];
  userEnrolledCourses: UserEnrolledCourse[] = [];
  userEnrolledCoursesWithStatus: EnrolledCourseWithStatus[] = [];
  selectedCategory: number | null = null;
  selectedTab: 'all' | 'free' | 'paid' | 'my-courses' = 'all';
  loading = true;
  searchTerm = '';
  currentUserId: number | null = null;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get current user ID from session
    const session = this.authService.getSession();
    this.currentUserId = session?.userId || session?.id || session?.loginId || null;
    this.loadData();
  }

  loadData(): void {
    // Create observables array
    const observables: any = {
      categories: this.categoryService.getAllCategories(),
      courses: this.courseService.getAllCourses()
    };    // Add user-specific data if user is logged in
    if (this.currentUserId) {
      observables.userAccess = this.paymentService.getUserCourseAccessListByLoginId(this.currentUserId);
      observables.enrolledCourses = this.paymentService.getUserEnrolledCoursesByLoginId(this.currentUserId);
      observables.enrolledCoursesWithStatus = this.paymentService.getUserEnrolledCoursesWithStatusByLoginId(this.currentUserId);
    } else {
      observables.userAccess = this.paymentService.getUserCourseAccess();
      observables.enrolledCourses = this.paymentService.getUserEnrolledCourses();
      observables.enrolledCoursesWithStatus = this.paymentService.getUserEnrolledCoursesWithStatus();
    }

    // Load all data in parallel
    forkJoin(observables).subscribe({
      next: (data: any) => {        this.categories = data.categories.filter((cat: any) => cat.isPublished);
        this.courses = data.courses.filter((course: any) => course.isPublished);
        this.userCourseAccess = data.userAccess || [];
        this.userEnrolledCourses = data.enrolledCourses || [];
        this.userEnrolledCoursesWithStatus = data.enrolledCoursesWithStatus || [];
        this.filterCourses();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.filter(cat => cat.isPublished);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses.filter(course => course.isPublished);
        this.filteredCourses = [...this.courses];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });
  }

  onCategoryChange(): void {
    this.filterCourses();
  }

  onTabChange(): void {
    this.filterCourses();
  }

  onSearchChange(): void {
    this.filterCourses();
  }

  filterCourses(): void {
    let filtered = [...this.courses];

    // Filter by tab selection
    if (this.selectedTab === 'free') {
      filtered = filtered.filter(course => !course.price || course.price === 0);
    } else if (this.selectedTab === 'paid') {
      // For paid courses, show ALL paid courses (not just those user has access to)
      filtered = filtered.filter(course => course.price && course.price > 0);    } else if (this.selectedTab === 'my-courses') {
      // For My Courses, show enrolled courses with all payment statuses (including pending)
      const enrolledCourseIds = this.userEnrolledCoursesWithStatus.map(course => course.courseId);
      filtered = filtered.filter(course => enrolledCourseIds.includes(course.courseId));
    }
    // For 'all' tab, show ALL published courses (no additional filtering)

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(course => course.categoryId === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredCourses = filtered;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : 'Unknown';
  }

  getDifficultyColor(level: string): string {
    switch (level?.toLowerCase()) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#9e9e9e';
    }
  }

  formatDuration(hours: number): string {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    } else if (hours < 24) {
      return `${hours} hr${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days} day${days !== 1 ? 's' : ''} ${remainingHours > 0 ? remainingHours + ' hr' : ''}`;
    }
  }

  trackByFn(index: number, course: Course): number {
    return course.courseId;
  }

  getFreeCourseCount(): number {
    return this.courses.filter(course => !course.price || course.price === 0).length;
  }

  getPaidCourseCount(): number {
    // For paid courses count, show ALL paid courses
    return this.courses.filter(course => course.price && course.price > 0).length;
  }
  getMyCourseCount(): number {
    return this.userEnrolledCoursesWithStatus.length;
  }

  // Get payment status for a specific course
  getCoursePaymentStatus(courseId: number): string | null {
    const enrolledCourse = this.userEnrolledCoursesWithStatus.find(course => course.courseId === courseId);
    return enrolledCourse ? enrolledCourse.paymentStatus : null;
  }

  // Check if course payment is pending
  isCoursePaymentPending(courseId: number): boolean {
    const status = this.getCoursePaymentStatus(courseId);
    return status === 'pending';
  }

  // Check if course payment is completed
  isCoursePaymentCompleted(courseId: number): boolean {
    const status = this.getCoursePaymentStatus(courseId);
    return status === 'completed';
  }

  hasAccessToCourse(courseId: number): boolean {
    const access = this.userCourseAccess.find(access => access.courseId === courseId);
    return access ? access.hasAccess : false;
  }

  getCourseAccessStatus(courseId: number): UserCourseAccess | null {
    return this.userCourseAccess.find(access => access.courseId === courseId) || null;
  }

  isCoursePurchased(courseId: number): boolean {
    const access = this.getCourseAccessStatus(courseId);
    return access ? access.hasAccess && access.paymentStatus === 'completed' : false;
  }

  enrollInCourse(course: Course): void {
    const isPaidCourse = course.price && course.price > 0;

    if (isPaidCourse) {
      const hasAccess = this.hasAccessToCourse(course.courseId);
      if (!hasAccess) {
        // Redirect to payment page or show payment dialog
        this.initiatePayment(course);
      } else {
        // User already has access, start the course
        this.startCourse(course);
      }
    } else {
      // Free course, directly start
      this.startCourse(course);
    }
  }
  private initiatePayment(course: Course): void {
    // Open purchase form dialog
    const dialogRef = this.dialog.open(PurchaseFormComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { course },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        // Payment submitted successfully
        alert(`Payment submitted successfully! Your course access will be activated once payment is verified.`);
        // Optionally reload data to refresh course access
        this.loadData();
      }
    });
  }

  private startCourse(course: Course): void {
    // TODO: Implement course start logic
    console.log('Starting course:', course.title);
    alert(`Starting course "${course.title}". Course content will be implemented soon!`);
  }
}
