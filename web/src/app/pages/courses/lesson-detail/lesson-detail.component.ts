import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { LessonService } from '../../../service/lesson.service';

interface LessonKeynote {
  keynoteId: number;
  lessonId: number;
  title: string;
  content: string;
  contentType?: string;
  orderSequence?: number;
  isImportant: boolean;
  hasVisualAid?: boolean;
  visualAidUrl?: string;
  relatedPlanet?: string;
  relatedZodiac?: string;
  createdAt: string;
  updatedAt: string;
}

interface Tag {
  tagId: number;
  tagName: string;
  tagCategory?: string;
  description?: string;
  createdByUserId?: number;
  statusFlag?: string;
  createdAt: string;
}

interface LessonDetail {
  lessonId: number;
  title: string;
  description: string;
  content: string;
  topicId: number;
  orderNumber: number;
  isFree: boolean;
  durationMinutes: number;
  videoUrl?: string;
  audioUrl?: string;
  documentUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  keynotes: LessonKeynote[];
  tags: Tag[];
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="lesson-detail-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
        <p>Loading lesson details...</p>
      </div>

      <!-- Lesson Content -->
      <div *ngIf="!loading && lessonDetail" class="lesson-content">
        <!-- Header Section -->
        <div class="lesson-header">
          <button mat-icon-button (click)="goBack()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="lesson-info">
            <div class="lesson-number">{{ lessonDetail.orderNumber }}</div>
            <div class="lesson-text">
              <h1 class="lesson-title">{{ lessonDetail.title }}</h1>
              <div class="lesson-meta">
                <span class="lesson-duration" *ngIf="lessonDetail.durationMinutes">
                  <mat-icon>schedule</mat-icon>
                  {{ lessonDetail.durationMinutes }} minutes
                </span>
                <span class="lesson-status" [class]="lessonDetail.isFree ? 'free' : 'premium'">
                  <mat-icon>{{ lessonDetail.isFree ? 'card_giftcard' : 'star' }}</mat-icon>
                  {{ lessonDetail.isFree ? 'Free Lesson' : 'Premium Lesson' }}
                </span>
              </div>
            </div>
          </div>
        </div>        <!-- Lesson Content -->
        <div class="lesson-content-main">
          <div class="lesson-description">
            <h3>Lesson Description</h3>
            <div class="description-content" [innerHTML]="lessonDetail.description"></div>
          </div>

          <div *ngIf="lessonDetail.content" class="lesson-main-content">
            <h3>Lesson Content</h3>
            <div class="content-body" [innerHTML]="lessonDetail.content"></div>
          </div>

          <!-- Key Insights Section -->
          <div *ngIf="lessonDetail.keynotes && lessonDetail.keynotes.length > 0" class="key-insights-section">
            <h3 class="insights-title">
              <mat-icon>lightbulb</mat-icon>
              Key Insights ({{ lessonDetail.keynotes.length }})
            </h3>
            <div class="keynotes-container">
              <div *ngFor="let keynote of getSortedKeynotes(); let i = index" class="keynote-card" [class.important]="keynote.isImportant">
                <div class="keynote-header">
                  <div class="keynote-number">{{ i + 1 }}</div>
                  <div class="keynote-info">
                    <h4 class="keynote-title">{{ keynote.title }}</h4>
                    <div class="keynote-badges">
                      <span *ngIf="keynote.isImportant" class="important-badge">
                        <mat-icon>priority_high</mat-icon>
                        Important
                      </span>
                      <span *ngIf="keynote.relatedPlanet" class="meta-badge planet">
                        <mat-icon>brightness_1</mat-icon>
                        {{ keynote.relatedPlanet }}
                      </span>
                      <span *ngIf="keynote.relatedZodiac" class="meta-badge zodiac">
                        <mat-icon>stars</mat-icon>
                        {{ keynote.relatedZodiac }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="keynote-content" [innerHTML]="keynote.content"></div>
                <div *ngIf="keynote.hasVisualAid && keynote.visualAidUrl" class="keynote-visual">
                  <img [src]="keynote.visualAidUrl" [alt]="keynote.title" class="visual-aid">
                </div>
              </div>
            </div>
          </div>

          <!-- Media Resources -->
          <div class="media-section" *ngIf="lessonDetail.videoUrl || lessonDetail.audioUrl || lessonDetail.documentUrl">
            <h3>Resources</h3>
            <div class="media-grid">
              <a *ngIf="lessonDetail.videoUrl" [href]="lessonDetail.videoUrl" target="_blank" class="media-card video">
                <mat-icon>play_circle_filled</mat-icon>
                <span>Watch Video</span>
                <small>Video content for this lesson</small>
              </a>
              <a *ngIf="lessonDetail.audioUrl" [href]="lessonDetail.audioUrl" target="_blank" class="media-card audio">
                <mat-icon>headphones</mat-icon>
                <span>Listen Audio</span>
                <small>Audio content for this lesson</small>
              </a>
              <a *ngIf="lessonDetail.documentUrl" [href]="lessonDetail.documentUrl" target="_blank" class="media-card document">
                <mat-icon>description</mat-icon>
                <span>View Document</span>
                <small>Additional reading material</small>
              </a>
            </div>
          </div>

          <!-- Tags Section -->
          <div *ngIf="lessonDetail.tags && lessonDetail.tags.length > 0" class="tags-section">
            <h3 class="tags-title">
              <mat-icon>local_offer</mat-icon>
              Tags ({{ lessonDetail.tags.length }})
            </h3>
            <div class="tags-container">
              <div class="tags-grid">
                <div *ngFor="let tag of lessonDetail.tags" class="tag-card">
                  <div class="tag-header">
                    <mat-icon>label</mat-icon>
                    <span class="tag-name">{{ tag.tagName }}</span>
                  </div>
                  <div *ngIf="tag.description" class="tag-description">{{ tag.description }}</div>
                  <div *ngIf="tag.tagCategory" class="tag-category">Category: {{ tag.tagCategory }}</div>
                </div>
              </div>
            </div>
          </div>        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="!loading && !lessonDetail" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h3>Lesson not found</h3>
        <p>The requested lesson could not be loaded.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          Go Back
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lesson-detail-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      text-align: center;
    }

