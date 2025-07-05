import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, CourseWithAccess } from '../../../service/course.service';
import { AuthService } from '../../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

export interface Lesson {
  lessonId: number;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  isCompleted?: boolean;
}

export interface Topic {
  topicId: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseContent {
  course: CourseWithAccess;
  topics: Topic[];
  progress: {
    completedLessons: number;
    totalLessons: number;
    percentage: number;
  };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit, OnDestroy {
  courseId: number | null = null;
  courseContent: CourseContent | null = null;
  selectedTopic: Topic | null = null;
  selectedLesson: Lesson | null = null;
  loading = true;
  sidebarOpen = true;
  isMobile = false;
  private subscriptions: Subscription = new Subscription();
  private visibilityChangeHandler?: () => void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Setup page visibility listener
    this.setupPageVisibilityListener();
    
    // Check screen size
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());

    // Get course ID from route
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.courseId = +params['id'];
        if (this.courseId) {
          // Only load if page is visible
          if (!document.hidden) {
            this.loadCourseContent();
          }
        } else {
          this.router.navigate(['/courses']);
        }
      })
    );

    // Check authentication
    this.subscriptions.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and event listeners
    this.subscriptions.unsubscribe();
    
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }
  }

  private setupPageVisibilityListener(): void {
    this.visibilityChangeHandler = () => {
      if (!document.hidden && this.courseId) {
        // Page became visible and we have a course ID, load content if needed
        if (!this.courseContent) {
          this.loadCourseContent();
        }
      }
    };
    
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  private loadCourseContent(): void {
    // Don't load if page is not visible
    if (document.hidden) {
      console.log('Page is hidden, skipping course content load');
      return;
    }
    
    this.loading = true;
    
    // For now, we'll create mock data since the backend course content API might not be fully implemented
    // TODO: Replace with actual API call when backend is ready
    this.loadMockCourseContent();
  }

  private loadMockCourseContent(): void {
    if (!this.courseId) return;

    // Don't load if page is not visible
    if (document.hidden) {
      console.log('Page is hidden, skipping mock course content load');
      return;
    }

    // Get course details first
    this.courseService.getAllCoursesWithAccess().subscribe({
      next: (courses) => {
        const course = courses.find(c => c.courseId === this.courseId);
        if (!course) {
          this.snackBar.open('Course not found', 'Close', { duration: 3000 });
          this.router.navigate(['/courses']);
          return;
        }

        if (!course.hasAccess) {
          this.snackBar.open('You do not have access to this course', 'Close', { duration: 3000 });
          this.router.navigate(['/courses']);
          return;
        }

        // Create mock course content
        this.courseContent = {
          course: course,
          topics: this.generateMockTopics(),
          progress: {
            completedLessons: 3,
            totalLessons: 12,
            percentage: 25
          }
        };

        // Select first topic and lesson by default
        if (this.courseContent.topics.length > 0) {
          this.selectedTopic = this.courseContent.topics[0];
          if (this.selectedTopic.lessons.length > 0) {
            this.selectedLesson = this.selectedTopic.lessons[0];
          }
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.snackBar.open('Error loading course', 'Close', { duration: 3000 });
        this.router.navigate(['/courses']);
      }
    });
  }

  private generateMockTopics(): Topic[] {
    return [
      {
        topicId: 1,
        title: 'Introduction to Vedic Astrology',
        description: 'Learn the fundamentals of Vedic astrology',
        order: 1,
        lessons: [
          {
            lessonId: 1,
            title: 'What is Vedic Astrology?',
            content: 'Vedic astrology, also known as Jyotisha, is an ancient Indian system of astrology...',
            duration: 15,
            order: 1,
            isCompleted: true
          },
          {
            lessonId: 2,
            title: 'History and Origins',
            content: 'The origins of Vedic astrology can be traced back to the Vedic period...',
            duration: 20,
            order: 2,
            isCompleted: true
          },
          {
            lessonId: 3,
            title: 'Basic Principles',
            content: 'Vedic astrology is based on several fundamental principles...',
            duration: 25,
            order: 3,
            isCompleted: true
          }
        ]
      },
      {
        topicId: 2,
        title: 'The Zodiac Signs',
        description: 'Understanding the 12 zodiac signs in Vedic astrology',
        order: 2,
        lessons: [
          {
            lessonId: 4,
            title: 'Fire Signs: Aries, Leo, Sagittarius',
            content: 'Fire signs are associated with energy, passion, and leadership...',
            duration: 30,
            order: 1,
            isCompleted: false
          },
          {
            lessonId: 5,
            title: 'Earth Signs: Taurus, Virgo, Capricorn',
            content: 'Earth signs are practical, stable, and grounded...',
            duration: 30,
            order: 2,
            isCompleted: false
          },
          {
            lessonId: 6,
            title: 'Air Signs: Gemini, Libra, Aquarius',
            content: 'Air signs are intellectual, communicative, and social...',
            duration: 30,
            order: 3,
            isCompleted: false
          },
          {
            lessonId: 7,
            title: 'Water Signs: Cancer, Scorpio, Pisces',
            content: 'Water signs are emotional, intuitive, and empathetic...',
            duration: 30,
            order: 4,
            isCompleted: false
          }
        ]
      },
      {
        topicId: 3,
        title: 'Planetary Systems',
        description: 'Learn about the nine planets in Vedic astrology',
        order: 3,
        lessons: [
          {
            lessonId: 8,
            title: 'The Sun (Surya)',
            content: 'The Sun represents the soul, ego, and vitality...',
            duration: 25,
            order: 1,
            isCompleted: false
          },
          {
            lessonId: 9,
            title: 'The Moon (Chandra)',
            content: 'The Moon represents the mind, emotions, and mother...',
            duration: 25,
            order: 2,
            isCompleted: false
          },
          {
            lessonId: 10,
            title: 'Mars (Mangal)',
            content: 'Mars represents energy, courage, and siblings...',
            duration: 25,
            order: 3,
            isCompleted: false
          },
          {
            lessonId: 11,
            title: 'Mercury (Budh)',
            content: 'Mercury represents intelligence, communication, and business...',
            duration: 25,
            order: 4,
            isCompleted: false
          },
          {
            lessonId: 12,
            title: 'Jupiter (Guru)',
            content: 'Jupiter represents wisdom, knowledge, and spirituality...',
            duration: 25,
            order: 5,
            isCompleted: false
          }
        ]
      }
    ];
  }

  selectTopic(topic: Topic): void {
    this.selectedTopic = topic;
    if (topic.lessons.length > 0) {
      this.selectedLesson = topic.lessons[0];
    }
    
    // Close sidebar on mobile after selection
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  selectLesson(lesson: Lesson): void {
    this.selectedLesson = lesson;
    
    // Close sidebar on mobile after selection
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  markLessonComplete(): void {
    if (this.selectedLesson) {
      this.selectedLesson.isCompleted = true;
      this.updateProgress();
      this.snackBar.open('Lesson marked as complete!', 'Close', { duration: 2000 });
    }
  }

  private updateProgress(): void {
    if (!this.courseContent) return;
    
    const allLessons = this.courseContent.topics.flatMap(topic => topic.lessons);
    const completedLessons = allLessons.filter(lesson => lesson.isCompleted);
    
    this.courseContent.progress = {
      completedLessons: completedLessons.length,
      totalLessons: allLessons.length,
      percentage: Math.round((completedLessons.length / allLessons.length) * 100)
    };
  }

  goToNextLesson(): void {
    if (!this.selectedTopic || !this.selectedLesson) return;
    
    const currentLessonIndex = this.selectedTopic.lessons.findIndex(l => l.lessonId === this.selectedLesson!.lessonId);
    
    if (currentLessonIndex < this.selectedTopic.lessons.length - 1) {
      // Next lesson in same topic
      this.selectedLesson = this.selectedTopic.lessons[currentLessonIndex + 1];
    } else {
      // Next topic
      const currentTopicIndex = this.courseContent!.topics.findIndex(t => t.topicId === this.selectedTopic!.topicId);
      if (currentTopicIndex < this.courseContent!.topics.length - 1) {
        const nextTopic = this.courseContent!.topics[currentTopicIndex + 1];
        this.selectTopic(nextTopic);
      }
    }
  }

  goToPreviousLesson(): void {
    if (!this.selectedTopic || !this.selectedLesson) return;
    
    const currentLessonIndex = this.selectedTopic.lessons.findIndex(l => l.lessonId === this.selectedLesson!.lessonId);
    
    if (currentLessonIndex > 0) {
      // Previous lesson in same topic
      this.selectedLesson = this.selectedTopic.lessons[currentLessonIndex - 1];
    } else {
      // Previous topic
      const currentTopicIndex = this.courseContent!.topics.findIndex(t => t.topicId === this.selectedTopic!.topicId);
      if (currentTopicIndex > 0) {
        const prevTopic = this.courseContent!.topics[currentTopicIndex - 1];
        this.selectedTopic = prevTopic;
        this.selectedLesson = prevTopic.lessons[prevTopic.lessons.length - 1];
      }
    }
  }

  goBackToCourses(): void {
    this.router.navigate(['/courses']);
  }
}

