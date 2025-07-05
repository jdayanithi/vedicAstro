import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lesson-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],  template: `
    <div class="lesson-modal-wrapper">
      <div class="lesson-modal-header">
        <div class="header-left">
          <button mat-icon-button (click)="close()" class="back-button" title="Back">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h2 mat-dialog-title>
            <mat-icon>school</mat-icon>
            Lesson Details
          </h2>
        </div>
        <button mat-icon-button (click)="close()" class="close-button" title="Close">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content class="lesson-modal-content">
        <!-- Loading State -->
        <div *ngIf="loading" class="loading-container">
          <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
          <p>Loading lesson details...</p>
        </div>

        <!-- Lesson Content -->
        <div *ngIf="!loading && lessonDetail" class="lesson-content">
          <!-- Lesson Header -->
          <div class="lesson-header">
            <div class="lesson-number">{{ lessonDetail.orderNumber }}</div>
            <div class="lesson-info">
              <h3 class="lesson-title">{{ lessonDetail.title }}</h3>
              <div class="lesson-meta">
                <span class="lesson-duration" *ngIf="lessonDetail.durationMinutes">
                  <mat-icon>schedule</mat-icon>
                  {{ lessonDetail.durationMinutes }} minutes
                </span>
                <span class="lesson-status" [class]="lessonDetail.isFree ? 'free' : 'premium'">
                  <mat-icon>{{ lessonDetail.isFree ? 'card_giftcard' : 'star' }}</mat-icon>
                  {{ lessonDetail.isFree ? 'Free' : 'Premium' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Lesson Description -->
          <div class="lesson-description">
            <h4>Description</h4>
            <div class="description-content" [innerHTML]="lessonDetail.description"></div>
          </div>

          <!-- Lesson Content -->
          <div *ngIf="lessonDetail.content" class="lesson-main-content">
            <h4>Content</h4>
            <div class="content-body" [innerHTML]="lessonDetail.content"></div>
          </div>

          <!-- Key Insights -->
          <div *ngIf="lessonDetail.keynotes && lessonDetail.keynotes.length > 0" class="key-insights-section">
            <h4>
+              <mat-icon>lightbulb</mat-icon>
              Key Insights ({{ lessonDetail.keynotes.length }})
            </h4>
            <div class="keynotes-container">
              <div *ngFor="let keynote of getSortedKeynotes(); let i = index" 
                   class="keynote-card" [class.important]="keynote.isImportant">
                <div class="keynote-header">
                  <span class="keynote-number">{{ i + 1 }}</span>
                  <h5 class="keynote-title">{{ keynote.title }}</h5>
                </div>
                <div class="keynote-content" [innerHTML]="keynote.content"></div>
                <div class="keynote-badges" *ngIf="keynote.isImportant || keynote.relatedPlanet || keynote.relatedZodiac">
                  <span *ngIf="keynote.isImportant" class="important-badge">Important</span>
                  <span *ngIf="keynote.relatedPlanet" class="planet-badge">{{ keynote.relatedPlanet }}</span>
                  <span *ngIf="keynote.relatedZodiac" class="zodiac-badge">{{ keynote.relatedZodiac }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Media Resources -->
          <div class="media-section" *ngIf="lessonDetail.videoUrl || lessonDetail.audioUrl || lessonDetail.documentUrl">
            <h4>Resources</h4>
            <div class="media-grid">
              <a *ngIf="lessonDetail.videoUrl" [href]="lessonDetail.videoUrl" target="_blank" class="media-card video">
                <mat-icon>play_circle_filled</mat-icon>
                <span>Video</span>
              </a>
              <a *ngIf="lessonDetail.audioUrl" [href]="lessonDetail.audioUrl" target="_blank" class="media-card audio">
                <mat-icon>headphones</mat-icon>
                <span>Audio</span>
              </a>
              <a *ngIf="lessonDetail.documentUrl" [href]="lessonDetail.documentUrl" target="_blank" class="media-card document">
                <mat-icon>description</mat-icon>
                <span>Document</span>
              </a>
            </div>
          </div>

          <!-- Tags -->
          <div *ngIf="lessonDetail.tags && lessonDetail.tags.length > 0" class="tags-section">
            <h4>
              <mat-icon>local_offer</mat-icon>
              Tags
            </h4>
            <div class="tags-container">
              <mat-chip-set>
                <mat-chip *ngFor="let tag of lessonDetail.tags">{{ tag.tagName }}</mat-chip>
              </mat-chip-set>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="!loading && !lessonDetail" class="error-container">
          <mat-icon class="error-icon">error_outline</mat-icon>
          <h3>Lesson not found</h3>
          <p>The requested lesson could not be loaded.</p>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Close</button>
      </mat-dialog-actions>
    </div>  `,
  styles: [`    .lesson-modal-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-height: 100vh;
    }

    .lesson-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #e0e0e0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 60px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      flex-shrink: 0;
      z-index: 10;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .back-button {
      color: white !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 50% !important;
      width: 40px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .back-button:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      transform: translateX(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    .back-button mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .lesson-modal-header h2 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .close-button {
      color: white !important;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }

    .close-button:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1) !important;
    }    .lesson-modal-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px 32px;
      background: #fafbfc;
      max-height: calc(100vh - 140px);
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px 20px;
      text-align: center;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
      font-size: 0.95rem;
    }

    .lesson-content {
      animation: fadeIn 0.3s ease-in;
      max-width: 1000px;
      margin: 0 auto;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lesson-header {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
      border-radius: 16px;
      margin-bottom: 28px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border: 1px solid #e8eafd;
    }

    .lesson-number {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.1rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .lesson-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #2d3748;
      line-height: 1.3;
    }

    .lesson-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .lesson-duration, .lesson-status {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 0.85rem;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .lesson-duration {
      background: #e3f2fd;
      color: #1976d2;
      border: 1px solid #bbdefb;
    }

    .lesson-status.free {
      background: #e8f5e8;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }

    .lesson-status.premium {
      background: #fff3e0;
      color: #f57c00;
      border: 1px solid #ffcc02;
    }

    .lesson-description, .lesson-main-content, .key-insights-section, .media-section, .tags-section {
      margin-bottom: 32px;
    }

    .lesson-description h4, 
    .lesson-main-content h4, 
    .key-insights-section h4, 
    .media-section h4, 
    .tags-section h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e0e7ff;
    }

    .description-content, .content-body {
      background: white;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid #667eea;
      line-height: 1.6;
      color: #4a5568;
      font-size: 0.95rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }

    .keynotes-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .keynote-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid #e0e7ff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .keynote-card:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }

    .keynote-card.important {
      border-left-color: #ff6b6b;
      background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);
      border-color: #fed7d7;
    }

    .keynote-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }

    .keynote-number {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 600;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
    }

    .keynote-title {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
      color: #2d3748;
      line-height: 1.3;
    }

    .keynote-content {
      line-height: 1.5;
      color: #4a5568;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }

    .keynote-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .important-badge, .planet-badge, .zodiac-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid;
    }

    .important-badge {
      background: #ffebee;
      color: #c62828;
      border-color: #ffcdd2;
    }

    .planet-badge {
      background: #fff3e0;
      color: #ef6c00;
      border-color: #ffcc02;
    }

    .zodiac-badge {
      background: #f3e5f5;
      color: #7b1fa2;
      border-color: #ce93d8;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
    }

    .media-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: white;
      border-radius: 12px;
      text-decoration: none;
      color: #333;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }

    .media-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      border-color: #667eea;
    }

    .media-card mat-icon {
      font-size: 2.2rem;
      width: 2.2rem;
      height: 2.2rem;
      margin-bottom: 10px;
    }

    .media-card.video mat-icon { color: #ff4444; }
    .media-card.audio mat-icon { color: #9c27b0; }
    .media-card.document mat-icon { color: #2196f3; }

    .media-card span {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .tags-container {
      margin-top: 12px;
    }

    .tags-container mat-chip {
      background: #e0e7ff !important;
      color: #5b21b6 !important;
      border: 1px solid #c4b5fd !important;
      margin: 4px !important;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px 20px;
      text-align: center;
    }

    .error-icon {
      font-size: 3.5rem;
      width: 3.5rem;
      height: 3.5rem;
      color: #ff5722;
      margin-bottom: 20px;
    }

    .error-container h3 {
      color: #2d3748;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #718096;
    }    /* Mobile optimizations */
    @media (max-width: 768px) {
      .lesson-modal-content {
        padding: 20px 16px;
        max-height: calc(100vh - 120px);
        -webkit-overflow-scrolling: touch;
      }
      
      .lesson-header {
        flex-direction: column;
        text-align: center;
        gap: 16px;
        padding: 20px;
      }
      
      .lesson-title {
        font-size: 1.25rem;
      }
      
      .media-grid {
        grid-template-columns: 1fr;
      }

      .keynote-header {
        gap: 12px;
      }

      .keynote-title {
        font-size: 1rem;
      }      .lesson-modal-header {
        padding: 12px 16px;
      }

      .back-button {
        width: 36px !important;
        height: 36px !important;
      }

      .back-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }    /* Scrollbar styling */
    .lesson-modal-content::-webkit-scrollbar {
      width: 8px;
    }

    .lesson-modal-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
      margin: 4px 0;
    }

    .lesson-modal-content::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
      border: 1px solid #f1f1f1;
    }

    .lesson-modal-content::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }

    .lesson-modal-content::-webkit-scrollbar-thumb:active {
      background: #999999;
    }

    /* For Firefox */
    .lesson-modal-content {
      scrollbar-width: thin;
      scrollbar-color: #c1c1c1 #f1f1f1;
    }
  `]
})
export class LessonDetailModalComponent implements OnInit {
  lessonDetail: LessonDetail | null = null;
  loading = true;

  constructor(
    public dialogRef: MatDialogRef<LessonDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lessonId: number, topicId: number, courseId: number },
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.loadLessonDetails(this.data.lessonId);
  }

  loadLessonDetails(lessonId: number): void {
    this.lessonService.getLessonDetails(lessonId).subscribe({
      next: (lessonDetail: LessonDetail) => {
        this.lessonDetail = lessonDetail;
        this.loading = false;
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
      if (a.orderSequence !== undefined && b.orderSequence !== undefined) {
        return a.orderSequence - b.orderSequence;
      }
      return a.keynoteId - b.keynoteId;
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}