    .loading-container p {
      margin-top: 20px;
      font-size: 1.1rem;
      color: #666;
    }

    .error-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ff5722;
      margin-bottom: 20px;
    }

    .lesson-content {
      max-width: 1200px;
      margin: 0 auto;
    }    /* Lesson Header */
    .lesson-header {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      overflow: hidden;
      animation: slideInFromTop 0.6s ease-out, headerPulse 2s ease-in-out 0.8s;
    }

    @keyframes slideInFromTop {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes headerPulse {
      0%, 100% {
        box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
      }
      50% {
        box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);
      }
    }.lesson-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .lesson-header::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, rgba(255,255,255,0.3), transparent);
      border-radius: 18px;
      pointer-events: none;
      opacity: 0;
      animation: highlight 2s ease-in-out 0.5s;
    }

    @keyframes highlight {
      0%, 100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }

    .back-button {
      color: white !important;
      background: rgba(255, 255, 255, 0.2);
      z-index: 2;
    }

    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .lesson-info {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
      z-index: 2;
    }

    .lesson-number {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .lesson-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 12px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .lesson-meta {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
    }

    .lesson-duration, .lesson-status {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.15);
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 500;
      backdrop-filter: blur(10px);
    }

    .lesson-status.free {
      background: rgba(76, 175, 80, 0.2);
    }

    .lesson-status.premium {
      background: rgba(255, 193, 7, 0.2);
    }

    /* Lesson Tabs */
    .lesson-tabs {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    ::ng-deep .lesson-tab-group .mat-mdc-tab-header {
      background: #f8f9ff;
      border-bottom: 2px solid #e0e7ff;
    }    /* Lesson Content Main */
    .lesson-content-main {
      padding: 30px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      animation: fadeInUp 0.8s ease-out 0.3s both;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Content Sections */
    .lesson-description, .lesson-main-content, .key-insights-section, .media-section, .tags-section {
      margin-bottom: 40px;
    }

    .lesson-description:last-child, 
    .lesson-main-content:last-child, 
    .key-insights-section:last-child, 
    .media-section:last-child, 
    .tags-section:last-child {
      margin-bottom: 0;
    }

    .lesson-description h3, 
    .lesson-main-content h3, 
    .insights-title, 
    .media-section h3, 
    .tags-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e0e7ff;
    }    .insights-title mat-icon, .tags-title mat-icon {
      color: #667eea;
      font-size: 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
    }

    .description-content, .content-body {
      background: #f8f9ff;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid #667eea;
      line-height: 1.6;
      color: #444;
    }

    /* Media Section */
    .media-section {
      margin-bottom: 30px;
    }

    .media-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .media-section h3::before {
      content: '';
      width: 4px;
      height: 24px;
      background: #4caf50;
      border-radius: 2px;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .media-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      background: white;
      border-radius: 12px;
      text-decoration: none;
      color: #333;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      text-align: center;
    }

    .media-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .media-card mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 12px;
    }

    .media-card.video {
      border-color: #ff4444;
    }

    .media-card.video mat-icon {
      color: #ff4444;
    }

    .media-card.audio {
      border-color: #9c27b0;
    }

    .media-card.audio mat-icon {
      color: #9c27b0;
    }

    .media-card.document {
      border-color: #2196f3;
    }

    .media-card.document mat-icon {
      color: #2196f3;
    }

    .media-card span {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .media-card small {
      font-size: 0.9rem;
      color: #666;
    }    /* Key Insights Section */
    .key-insights-section {
      background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #e0e7ff;
    }

    /* Keynotes Container */
    .keynotes-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .keynote-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid #e0e7ff;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .keynote-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .keynote-card.important {
      border-left-color: #ff6b6b;
      background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);
    }

    .keynote-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }

    .keynote-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .keynote-info {
      flex: 1;
    }

    .keynote-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
    }

    .keynote-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .important-badge, .meta-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .important-badge {
      background: #ffebee;
      color: #c62828;
    }

    .meta-badge.planet {
      background: #fff3e0;
      color: #ef6c00;
    }

    .meta-badge.zodiac {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .meta-badge mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .keynote-content {
      line-height: 1.6;
      color: #555;
      margin-bottom: 16px;
    }

    .keynote-visual {
      text-align: center;
    }

    .visual-aid {
      max-width: 100%;
      max-height: 300px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    /* Tags Tab */
    .tags-container h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .tags-container h3::before {
      content: '';
      width: 4px;
      height: 24px;
      background: #2196f3;
      border-radius: 2px;
    }    /* Tags Section */
    .tags-section {
      background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #f0e7d8;
    }

    .tags-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .tag-card {
      background: white;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #e0e7ff;
      transition: all 0.3s ease;
    }

    .tag-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-color: #667eea;
    }

    .tag-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .tag-header mat-icon {
      color: #667eea;
    }

    .tag-name {
      font-weight: 600;
      color: #333;
    }

    .tag-description {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .tag-category {
      font-size: 0.8rem;
      color: #888;
      font-style: italic;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .lesson-detail-container {
        padding: 10px;
      }

      .lesson-header {
        padding: 20px;
        flex-direction: column;
        text-align: center;
      }

      .lesson-info {
        flex-direction: column;
        gap: 12px;
      }

      .lesson-title {
        font-size: 1.8rem;
      }

      .lesson-meta {
        justify-content: center;
      }

      .tab-content {
        padding: 20px;
      }

      .media-grid {
        grid-template-columns: 1fr;
      }

      .keynote-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .tags-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LessonDetailComponent implements OnInit {
  lessonDetail: LessonDetail | null = null;
  loading = true;
  topicId: number | null = null;
  source: string | null = null;
  courseId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {}  ngOnInit(): void {
    console.log('LessonDetailComponent ngOnInit called');
    
    // Scroll to top immediately when component initializes
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const lessonId = this.route.snapshot.paramMap.get('id');
    console.log('Lesson ID from route:', lessonId);
    
    // Get query parameters for navigation context
    this.topicId = this.route.snapshot.queryParamMap.get('topicId') ? 
                   parseInt(this.route.snapshot.queryParamMap.get('topicId')!, 10) : null;
    this.source = this.route.snapshot.queryParamMap.get('source');
    this.courseId = this.route.snapshot.queryParamMap.get('courseId') ? 
                    parseInt(this.route.snapshot.queryParamMap.get('courseId')!, 10) : null;
    
    console.log('Topic ID from query params:', this.topicId);
    console.log('Source from query params:', this.source);
    console.log('Course ID from query params:', this.courseId);
    
    if (lessonId) {
      this.loadLessonDetails(parseInt(lessonId, 10));
    } else {
      console.log('No lesson ID found, setting loading to false');
      this.loading = false;
    }
  }  loadLessonDetails(lessonId: number): void {
    console.log('Loading lesson details for ID:', lessonId);
    this.lessonService.getLessonDetails(lessonId).subscribe({
      next: (lessonDetail: LessonDetail) => {
        console.log('Lesson details loaded successfully:', lessonDetail);
        this.lessonDetail = lessonDetail;
        this.loading = false;
        
        // Ensure page is at top after content loads
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 50);
      },
      error: (error: any) => {
        console.error('Error loading lesson details:', error);
        this.loading = false;
      }
    });
  }

  getSortedKeynotes(): LessonKeynote[] {
    if (!this.lessonDetail?.keynotes) return [];
    return this.lessonDetail.keynotes.sort((a, b) => {
      // Sort by orderSequence if available, otherwise by keynoteId
      if (a.orderSequence !== undefined && b.orderSequence !== undefined) {
        return a.orderSequence - b.orderSequence;
      }
      return a.keynoteId - b.keynoteId;
    });
  }
  goBack(): void {
    // Navigate back based on the source
    if (this.source === 'customer-course' && this.courseId) {
      // Navigate back to the customer course view
      this.router.navigate(['/customer-course', this.courseId]);
    } else if (this.source === 'topic-detail' && this.topicId) {
      // Navigate back to the topic detail view
      this.router.navigate(['/topic', this.topicId]);
    } else if (this.topicId) {
      // Fallback to topic detail if we have topicId
      this.router.navigate(['/topic', this.topicId]);
    } else if (this.lessonDetail?.topicId) {
      // Fallback to topic detail using lesson's topicId
      this.router.navigate(['/topic', this.lessonDetail.topicId]);
    } else {
      // Final fallback to courses
      this.router.navigate(['/courses']);
    }
  }
}
