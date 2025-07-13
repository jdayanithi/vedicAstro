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
          <div class="lessons-header">
            <h2 class="lessons-title">Lessons</h2>
            <div class="lessons-controls">
              <button mat-stroked-button color="primary" (click)="expandAll()" class="control-btn">
                <mat-icon>expand_more</mat-icon>
                Expand All
              </button>
              <button mat-stroked-button color="primary" (click)="collapseAll()" class="control-btn">
                <mat-icon>expand_less</mat-icon>
                Collapse All
              </button>
            </div>
          </div>          <div *ngFor="let lesson of topicDetail.lessons; let i = index" class="lesson-card">
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
                <button mat-icon-button (click)="toggleLesson(i, $event)" class="expand-button" [class.expanded]="expandedLessons.has(i)" title="Toggle lesson preview">
                  <mat-icon>{{ expandedLessons.has(i) ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>
              </div>
            </div>

            <!-- Expanded Lesson Content -->
            <div *ngIf="expandedLessons.has(i)" class="lesson-content">
              <!-- Lesson Description (if available) -->
              <div *ngIf="lesson.description" class="lesson-description" [innerHTML]="lesson.description"></div>
              <div *ngIf="!lesson.description" class="lesson-description-placeholder">
                <p><em>Lesson description not available in summary view. Open full lesson details for complete content.</em></p>
              </div>
              
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
      background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%);
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
      color: #7b1fa2;
    }

    /* Lessons Container */
    .lessons-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .lessons-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 30px 20px 30px;
      border-bottom: 2px solid #f0f4ff;
      flex-wrap: wrap;
      gap: 16px;
    }

    .lessons-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .lessons-controls {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .control-btn {
      border-radius: 8px !important;
      padding: 0 16px !important;
      height: 36px !important;
      font-weight: 500 !important;
      font-size: 0.9rem !important;
      border: 2px solid #7b1fa2 !important;
      color: #7b1fa2 !important;
      background: white !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }

    .control-btn:hover {
      background: #7b1fa2 !important;
      color: white !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 3px 10px rgba(123, 31, 162, 0.3) !important;
    }

    .control-btn mat-icon {
      font-size: 18px !important;
      width: 18px !important;
      height: 18px !important;
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
      background: linear-gradient(135deg, #f3e5f5 0%, #e8f5e8 100%);
      box-shadow: 0 2px 8px rgba(123, 31, 162, 0.1);
    }

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
      color: #2e7d32;
    }    .lesson-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .expand-button {
      color: #666 !important;
      opacity: 0.7;
      transition: all 0.2s ease;
      background: rgba(102, 126, 234, 0.1) !important;
      border-radius: 50% !important;
    }

    .expand-button:hover {
      opacity: 1;
      background: rgba(46, 125, 50, 0.2) !important;
      color: #2e7d32 !important;
      transform: scale(1.1);
    }

    .expand-button.expanded {
      background: rgba(46, 125, 50, 0.2) !important;
      color: #2e7d32 !important;
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
      background: #f3e5f5;
      color: #7b1fa2;
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

    .lesson-description-placeholder {
      margin-bottom: 20px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #dee2e6;
    }

    .lesson-description-placeholder p {
      margin: 0;
      color: #6c757d;
      font-style: italic;
      font-size: 0.9rem;
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
      background: #2e7d32;
      border-radius: 2px;
    }

    .lesson-main-content {
      margin-bottom: 20px;
    }

    .content-body {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #2e7d32;
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
      background: #e8f5e8;
      color: #2e7d32;
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
      background: #e8f5e8 !important;
      color: #2e7d32 !important;
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

      .lessons-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        padding: 20px;
      }

      .lessons-controls {
        justify-content: center;
        gap: 8px;
      }

      .control-btn {
        flex: 1 !important;
        min-width: 0 !important;
        font-size: 0.85rem !important;
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

    /* Table styles for innerHTML content */
    ::ng-deep .lesson-description table, 
    ::ng-deep .content-body table,
    ::ng-deep .keynote-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid #e0e7ff;
      font-size: 0.9rem;
    }

    ::ng-deep .lesson-description table th, 
    ::ng-deep .content-body table th,
    ::ng-deep .keynote-content table th {
      background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
      color: white;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #e0e7ff;
      font-size: 0.95rem;
    }

    ::ng-deep .lesson-description table td, 
    ::ng-deep .content-body table td,
    ::ng-deep .keynote-content table td {
      padding: 8px 12px;
      border-bottom: 1px solid #e0e7ff;
      vertical-align: top;
      line-height: 1.4;
      word-wrap: break-word;
      max-width: 300px;
    }

    ::ng-deep .lesson-description table tr:last-child td, 
    ::ng-deep .content-body table tr:last-child td,
    ::ng-deep .keynote-content table tr:last-child td {
      border-bottom: none;
    }

    ::ng-deep .lesson-description table tr:hover, 
    ::ng-deep .content-body table tr:hover,
    ::ng-deep .keynote-content table tr:hover {
      background: #f8f9ff;
    }

    ::ng-deep .lesson-description table tr:nth-child(even), 
    ::ng-deep .content-body table tr:nth-child(even),
    ::ng-deep .keynote-content table tr:nth-child(even) {
      background: #fafbff;
    }

    ::ng-deep .lesson-description table tr:nth-child(even):hover, 
    ::ng-deep .content-body table tr:nth-child(even):hover,
    ::ng-deep .keynote-content table tr:nth-child(even):hover {
      background: #f0f2ff;
    }

    /* Additional HTML elements styling for innerHTML content */
    ::ng-deep .lesson-description ul, 
    ::ng-deep .content-body ul,
    ::ng-deep .keynote-content ul,
    ::ng-deep .lesson-description ol, 
    ::ng-deep .content-body ol,
    ::ng-deep .keynote-content ol {
      margin: 16px 0;
      padding-left: 24px;
    }

    ::ng-deep .lesson-description li, 
    ::ng-deep .content-body li,
    ::ng-deep .keynote-content li {
      margin-bottom: 8px;
      line-height: 1.5;
    }

    ::ng-deep .lesson-description blockquote, 
    ::ng-deep .content-body blockquote,
    ::ng-deep .keynote-content blockquote {
      background: #f0f2ff;
      border-left: 4px solid #2e7d32;
      margin: 16px 0;
      padding: 16px 20px;
      font-style: italic;
      color: #555;
      border-radius: 4px;
    }

    ::ng-deep .lesson-description code, 
    ::ng-deep .content-body code,
    ::ng-deep .keynote-content code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      color: #d63384;
    }

    ::ng-deep .lesson-description pre, 
    ::ng-deep .content-body pre,
    ::ng-deep .keynote-content pre {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 16px 0;
      border: 1px solid #e9ecef;
    }

    ::ng-deep .lesson-description pre code, 
    ::ng-deep .content-body pre code,
    ::ng-deep .keynote-content pre code {
      background: none;
      padding: 0;
      color: #333;
    }

    ::ng-deep .lesson-description strong, 
    ::ng-deep .content-body strong,
    ::ng-deep .keynote-content strong,
    ::ng-deep .lesson-description b, 
    ::ng-deep .content-body b,
    ::ng-deep .keynote-content b {
      font-weight: 600;
      color: #333;
    }

    ::ng-deep .lesson-description em, 
    ::ng-deep .content-body em,
    ::ng-deep .keynote-content em,
    ::ng-deep .lesson-description i, 
    ::ng-deep .content-body i,
    ::ng-deep .keynote-content i {
      font-style: italic;
      color: #555;
    }

    ::ng-deep .lesson-description h1, 
    ::ng-deep .content-body h1,
    ::ng-deep .keynote-content h1,
    ::ng-deep .lesson-description h2, 
    ::ng-deep .content-body h2,
    ::ng-deep .keynote-content h2,
    ::ng-deep .lesson-description h3, 
    ::ng-deep .content-body h3,
    ::ng-deep .keynote-content h3,
    ::ng-deep .lesson-description h4, 
    ::ng-deep .content-body h4,
    ::ng-deep .keynote-content h4,
    ::ng-deep .lesson-description h5, 
    ::ng-deep .content-body h5,
    ::ng-deep .keynote-content h5,
    ::ng-deep .lesson-description h6, 
    ::ng-deep .content-body h6,
    ::ng-deep .keynote-content h6 {
      margin: 20px 0 12px 0;
      color: #333;
      font-weight: 600;
    }

    ::ng-deep .lesson-description h1, 
    ::ng-deep .content-body h1,
    ::ng-deep .keynote-content h1 { font-size: 1.8rem; }
    ::ng-deep .lesson-description h2, 
    ::ng-deep .content-body h2,
    ::ng-deep .keynote-content h2 { font-size: 1.5rem; }
    ::ng-deep .lesson-description h3, 
    ::ng-deep .content-body h3,
    ::ng-deep .keynote-content h3 { font-size: 1.3rem; }
    ::ng-deep .lesson-description h4, 
    ::ng-deep .content-body h4,
    ::ng-deep .keynote-content h4 { font-size: 1.1rem; }
    ::ng-deep .lesson-description h5, 
    ::ng-deep .content-body h5,
    ::ng-deep .keynote-content h5 { font-size: 1rem; }
    ::ng-deep .lesson-description h6, 
    ::ng-deep .content-body h6,
    ::ng-deep .keynote-content h6 { font-size: 0.9rem; }

    ::ng-deep .lesson-description p, 
    ::ng-deep .content-body p,
    ::ng-deep .keynote-content p {
      margin: 12px 0;
      line-height: 1.6;
    }

    ::ng-deep .lesson-description img, 
    ::ng-deep .content-body img,
    ::ng-deep .keynote-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    ::ng-deep .lesson-description a, 
    ::ng-deep .content-body a,
    ::ng-deep .keynote-content a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }

    ::ng-deep .lesson-description a:hover, 
    ::ng-deep .content-body a:hover,
    ::ng-deep .keynote-content a:hover {
      color: #1b5e20;
      border-bottom-color: #1b5e20;
    }

    /* Responsive table styles */
    @media (max-width: 768px) {
      ::ng-deep .lesson-description table, 
      ::ng-deep .content-body table,
      ::ng-deep .keynote-content table {
        font-size: 0.8rem;
        display: block;
        width: 100%;
        overflow-x: auto;
      }
      
      ::ng-deep .lesson-description table th, 
      ::ng-deep .content-body table th,
      ::ng-deep .keynote-content table th,
      ::ng-deep .lesson-description table td, 
      ::ng-deep .content-body table td,
      ::ng-deep .keynote-content table td {
        padding: 6px 8px;
        min-width: 100px;
        font-size: 0.8rem;
        white-space: normal;
        word-wrap: break-word;
      }
      
      /* Create a scrollable container for tables on small screens */
      .lesson-description, .content-body, .keynote-content {
        overflow-x: auto;
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
        // Expand all lessons by default
        this.expandedLessons.clear();
        for (let i = 0; i < topicDetail.lessons.length; i++) {
          this.expandedLessons.add(i);
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading topic details:', error);
        this.loading = false;
      }
    });
  }  toggleLesson(lessonIndex: number, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent event bubbling
    }
    
    if (this.expandedLessons.has(lessonIndex)) {
      this.expandedLessons.delete(lessonIndex);
    } else {
      this.expandedLessons.add(lessonIndex);
    }
  }

  expandAll(): void {
    this.expandedLessons.clear();
    if (this.topicDetail) {
      for (let i = 0; i < this.topicDetail.lessons.length; i++) {
        this.expandedLessons.add(i);
      }
    }
  }

  collapseAll(): void {
    this.expandedLessons.clear();
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
    this.router.navigate(['/course', this.topicDetail?.courseId || '']);
  }
}
