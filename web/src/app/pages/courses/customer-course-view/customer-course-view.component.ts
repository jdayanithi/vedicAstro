import { Component, OnInit } from '@angular/core';
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
    <div class="modern-customer-view">      <!-- Enhanced Hero Section with Gradient and Animated Elements -->
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-particles">
          <div class="particle" *ngFor="let particle of [1,2,3,4,5,6,7,8]"></div>
        </div>
        <div class="hero-content">
          <div class="hero-icon-container">
            <mat-icon class="hero-icon">auto_stories</mat-icon>
          </div>
          <h1 class="hero-title">
            <span class="title-line-1">Discover</span>
            <span class="title-line-2">Vedic Astrology</span>
          </h1>
          <p class="hero-subtitle" *ngIf="!selectedCourse">
            <mat-icon>star</mat-icon>
            Explore ancient wisdom through our comprehensive courses
          </p>
          <p class="hero-subtitle course-specific" *ngIf="selectedCourse">
            <mat-icon>school</mat-icon>
            Master the ancient wisdom of <strong>{{selectedCourse.title}}</strong>
          </p>
          <div class="hero-stats" *ngIf="selectedCourse">
            <div class="hero-stat">
              <mat-icon>menu_book</mat-icon>
              <span>{{getTotalLessonsCount()}} Lessons</span>
            </div>
            <div class="hero-stat">
              <mat-icon>schedule</mat-icon>
              <span>{{getTotalDuration()}} min</span>
            </div>
            <div class="hero-stat">
              <mat-icon>star</mat-icon>
              <span>{{selectedCourse.difficultyLevel | titlecase}}</span>
            </div>
          </div>
        </div>
        <div class="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
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
        <!-- Back Button -->
        <div class="back-button-section" *ngIf="isViewingSpecificCourse">
          <button mat-raised-button color="primary" (click)="goBackToCourses()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
            Back to Courses
          </button>
        </div>
        
        <!-- Enhanced Course Heading with Decorative Elements -->
        <div class="course-heading-section">
          <div class="course-heading-bg"></div>
          <div class="course-heading-content">
            <!-- Enhanced Course Header with Image and Title -->
            <div class="course-header-with-image">
              <div class="course-image-container" *ngIf="selectedCourse.thumbnailUrl">
                <div class="image-frame">
                  <img [src]="selectedCourse.thumbnailUrl" [alt]="selectedCourse.title" class="course-image-integrated">
                  <div class="image-overlay">
                    <mat-icon>play_circle_filled</mat-icon>
                  </div>
                </div>
                <div class="image-badges">
                  <span class="badge difficulty-badge" [class]="selectedCourse.difficultyLevel && selectedCourse.difficultyLevel.toLowerCase()">
                    <mat-icon>trending_up</mat-icon>
                    {{selectedCourse.difficultyLevel | titlecase}}
                  </span>
                  <span class="badge price-badge" *ngIf="selectedCourse && selectedCourse.price && selectedCourse.price > 0; else freeBadge">
                    <mat-icon>currency_rupee</mat-icon>
                    ₹{{selectedCourse.price}}
                  </span>
                  <ng-template #freeBadge>
                    <span class="badge free-badge">
                      <mat-icon>card_giftcard</mat-icon>
                      Free
                    </span>
                  </ng-template>
                </div>
              </div>
              <div class="course-title-info">
                <div class="course-breadcrumb">
                  <mat-icon class="breadcrumb-icon">folder</mat-icon>
                  <span class="breadcrumb-item">{{getCategoryName(selectedCourse.categoryId)}}</span>
                  <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
                  <span class="breadcrumb-item current">{{selectedCourse.title}}</span>
                </div>
                <h1 class="course-main-title">
                  {{selectedCourse.title}}
                  <div class="title-decoration"></div>
                </h1>
                
                <!-- Enhanced Course Stats -->
                <div class="course-stats-enhanced">
                  <div class="stat-card">
                    <div class="stat-icon">
                      <mat-icon>menu_book</mat-icon>
                    </div>
                    <div class="stat-info">
                      <span class="stat-number">{{getTotalLessonsCount()}}</span>
                      <span class="stat-label">Lessons</span>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">
                      <mat-icon>schedule</mat-icon>
                    </div>
                    <div class="stat-info">
                      <span class="stat-number">{{getTotalDuration()}}</span>
                      <span class="stat-label">Minutes</span>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">
                      <mat-icon>people</mat-icon>
                    </div>
                    <div class="stat-info">
                      <span class="stat-number">{{topics.length}}</span>
                      <span class="stat-label">Topics</span>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">
                      <mat-icon>verified</mat-icon>
                    </div>
                    <div class="stat-info">
                      <span class="stat-number">{{selectedCourse.difficultyLevel | titlecase}}</span>
                      <span class="stat-label">Level</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Enhanced Course Description -->
            <div class="course-description-section">
              <div class="description-header">
                <mat-icon>description</mat-icon>
                <h3>About This Course</h3>
              </div>
              <div class="course-description" [innerHTML]="selectedCourse.description"></div>
              <div class="description-features">
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Comprehensive curriculum</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Ancient wisdom insights</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Practical applications</span>
                </div>
                <div class="feature-item">
                  <mat-icon>check_circle</mat-icon>
                  <span>Expert guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>        <!-- Topics & Lessons -->
        <div class="topics-container">
          <!-- Topics Header -->
          <div class="topics-header" *ngIf="topics.length > 0">
            <h3 class="topics-title">Course Topics</h3>
          </div><div *ngFor="let topic of topics; let i = index" class="topic-block">
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
                 *ngIf="inlineExpandedTopics.has(i)">
              
              <!-- Enhanced Lesson Cards Grid -->
              <div class="lessons-cards-grid">
                <div *ngFor="let lesson of topic.lessons; let j = index" class="lesson-card-enhanced">
                  <div class="lesson-card-inner">
                    <!-- Lesson Number Badge -->
                    <div class="lesson-number-badge">
                      <span class="lesson-number">{{j + 1}}</span>
                    </div>
                    
                    <!-- Lesson Content -->
                    <div class="lesson-content">
                      <div class="lesson-header">
                        <mat-icon class="lesson-type-icon">play_circle_filled</mat-icon>
                        <h5 class="lesson-title">{{lesson.title}}</h5>
                      </div>
                      
                      
                    </div>
                    
                    <!-- Action Button -->
                    <div class="lesson-action">
                      <button 
                        mat-raised-button 
                        color="primary" 
                        class="lesson-view-btn"
                        (click)="viewLessonDetails(lesson.lessonId, topic.topicId)">
                        <mat-icon>play_arrow</mat-icon>
                        Start Lesson
                      </button>
                    </div>
                    
                    <!-- Progress Indicator (decorative) -->
                    <div class="lesson-progress-bar">
                      <div class="progress-fill" [style.width.%]="(j + 1) * 10"></div>
                    </div>
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

    /* Enhanced Hero Section */
    .hero-section {
      position: relative;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 20px 80px;
      text-align: center;
      overflow: hidden;
      min-height: 40vh;
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 60%),
                  radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 60%);
      pointer-events: none;
    }
    
    .hero-particles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    
    .particle:nth-child(1) { left: 10%; animation-delay: -0.5s; }
    .particle:nth-child(2) { left: 20%; animation-delay: -1s; }
    .particle:nth-child(3) { left: 30%; animation-delay: -1.5s; }
    .particle:nth-child(4) { left: 40%; animation-delay: -2s; }
    .particle:nth-child(5) { left: 60%; animation-delay: -2.5s; }
    .particle:nth-child(6) { left: 70%; animation-delay: -3s; }
    .particle:nth-child(7) { left: 80%; animation-delay: -3.5s; }
    .particle:nth-child(8) { left: 90%; animation-delay: -4s; }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
      50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .hero-icon-container {
      margin-bottom: 20px;
    }
    
    .hero-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ffd700;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .hero-title {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 20px;
      text-shadow: 0 4px 8px rgba(0,0,0,0.3);
      line-height: 1.1;
    }
    
    .title-line-1 {
      display: block;
      background: linear-gradient(45deg, #fff, #ffd700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .title-line-2 {
      display: block;
      background: linear-gradient(45deg, #ffd700, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
      opacity: 0.95;
      font-weight: 300;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .hero-subtitle.course-specific {
      font-size: 1.2rem;
      font-weight: 400;
    }
    
    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 30px;
      flex-wrap: wrap;
    }
    
    .hero-stat {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.1);
      padding: 10px 16px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .hero-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      overflow: hidden;
    }
    
    .hero-wave svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 40px;
    }
    
    .hero-wave path {
      fill: #f5f7fa;
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
    }

    /* Back Button Section */
    .back-button-section {
      margin-bottom: 20px;
      padding: 0 20px;
    }

    .back-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 12px 24px !important;
      border-radius: 25px !important;
      font-size: 0.95rem !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
      border: none !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .back-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%) !important;
    }

    .back-button mat-icon {
      font-size: 1.2rem !important;
      margin-right: 4px !important;
    }    /* Enhanced Course Heading */
    .course-heading-section {
      position: relative;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 20px;
      padding: 50px;
      margin: -60px 20px 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      border: 1px solid rgba(255,255,255,0.8);
      backdrop-filter: blur(10px);
      overflow: hidden;
    }
    
    .course-heading-bg {
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border-radius: 50%;
      transform: translate(100px, -100px);
      pointer-events: none;
    }
    
    .course-header-with-image {
      display: flex;
      gap: 40px;
      align-items: flex-start;
      margin-bottom: 40px;
      position: relative;
      z-index: 2;
    }
    
    .course-image-container {
      flex-shrink: 0;
      width: 280px;
      position: relative;
    }
    
    .image-frame {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
      transition: transform 0.3s ease;
    }
    
    .image-frame:hover {
      transform: translateY(-5px);
    }
    
    .course-image-integrated {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .image-frame:hover .image-overlay {
      opacity: 1;
    }
    
    .image-overlay mat-icon {
      color: white;
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    
    .image-badges {
      position: absolute;
      top: 15px;
      left: 15px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .difficulty-badge.beginner {
      background: rgba(76, 175, 80, 0.9);
      color: white;
    }
    
    .difficulty-badge.intermediate {
      background: rgba(255, 152, 0, 0.9);
      color: white;
    }
    
    .difficulty-badge.advanced {
      background: rgba(244, 67, 54, 0.9);
      color: white;
    }
    
    .price-badge {
      background: rgba(63, 81, 181, 0.9);
      color: white;
    }
    
    .free-badge {
      background: rgba(76, 175, 80, 0.9);
      color: white;
    }
    
    .course-title-info {
      flex: 1;
      min-width: 0;
    }
    
    .course-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 0.95rem;
      color: #666;
    }
    
    .breadcrumb-icon {
      font-size: 18px;
      color: #999;
    }
    
    .breadcrumb-item.current {
      color: #667eea;
      font-weight: 600;
    }
    
    .breadcrumb-separator {
      font-size: 16px;
    }
    
    .course-main-title {
      position: relative;
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 30px 0;
      line-height: 1.2;
    }
    
    .title-decoration {
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
    }
    
    .course-stats-enhanced {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 15px;
      border: 1px solid #e9ecef;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .stat-info {
      display: flex;
      flex-direction: column;
    }
    
    .stat-number {
      font-size: 1.1rem;
      font-weight: 700;
      color: #2c3e50;
    }
    
    .stat-label {
      font-size: 0.85rem;
      color: #666;
      font-weight: 500;
    }
    
    .course-description-section {
      position: relative;
      z-index: 2;
      margin-top: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 15px;
      border: 1px solid #e9ecef;
    }
    
    .description-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .description-header mat-icon {
      color: #667eea;
      font-size: 24px;
    }
    
    .description-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.3rem;
      font-weight: 600;
    }
    
    .course-description {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 25px;
    }
    
    .description-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .feature-item mat-icon {
      color: #4caf50;
      font-size: 20px;
    }

    /* Topic Stats */
    .topic-stats {
      display: flex;
      gap: 20px;
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
    }

  /* Enhanced Lessons Section Styles */
  /* Clean Lesson Cards Grid */
  .lessons-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin: 20px 0;
  }

  .lesson-card-enhanced {
    background: white;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    transition: border-color 0.2s;
    position: relative;
  }

  .lesson-card-enhanced:hover {
    border-color: #667eea;
  }

  .lesson-card-inner {
    padding: 16px;
    position: relative;
  }

  .lesson-number-badge {
    position: absolute;
    top: -8px;
    right: 16px;
    width: 24px;
    height: 24px;
    background: #667eea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lesson-number {
    color: white;
    font-weight: 600;
    font-size: 11px;
  }

  .lesson-content {
    margin-bottom: 12px;
  }

  .lesson-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .lesson-type-icon {
    color: #667eea;
    font-size: 18px !important;
  }

  .lesson-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #333;
    line-height: 1.3;
  }

  
  .lesson-action {
    margin-top: 12px;
  }

  .lesson-view-btn {
    width: 100%;
    height: 32px;
    border-radius: 6px !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    background: #667eea !important;
    border: none !important;
    transition: background 0.2s !important;
  }

  .lesson-view-btn:hover {
    background: #5a6fd8 !important;
  }

  .lesson-view-btn mat-icon {
    margin-right: 4px;
    font-size: 14px;
  }

  /* Responsive Design for Enhanced Lessons */
  @media (max-width: 768px) {
    .lessons-cards-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-section {
        padding: 40px 20px 60px;
        min-height: 30vh;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
      }
      
      .hero-stats {
        gap: 20px;
        margin-top: 20px;
      }
      
      .filter-group {
        flex-direction: column;
        align-items: stretch;
      }
      
      .modern-select {
        min-width: auto;
      }
      
      .back-button-section {
        margin-bottom: 16px;
        padding: 0 16px;
      }
      
      .back-button {
        font-size: 0.9rem !important;
        padding: 10px 20px !important;
        width: 100% !important;
        justify-content: center !important;
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
    private dialog: MatDialog
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

  goBackToCourses(): void {
    // Navigate back to the courses list
    this.router.navigate(['/courses']);
  }
}
