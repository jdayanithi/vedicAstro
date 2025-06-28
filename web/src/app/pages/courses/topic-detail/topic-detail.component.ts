import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { TopicService, TopicDetail, LessonDetail, LessonKeynote, Tag } from '../../../service/topic.service';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="topic-detail-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
        <p>Loading topic details...</p>
      </div>

      <!-- Topic Content -->
      <div *ngIf="!loading && topicDetail" class="topic-content">
        <!-- Header Section -->
        <div class="topic-header">
          <button mat-icon-button (click)="goBack()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="topic-info">
            <div class="topic-number">{{ topicDetail.orderNumber }}</div>
            <div class="topic-text">
              <h1 class="topic-title">{{ topicDetail.title }}</h1>
              <p class="topic-description">{{ topicDetail.description }}</p>
            </div>
          </div>
        </div>

        <!-- Topic Stats -->
        <div class="topic-stats">
          <div class="stat-item">
            <mat-icon>menu_book</mat-icon>
            <span>{{ topicDetail.lessons.length }} Lessons</span>
          </div>
          <div class="stat-item">
            <mat-icon>schedule</mat-icon>
            <span>{{ getTotalDuration() }} min</span>
          </div>
          <div class="stat-item">
            <mat-icon>star</mat-icon>
            <span>{{ getFreeCount() }} Free</span>
          </div>
        </div>

        <!-- Lessons List -->
        <div class="lessons-container">
          <h2 class="lessons-title">Lessons</h2>          <div *ngFor="let lesson of topicDetail.lessons; let i = index" class="lesson-card">
            <div class="lesson-header">
              <div class="lesson-number">{{ lesson.orderNumber }}</div>
              <div class="lesson-info">
                <h3 class="lesson-title">{{ lesson.title }}</h3>
                <div class="lesson-meta">
                  <span class="lesson-duration" *ngIf="lesson.durationMinutes">
                    <mat-icon>schedule</mat-icon>
                    {{ lesson.durationMinutes }} min
                  </span>
                  <span class="lesson-status" [class]="lesson.isFree ? 'free' : 'premium'">
                    {{ lesson.isFree ? 'Free' : 'Premium' }}
                  </span>
                </div>
              </div>
              <div class="lesson-actions">
                <button mat-raised-button color="primary" (click)="navigateToLesson(lesson.lessonId, $event)" class="view-lesson-btn">
                  <mat-icon>visibility</mat-icon>
                  View
                </button>                <button mat-icon-button (click)="toggleLesson(i, $event)" class="expand-button" [class.expanded]="expandedLessons.has(i)" title="Toggle lesson preview">
                  <mat-icon>{{ expandedLessons.has(i) ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>
              </div>
            </div>

            <!-- Expanded Lesson Content -->
            <div *ngIf="expandedLessons.has(i)" class="lesson-content">
              <!-- Lesson Description -->
              <div class="lesson-description" [innerHTML]="lesson.description"></div>
              
              <!-- Lesson Content -->
              <div *ngIf="lesson.content" class="lesson-main-content">
                <h4 class="content-section-title">Lesson Content</h4>
                <div class="content-body" [innerHTML]="lesson.content"></div>
              </div>

              <!-- Media Links -->
              <div class="lesson-media" *ngIf="lesson.videoUrl || lesson.audioUrl || lesson.documentUrl">
                <h4 class="content-section-title">Resources</h4>
                <div class="media-links">
                  <a *ngIf="lesson.videoUrl" [href]="lesson.videoUrl" target="_blank" class="media-link video">
                    <mat-icon>play_circle_filled</mat-icon>
                    <span>Watch Video</span>
                  </a>
                  <a *ngIf="lesson.audioUrl" [href]="lesson.audioUrl" target="_blank" class="media-link audio">
                    <mat-icon>headphones</mat-icon>
                    <span>Listen Audio</span>
                  </a>
                  <a *ngIf="lesson.documentUrl" [href]="lesson.documentUrl" target="_blank" class="media-link document">
                    <mat-icon>description</mat-icon>
                    <span>View Document</span>
                  </a>
                </div>
              </div>

              <!-- Keynotes -->
              <div *ngIf="lesson.keynotes && lesson.keynotes.length > 0" class="keynotes-section">
                <h4 class="content-section-title">Key Insights</h4>
                <div class="keynotes-list">
                  <div *ngFor="let keynote of lesson.keynotes" class="keynote-item" [class.important]="keynote.isImportant">
                    <div class="keynote-header">
                      <h5 class="keynote-title">{{ keynote.title }}</h5>
                      <div class="keynote-meta" *ngIf="keynote.relatedPlanet || keynote.relatedZodiac">
                        <span *ngIf="keynote.relatedPlanet" class="meta-tag planet">{{ keynote.relatedPlanet }}</span>
                        <span *ngIf="keynote.relatedZodiac" class="meta-tag zodiac">{{ keynote.relatedZodiac }}</span>
                      </div>
                    </div>
                    <div class="keynote-content" [innerHTML]="keynote.content"></div>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div *ngIf="lesson.tags && lesson.tags.length > 0" class="tags-section">
                <h4 class="content-section-title">Tags</h4>
                <div class="tags-list">
                  <mat-chip-set>
                    <mat-chip *ngFor="let tag of lesson.tags" class="lesson-tag">
                      {{ tag.tagName }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="!loading && !topicDetail" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h3>Topic not found</h3>
        <p>The requested topic could not be loaded.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          Go Back
        </button>
      </div>
    </div>
  `,
  styles: [`
    .topic-detail-container {
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

    .topic-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Topic Header */
    .topic-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      overflow: hidden;
    }

    .topic-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .back-button {
      color: white !important;
      background: rgba(255, 255, 255, 0.2);
      z-index: 2;
    }

    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .topic-info {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
      z-index: 2;
    }

    .topic-number {
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

    .topic-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .topic-description {
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.9;
      line-height: 1.5;
    }

    /* Topic Stats */
    .topic-stats {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 30px;
      display: flex;
      gap: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-weight: 500;
    }

    .stat-item mat-icon {
      color: #667eea;
    }

    /* Lessons Container */
    .lessons-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .lessons-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      padding: 30px 30px 20px 30px;
      color: #333;
      border-bottom: 2px solid #f0f4ff;
    }

    /* Lesson Card */
    .lesson-card {
      border-bottom: 1px solid #f0f4ff;
    }

    .lesson-card:last-child {
      border-bottom: none;
    }    .lesson-header {
      display: flex;
      align-items: center;
      padding: 20px 30px;
      transition: all 0.3s ease;
      gap: 20px;
      border-radius: 8px;
      margin: 4px;
      position: relative;
      background: white;
      border: 1px solid #e0e0e0;
    }

    .lesson-header:hover {
      background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);    }

    .lesson-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }    .lesson-info {
      flex: 1;
    }    .lesson-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
      transition: color 0.2s ease;
    }

    .lesson-header:hover .lesson-title {
      color: #667eea;
    }    .lesson-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .view-lesson-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 8px 16px !important;
      border-radius: 20px !important;
      font-size: 0.9rem !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;
    }

    .view-lesson-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
    }

    .view-lesson-btn mat-icon {
      margin-right: 4px !important;
      font-size: 1.1rem !important;
    }    .expand-button {
      color: #666 !important;
      opacity: 0.7;
      transition: all 0.2s ease;
      background: rgba(102, 126, 234, 0.1) !important;
      border-radius: 50% !important;
    }

    .expand-button:hover {
      opacity: 1;
      background: rgba(102, 126, 234, 0.2) !important;
      color: #667eea !important;
      transform: scale(1.1);
    }

    .expand-button.expanded {
      background: rgba(102, 126, 234, 0.2) !important;
      color: #667eea !important;
    }

    .lesson-meta {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .lesson-duration {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.9rem;
    }

    .lesson-duration mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .lesson-status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .lesson-status.free {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .lesson-status.premium {
      background: #fff3e0;
      color: #ef6c00;
    }

    .expand-button {
      color: #666;
      transition: transform 0.3s ease;
    }

    .expand-button.expanded {
      transform: rotate(180deg);
    }

    /* Lesson Content */
    .lesson-content {
      padding: 0 30px 30px 90px;
      background: #f8f9ff;
    }

    .lesson-description {
      margin-bottom: 20px;
      line-height: 1.6;
      color: #666;
    }

    .content-section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      margin: 20px 0 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .content-section-title::before {
      content: '';
      width: 4px;
      height: 20px;
      background: #667eea;
      border-radius: 2px;
    }

    .lesson-main-content {
      margin-bottom: 20px;
    }

    .content-body {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      line-height: 1.6;
      color: #444;
    }

    /* Media Links */
    .lesson-media {
      margin-bottom: 20px;
    }

    .media-links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .media-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: white;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .media-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .media-link.video {
      border-color: #ff4444;
    }

    .media-link.video mat-icon {
      color: #ff4444;
    }

    .media-link.audio {
      border-color: #9c27b0;
    }

    .media-link.audio mat-icon {
      color: #9c27b0;
    }

    .media-link.document {
      border-color: #2196f3;
    }

    .media-link.document mat-icon {
      color: #2196f3;
    }

    /* Keynotes */
    .keynotes-section {
      margin-bottom: 20px;
    }

    .keynotes-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .keynote-item {
      background: white;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #e0e7ff;
      transition: border-color 0.3s ease;
    }

    .keynote-item.important {
      border-left-color: #ff6b6b;
      background: #fff8f8;
    }

    .keynote-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      gap: 12px;
    }

    .keynote-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      color: #333;
      flex: 1;
    }

    .keynote-meta {
      display: flex;
      gap: 8px;
    }

    .meta-tag {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .meta-tag.planet {
      background: #fff3e0;
      color: #ef6c00;
    }

    .meta-tag.zodiac {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .keynote-content {
      line-height: 1.5;
      color: #666;
    }

    /* Tags */
    .tags-section {
      margin-bottom: 20px;
    }

    .tags-list {
      margin-top: 8px;
    }

    .lesson-tag {
      background: #e3f2fd !important;
      color: #1976d2 !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .topic-detail-container {
        padding: 10px;
      }

      .topic-header {
        padding: 20px;
        flex-direction: column;
        text-align: center;
      }

      .topic-info {
        flex-direction: column;
        gap: 12px;
      }

      .topic-title {
        font-size: 2rem;
      }

      .topic-stats {
        flex-direction: column;
        gap: 16px;
      }

      .lesson-content {
        padding: 0 20px 20px 20px;
      }

      .media-links {
        flex-direction: column;
      }

      .keynote-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class TopicDetailComponent implements OnInit {
  topicDetail: TopicDetail | null = null;
  loading = true;
  expandedLessons = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.loadTopicDetails(parseInt(topicId, 10));
    } else {
      this.loading = false;
    }
  }
  loadTopicDetails(topicId: number): void {
    this.topicService.getTopicDetails(topicId).subscribe({
      next: (topicDetail: TopicDetail) => {
        this.topicDetail = topicDetail;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading topic details:', error);
        this.loading = false;
      }
    });
  }  toggleLesson(lessonIndex: number, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent triggering navigateToLesson
    }
    
    if (this.expandedLessons.has(lessonIndex)) {
      this.expandedLessons.delete(lessonIndex);
    } else {
      this.expandedLessons.add(lessonIndex);
    }
  }  navigateToLesson(lessonId: number, event: Event): void {
    console.log('Navigating to lesson with ID:', lessonId);
    event.stopPropagation(); // Prevent triggering toggleLesson
    this.router.navigate(['/lesson', lessonId], { 
      queryParams: { 
        topicId: this.topicDetail?.topicId,
        source: 'topic-detail'
      } 
    }).then((success) => {
      console.log('Navigation success:', success);
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  getTotalDuration(): number {
    if (!this.topicDetail) return 0;
    return this.topicDetail.lessons.reduce((total: number, lesson: LessonDetail) => total + (lesson.durationMinutes || 0), 0);
  }

  getFreeCount(): number {
    if (!this.topicDetail) return 0;
    return this.topicDetail.lessons.filter((lesson: LessonDetail) => lesson.isFree).length;
  }

  goBack(): void {
    this.router.navigate(['/customer-course', this.topicDetail?.courseId || '']);
  }
}
