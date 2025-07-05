import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CategoryService, Category } from '../../../service/category.service';
import { CourseService, Course } from '../../../service/course.service';
import { AuthService } from '../../../service/auth.service';
import { TopicService, LessonService, Topic as TopicType, Lesson as LessonType } from '../../../service/lesson.service';
import { LessonDetailModalComponent } from '../lesson-detail-modal/lesson-detail-modal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-customer-course-view',
  standalone: true,  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <div class="modern-customer-view">      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Discover Vedic Astrology</h1>
          <p class="hero-subtitle" *ngIf="!selectedCourse">Explore ancient wisdom through our comprehensive courses</p>
          <p class="hero-subtitle" *ngIf="selectedCourse">Master the ancient wisdom of {{selectedCourse.title}}</p>
        </div>
        <div class="hero-bg-pattern"></div>
      </div><!-- Filter Section (only show when not viewing specific course) -->
      <div class="filter-section" *ngIf="!isViewingSpecificCourse">
        <div class="filter-container">
          <div class="filter-group">
            <mat-form-field appearance="fill" class="modern-select">
              <mat-label>Choose Category</mat-label>
              <mat-select [(ngModel)]="selectedCategoryId" (selectionChange)="onCategoryChange()">
                <mat-option *ngFor="let cat of categories" [value]="cat.categoryId">{{cat.name}}</mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field appearance="fill" class="modern-select">
              <mat-label>Choose Course</mat-label>
              <mat-select [(ngModel)]="selectedCourseId" (selectionChange)="onCourseChange()" [disabled]="!selectedCategoryId">
                <mat-option *ngFor="let course of filteredCourses" [value]="course.courseId">{{course.title}}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-section">
        <mat-progress-spinner mode="indeterminate" color="primary" diameter="60"></mat-progress-spinner>
        <p>Loading course content...</p>
      </div>      <!-- Course Content -->
      <div *ngIf="selectedCourse && !loading" class="content-section">
        <!-- Course Heading with Integrated Thumbnail -->
        <div class="course-heading-section">
          <div class="course-heading-content">
            <!-- Course Header with Image and Title -->
            <div class="course-header-with-image">
              <div class="course-image-container" *ngIf="selectedCourse.thumbnailUrl">
                <img [src]="selectedCourse.thumbnailUrl" [alt]="selectedCourse.title" class="course-image-integrated">
              </div>
              <div class="course-title-info">
                <div class="course-breadcrumb">
                  <span class="breadcrumb-item">{{getCategoryName(selectedCourse.categoryId)}}</span>
                  <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
                  <span class="breadcrumb-item current">{{selectedCourse.title}}</span>
                </div>
                <h1 class="course-main-title">{{selectedCourse.title}}</h1>
              </div>
            </div>
            
            <div class="course-summary">
              <div class="course-stats">
                <div class="stat-item">
                  <mat-icon>menu_book</mat-icon>
                  <span>{{getTotalLessonsCount()}} Lessons</span>
                </div>
                <div class="stat-item">
                  <mat-icon>schedule</mat-icon>
                  <span>{{getTotalDuration()}} min</span>
                </div>
                <div class="stat-item">
                  <mat-icon>star</mat-icon>
                  <span class="difficulty">{{selectedCourse.difficultyLevel | titlecase}}</span>
                </div>
                <div class="stat-item" *ngIf="selectedCourse.price">
                  <mat-icon>currency_rupee</mat-icon>
                  <span>â‚¹{{selectedCourse.price}}</span>
                </div>
              </div>
            </div>
            <!-- Course Description -->
            <div class="course-description-section">
              <p class="course-description">{{selectedCourse.description}}</p>
            </div>
          </div>
        </div><!-- Topics & Lessons -->
        <div class="topics-container">
          <!-- Topics Header -->
          <div class="topics-header" *ngIf="topics.length > 0">
            <h3 class="topics-title">Course Topics</h3>
            <div class="topics-actions">
              <button 
                mat-raised-button 
                color="primary" 
                class="expand-all-btn"
                (click)="expandAll()"
                *ngIf="inlineExpandedTopics.size < topics.length">
                <mat-icon>unfold_more</mat-icon>
                Expand All
              </button>
              <button 
                mat-raised-button 
                color="accent" 
                class="collapse-all-btn"
                (click)="collapseAll()"
                *ngIf="inlineExpandedTopics.size > 0">
                <mat-icon>unfold_less</mat-icon>
                Collapse All
              </button>
            </div>
          </div>          <div *ngFor="let topic of topics; let i = index" class="topic-block">
            <div class="topic-header-modern" (click)="toggleTopic(i)">
              <div class="topic-number">{{i + 1}}</div>
              <div class="topic-info">
                <h3 class="topic-title-modern">{{topic.title}}</h3>
                <p class="topic-desc-modern">{{topic.description}} <span class="click-hint">Click to expand</span></p>
              </div>
              <div class="topic-actions">
                <button mat-icon-button class="expand-button" [class.expanded]="inlineExpandedTopics.has(i)">
                  <mat-icon>{{inlineExpandedTopics.has(i) ? 'expand_less' : 'expand_more'}}</mat-icon>
                </button>
                <button mat-icon-button class="detail-button" (click)="viewTopicDetails(i, $event)" title="View detailed lessons with keynotes and tags">
                  <mat-icon>open_in_new</mat-icon>
                </button>
              </div>
            </div>
            
            <!-- Topic Preview (when collapsed) -->
            <div class="topic-preview" *ngIf="!inlineExpandedTopics.has(i)">
              <div class="topic-stats">
                <span class="stat-item">
                  <mat-icon>menu_book</mat-icon>
                  {{topic.lessons.length}} Lessons
                </span>
                <span class="stat-item" *ngIf="getTopicDuration(topic) > 0">
                  <mat-icon>schedule</mat-icon>
                  {{getTopicDuration(topic)}} min
                </span>
                <span class="stat-item">
                  <mat-icon>play_circle_filled</mat-icon>
                  {{getTopicFreeCount(topic)}} Free
                </span>
              </div>
              <p class="view-hint">Click topic header to expand lessons or <mat-icon>open_in_new</mat-icon> for detailed view</p>
            </div>

            <!-- Expanded Topic Content (Inline) -->
            <div class="lessons-grid" 
                 [class.inline-expanded]="inlineExpandedTopics.has(i)"
                 *ngIf="inlineExpandedTopics.has(i)">              <div class="lessons-header">
                <h4 class="lessons-section-title">Lessons in this Topic</h4>
              </div>
                <div *ngFor="let lesson of topic.lessons; let j = index" class="lesson-item">
                <div class="lesson-content">
                  <div class="lesson-header-modern">
                    <h4 class="lesson-title-modern">{{lesson.title}}</h4>
                    <div class="lesson-status">
                      <span class="status-badge" [class]="lesson.isFree ? 'free' : 'premium'">
                        {{lesson.isFree ? 'Free' : 'Premium'}}
                      </span>
                      <span *ngIf="lesson.duration" class="duration-badge">{{lesson.duration}} min</span>
                    </div>
                  </div>
                  <div class="lesson-desc-modern" [innerHTML]="lesson.description"></div>
                  
                  <div class="lesson-meta-info">
                    <span *ngIf="lesson.keynotes && lesson.keynotes.length > 0" class="meta-item">
                      <mat-icon>lightbulb</mat-icon>
                      {{lesson.keynotes.length}} Key Insights
                    </span>
                    <span *ngIf="lesson.tags && lesson.tags.length > 0" class="meta-item">
                      <mat-icon>local_offer</mat-icon>
                      {{lesson.tags.length}} Tags
                    </span>
                  </div>

                  <div class="lesson-actions">
                    <button mat-raised-button color="primary" (click)="viewLessonDetails(lesson.lessonId, topic.topicId)" class="view-lesson-details-btn">
                      <mat-icon>visibility</mat-icon>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data -->
      <div *ngIf="selectedCourseId && !selectedCourse && !loading" class="no-data-modern">
        <mat-icon>search_off</mat-icon>
        <h3>No course found</h3>
        <p>Please try selecting a different course.</p>
      </div>
    </div>
  `,
  styles: [`
    .modern-customer-view {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 80px 20px 60px;
      text-align: center;
      overflow: hidden;
    }
    
    .hero-bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(45deg, #fff, #ecf0f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 300;
    }

    /* Filter Section */
    .filter-section {
      background: white;
      padding: 40px 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .filter-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .filter-group {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .modern-select {
      min-width: 250px;
    }

    /* Loading Section */
    .loading-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      color: #666;
    }
    
    .loading-section p {
      margin-top: 20px;
      font-size: 1.1rem;
    }    /* Content Section */
    .content-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px 40px;
    }    /* Course Header with Integrated Thumbnail */
    .course-header-with-image {
      display: flex;
      gap: 24px;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    
    .course-image-container {
      flex-shrink: 0;
      width: 200px;
    }
    
    .course-image-integrated {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .course-image-integrated:hover {
      transform: scale(1.02);
    }
    
    .course-title-info {
      flex: 1;
      min-width: 0;
    }
    
    .course-main-title {
      font-size: 2rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 8px 0 0 0;
      line-height: 1.2;
    }

    /* Course Heading */
    .course-heading-section {
      background: white;
      border-radius: 12px;
      padding: 40px;
      margin: 40px 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .course-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 0.9rem;
      color: #666;
    }
    
    .breadcrumb-item.current {
      color: #3f51b5;
      font-weight: 500;
    }
      .breadcrumb-separator {
      font-size: 16px;
    }
    
    .course-summary {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .course-stats {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f8f9fa;
      padding: 12px 16px;
      border-radius: 8px;
      font-weight: 500;
      color: #555;
    }
      .stat-item mat-icon {
      color: #3f51b5;
      font-size: 20px;
    }

    /* Course Description Section */
    .course-description-section {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e9ecef;
    }
    
    .course-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin: 0;
    }

    /* Topics Container */
    .topics-container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .topics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .topics-title {
      font-size: 2rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }
    
    .topics-actions {
      display: flex;
      gap: 12px;
    }

    /* Topic Blocks */
    .topic-block {
      margin-bottom: 24px;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .topic-block:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
      .topic-header-modern {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px;
      background: #f8f9fa;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .topic-header-modern:hover {
      background: #e9ecef;
    }

    .topic-info {
      flex: 1;
      min-width: 0;
    }
    
    .topic-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #3f51b5, #5c6bc0);
      color: white;
      border-radius: 50%;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    
    .topic-info {
      flex: 1;
    }
    
    .topic-title-modern {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 8px 0;
    }
    
    .topic-desc-modern {
      font-size: 1rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
    
    .expand-button {
      transition: transform 0.3s ease;
    }
    
    .expand-button.expanded {
      transform: rotate(180deg);
    }

    /* Topic Preview */
    .topic-preview {
      padding: 20px 30px;
      background: #f8f9ff;
      border-top: 1px solid #e0e7ff;
    }

    .topic-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .topic-stats .stat-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .topic-stats .stat-item mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: #667eea;
    }

    .view-hint {
      margin: 0;
      font-size: 0.9rem;
      color: #888;
      font-style: italic;
    }

    /* Lessons Grid */
    .lessons-grid {
      padding: 0;
      background: white;
    }
    
    .lessons-grid.inline-expanded {
      padding: 24px;
      border-top: 1px solid #e0e0e0;
    }
    
    .lesson-item {
      border-bottom: 1px solid #f0f0f0;
      transition: all 0.3s ease;
    }
    
    .lesson-item:last-child {
      border-bottom: none;
    }
    
    .lesson-item:hover {
      background: #f8f9fa;
    }
    
    .lesson-content {
      padding: 20px 24px;
    }
    
    .lesson-header-modern {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      gap: 16px;
    }
    
    .lesson-title-modern {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
      flex: 1;
    }
    
    .lesson-status {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status-badge.free {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .status-badge.premium {
      background: #fff3e0;
      color: #f57c00;
    }
    
    .duration-badge {
      padding: 2px 8px;
      background: #f0f4ff;
      color: #667eea;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-left: 8px;
    }
    
    .lesson-desc-modern {
      font-size: 0.95rem;
      color: #666;
      line-height: 1.6;
      margin: 0;
    }
    
    .lesson-desc-preview {
      max-height: 60px;
      overflow: hidden;
      position: relative;
    }
    
    .lesson-desc-preview::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(transparent, white);
    }
    
    .lesson-preview {
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }
    
    .lesson-preview:hover {
      opacity: 1;
    }

    /* Keynotes */
    .keynotes-modern {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }
    
    .section-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #3f51b5;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .keynotes-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .keynote-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 12px;
      border-left: 3px solid #3f51b5;
    }
    
    .keynote-item.important {
      border-left-color: #ff5722;
      background: #fff3e0;
    }
    
    .keynote-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      gap: 12px;
    }
    
    .keynote-title-modern {
      font-weight: 600;
      color: #2c3e50;
      font-size: 0.9rem;
    }
    
    .keynote-meta {
      display: flex;
      gap: 6px;
    }
    
    .meta-tag {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .meta-tag.planet {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .meta-tag.zodiac {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .keynote-content-modern {
      font-size: 0.85rem;
      color: #666;
      line-height: 1.5;
    }

    /* Tags */
    .tags-modern {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .tag-modern {
      padding: 4px 10px;
      background: #e9ecef;
      color: #495057;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    /* More Lessons Indicator */
    .more-lessons-indicator {
      text-align: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      margin: 12px 24px;
      color: #666;
      font-style: italic;
    }
    
    .click-hint {
      color: #ff6b6b;
      font-weight: 500;
    }

    /* No Data */
    .no-data-modern {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      color: #666;
      text-align: center;
    }
    
    .no-data-modern mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 20px;
      color: #ccc;
    }
    
    .no-data-modern h3 {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    /* Topic Actions */
    .topic-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .detail-button {
      color: #667eea !important;
      background: rgba(102, 126, 234, 0.1);
    }

    .detail-button:hover {
      background: rgba(102, 126, 234, 0.2);
    }

    /* Lessons Header */
    .lessons-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 2px solid #e0e7ff;
      margin-bottom: 16px;
    }

    .lessons-section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .view-details-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }    /* Lesson Meta Info */
    .lesson-meta-info {
      display: flex;
      gap: 16px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f4ff;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.85rem;
    }

    .meta-item mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: #667eea;
    }

    /* Lesson Actions */
    .lesson-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #f0f4ff;
    }

    .view-lesson-details-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 8px 16px !important;
      border-radius: 20px !important;
      font-size: 0.9rem !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3) !important;
    }

    .view-lesson-details-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
    }

    .view-lesson-details-btn mat-icon {
      margin-right: 4px !important;
      font-size: 1.1rem !important;
    }    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .filter-group {
        flex-direction: column;
        align-items: stretch;
      }
      
      .modern-select {
        min-width: auto;
      }
      
      .course-header-with-image {
        flex-direction: column;
        gap: 16px;
      }
      
      .course-image-container {
        width: 100%;
      }
      
      .course-image-integrated {
        height: 200px;
      }
      
      .course-main-title {
        font-size: 1.5rem;
      }
        .course-heading-section,
      .topics-container {
        padding: 24px;
        margin: 24px 0;
      }
      
      .course-summary {
        flex-direction: column;
        align-items: stretch;
      }
      
      .course-stats {
        justify-content: center;
      }
      
      .topics-header {
        flex-direction: column;
        align-items: stretch;
      }
      
      .topics-actions {
        justify-content: center;
      }
      
      .topic-header-modern {
        padding: 16px;
      }
      
      .lesson-content {
        padding: 16px;
      }
    }
  `]
})
export class CustomerCourseViewComponent implements OnInit {
  categories: Category[] = [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  topics: TopicType[] = [];
  selectedCategoryId: number | null = null;
  selectedCourseId: number | null = null;
  selectedCourse: Course | null = null;
  loading = false;
  isViewingSpecificCourse = false;
  inlineExpandedTopics = new Set<number>();  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private courseService: CourseService,
    private authService: AuthService,
    private topicService: TopicService,
    private lessonService: LessonService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}ngOnInit() {
    // Get courseId from route parameter
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isViewingSpecificCourse = true;
      this.selectedCourseId = parseInt(courseId, 10);
      this.loadSpecificCourse(this.selectedCourseId);
    } else {
      this.isViewingSpecificCourse = false;
      // Fallback to original behavior if no courseId in route
      this.loadCategories();
      this.loadCourses();
    }
  }

  loadSpecificCourse(courseId: number) {
    this.loading = true;
    
    // Load the specific course
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
        this.selectedCategoryId = course.categoryId;
        this.loadCategories();
        this.loadTopicsForCourse(courseId);
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.loading = false;
      }
    });
  }

  loadTopicsForCourse(courseId: number) {
    this.topicService.getTopicsByCourseId(courseId).subscribe({
      next: (topics) => {
        this.loadLessonsForTopics(topics);
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }

  loadLessonsForTopics(topics: TopicType[]) {
    const topicRequests = topics.map(topic =>
      this.lessonService.getLessonsByTopicId(topic.topicId).toPromise().then(lessons => {
        return { ...topic, lessons: lessons || [] };
      })
    );

    Promise.all(topicRequests).then(topicsWithLessons => {
      this.topics = topicsWithLessons;
      this.loading = false;
    }).catch(error => {
      console.error('Error loading lessons:', error);
      this.loading = false;
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.filter(cat => cat.isPublished);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses.filter(course => course.isPublished);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  onCategoryChange() {
    this.selectedCourseId = null;
    this.selectedCourse = null;
    this.topics = [];
    this.inlineExpandedTopics.clear();
    this.filteredCourses = this.courses.filter(c => c.categoryId === this.selectedCategoryId);
  }
  onCourseChange() {
    this.selectedCourse = this.courses.find(c => c.courseId === this.selectedCourseId) || null;
    this.topics = [];
    this.inlineExpandedTopics.clear();
    
    if (this.selectedCourseId) {
      this.loading = true;
      // Load topics from the database
      this.loadTopicsFromDatabase();
    }
  }

  private loadTopicsFromDatabase() {
    this.topicService.getTopicsByCourseId(this.selectedCourseId!).subscribe({
      next: (topics) => {
        // Load lessons for each topic
        const topicLoaders = topics.map(topic => 
          this.lessonService.getLessonsByTopicId(topic.topicId).subscribe({
            next: (lessons) => {
              topic.lessons = lessons;
            },
            error: (error) => {
              console.error(`Error loading lessons for topic ${topic.topicId}:`, error);
              topic.lessons = [];
            }
          })
        );
        
        this.topics = topics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }  toggleTopic(topicIndex: number) {
    // Toggle inline expansion for showing lesson titles
    if (this.inlineExpandedTopics.has(topicIndex)) {
      this.inlineExpandedTopics.delete(topicIndex);
    } else {
      this.inlineExpandedTopics.add(topicIndex);
    }
  }
  viewTopicDetails(topicIndex: number, event: Event) {
    // Prevent event bubbling to avoid triggering toggleTopic
    event.stopPropagation();
    
    // Navigate to the topic detail view for full content with keynotes and tags
    const topic = this.topics[topicIndex];
    if (topic) {
      this.router.navigate(['/topic', topic.topicId]);
    }
  }  viewLessonDetails(lessonId: number, topicId: number) {
    // Open lesson details in a full-screen modal/overlay
    const dialogRef = this.dialog.open(LessonDetailModalComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { 
        lessonId: lessonId, 
        topicId: topicId, 
        courseId: this.selectedCourseId 
      },
      panelClass: 'lesson-detail-modal-fullscreen',
      autoFocus: false,
      restoreFocus: false,
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after modal closes if needed
      console.log('Lesson detail modal closed');
    });
  }

  expandAll() {
    this.topics.forEach((_, index) => {
      this.inlineExpandedTopics.add(index);
    });
  }

  collapseAll() {
    this.inlineExpandedTopics.clear();
  }
  getDisplayLessons(topic: TopicType, topicIndex: number) {
    return this.inlineExpandedTopics.has(topicIndex) ? topic.lessons : topic.lessons.slice(0, 2);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getTotalLessonsCount(): number {
    return this.topics.reduce((total, topic) => total + topic.lessons.length, 0);
  }

  getTotalDuration(): number {
    let totalMinutes = 0;
    this.topics.forEach(topic => {
      topic.lessons.forEach(lesson => {
        if (lesson.duration) {
          totalMinutes += lesson.duration;
        }
      });
    });
    return totalMinutes;
  }
  getTopicDuration(topic: any): number {
    return topic.lessons.reduce((total: number, lesson: any) => total + (lesson.duration || 0), 0);
  }
  getTopicFreeCount(topic: any): number {
    return topic.lessons.filter((lesson: any) => lesson.isFree).length;
  }
}

