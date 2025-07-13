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
import { CategoryService, Category } from '../../../service/category.service';
import { CourseService, Course } from '../../../service/course.service';
import { AuthService } from '../../../service/auth.service';
import { TopicService, LessonService, Topic as TopicType, Lesson as LessonType } from '../../../service/lesson.service';

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
    MatButtonModule
  ],
  template: `
    <div class="modern-customer-view">      <!-- Enhanced Hero Section with Gradient and Animated Elements (only show when not viewing specific course) -->
      <div class="hero-section" *ngIf="!isViewingSpecificCourse">
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
              <span>{{getTotalLessonsCount()}} Contents</span>
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
        <!-- Course Header (Similar to topic-detail) -->
        <div class="course-header" *ngIf="isViewingSpecificCourse">
          <button mat-icon-button (click)="goBackToCourses()" class="back-button">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="course-info">
            <div class="course-text">
              <h1 class="course-title">{{ selectedCourse.title }}</h1>
              <p class="course-description">{{ selectedCourse.description }}</p>
            </div>
          </div>
        </div>

        <!-- Course Stats -->
        <div class="course-stats" *ngIf="isViewingSpecificCourse">
          <div class="stat-item">
            <mat-icon>menu_book</mat-icon>
            <span>{{ getTotalLessonsCount() }} Contents</span>
          </div>
          <div class="stat-item">
            <mat-icon>schedule</mat-icon>
            <span>{{ getTotalDuration() }} min</span>
          </div>
          <div class="stat-item">
            <mat-icon>people</mat-icon>
            <span>{{ topics.length }} Modules</span>
          </div>
          <div class="stat-item">
            <mat-icon>star</mat-icon>
            <span>{{ selectedCourse.difficultyLevel | titlecase }}</span>
          </div>
        </div>
        
        <!-- Enhanced Course Heading with Decorative Elements (for non-specific course view) -->
        <div class="course-heading-section" *ngIf="!isViewingSpecificCourse">
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
                      <span class="stat-label">Contents</span>
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
                      <span class="stat-label">Modules</span>
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
        </div>

        <!-- Content & Modules -->
        <div class="topics-container">
          <!-- Content Header -->
          <div class="topics-header" *ngIf="topics.length > 0">
            <h3 class="topics-title">Course Content</h3>
          </div>

          <!-- Content List -->
          <div *ngFor="let topic of topics; let i = index" class="topic-card">
            <div class="topic-header">
              <div class="topic-number">{{ i + 1 }}</div>
              <div class="topic-info">
                <h3 class="topic-title">{{ topic.title }}</h3>
                <div class="topic-meta">
                  <span class="topic-lessons">
                    <mat-icon>menu_book</mat-icon>
                    {{ topic.lessons.length }} items
                  </span>
                  <span class="topic-duration" *ngIf="getTopicDuration(topic) > 0">
                    <mat-icon>schedule</mat-icon>
                    {{ getTopicDuration(topic) }} min
                  </span>
                  <span class="topic-free">
                    <mat-icon>card_giftcard</mat-icon>
                    {{ getTopicFreeCount(topic) }} Free
                  </span>
                </div>
              </div>
              <div class="topic-actions">
                <button mat-raised-button color="accent" (click)="viewAllTopicDetails(i, $event)" class="view-all-btn">
                  <mat-icon>visibility</mat-icon>
                  View All
                </button>
                <button mat-icon-button (click)="toggleTopic(i)" class="expand-button" [class.expanded]="inlineExpandedTopics.has(i)" title="Toggle content preview">
                  <mat-icon>{{ inlineExpandedTopics.has(i) ? 'expand_less' : 'expand_more' }}</mat-icon>
                </button>
              </div>
            </div>

            <!-- Expanded Content -->
            <div class="lessons-list" *ngIf="inlineExpandedTopics.has(i)">
              <!-- Desktop Table View -->
              <div class="lessons-table-container desktop-only">
                <table class="lessons-table">
                  <tbody>
                    <tr *ngFor="let lesson of topic.lessons; let j = index" class="lesson-row">
                      <td class="lesson-num-cell">{{ j + 1 }}</td>
                      <td class="lesson-title-cell">
                        <div class="lesson-title">{{ lesson.title }}</div>
                      </td>
                      <td class="lesson-action-cell">
                        <button mat-stroked-button color="primary" (click)="viewLessonDetails(lesson.lessonId, topic.topicId)" class="view-lesson-btn-table">
                          <mat-icon>play_arrow</mat-icon>
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Mobile Card View -->
              <div class="lessons-cards-container mobile-only">
                <div *ngFor="let lesson of topic.lessons; let j = index" class="lesson-card">
                  <div class="lesson-card-header">
                    <div class="lesson-number-badge">{{ j + 1 }}</div>
                    <div class="lesson-card-title">{{ lesson.title }}</div>
                  </div>
                  <div class="lesson-card-content">
                    <div class="lesson-card-action">
                      <button mat-stroked-button color="primary" (click)="viewLessonDetails(lesson.lessonId, topic.topicId)" class="view-lesson-btn-mobile">
                        <mat-icon>play_arrow</mat-icon>
                        View
                      </button>
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
      background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%);
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
      padding: 20px 20px 40px;
    }

    /* Course Header (Similar to topic-detail) */
    .course-header {
      background: linear-gradient(135deg, #1565c0 0%, #1976d2 100%);
      color: white;
      padding: 30px;
      border-radius: 16px;
      margin: 20px 0 30px 0;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      overflow: hidden;
    }

    .course-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
      pointer-events: none;
    }

    .course-header .back-button {
      color: white !important;
      background: rgba(255, 255, 255, 0.2) !important;
      z-index: 2;
      border-radius: 50% !important;
      padding: 8px !important;
      min-width: 40px !important;
      height: 40px !important;
      box-shadow: none !important;
    }

    .course-header .back-button:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: none !important;
    }

    .course-info {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
      z-index: 2;
    }

    .course-text {
      flex: 1;
      min-width: 0;
    }

    .course-header .course-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      color: white;
    }

    .course-header .course-description {
      font-size: 1.1rem;
      margin: 0;
      opacity: 0.9;
      line-height: 1.5;
      color: white;
    }

    /* Course Stats (Similar to topic-detail) */
    .course-stats {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 30px;
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .course-stats .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #555;
      font-weight: 500;
    }

    .course-stats .stat-item mat-icon {
      color: #1976d2;
      font-size: 20px;
    }

    /* Enhanced Course Heading */
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
      color: #7b1fa2;
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
      background: linear-gradient(90deg, #1565c0, #1976d2);
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
      background: linear-gradient(135deg, #1565c0, #1976d2);
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
      color: #1976d2;
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

    /* Topics Container - Compact Version */
    .topics-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .topics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .topics-title {
      font-size: 1.6rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    /* Content Cards (similar to topic-detail structure) - Compact Version */
    .topic-card {
      margin-bottom: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      background: white;
    }
    
    .topic-card:hover {
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }
      
    .topic-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #e0e0e0;
    }
    
    .topic-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #7b1fa2, #9c27b0);
      color: white;
      border-radius: 50%;
      font-size: 1.1rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    
    .topic-info {
      flex: 1;
      min-width: 0;
    }
    
    .topic-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 6px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .topic-title::before {
      content: "📚";
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .topic-meta {
      display: flex;
      gap: 16px;
      color: #666;
      font-size: 0.85rem;
    }
    
    .topic-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .topic-meta mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }
    
    .topic-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    
    .view-all-btn {
      border-radius: 6px !important;
      padding: 0 14px !important;
      height: 36px !important;
      font-weight: 500 !important;
      font-size: 0.9rem !important;
      background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%) !important;
      color: white !important;
      border: none !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 2px 8px rgba(123, 31, 162, 0.3) !important;
    }
    
    .view-all-btn:hover {
      background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(123, 31, 162, 0.4) !important;
    }
    
    .view-all-btn mat-icon {
      margin-right: 4px !important;
    }
    
    .expand-button {
      transition: transform 0.3s ease;
      width: 36px !important;
      height: 36px !important;
      color: #666 !important;
      background: rgba(158, 158, 158, 0.1) !important;
      border-radius: 50% !important;
    }
    
    .expand-button:hover {
      background: rgba(158, 158, 158, 0.2) !important;
      color: #424242 !important;
      transform: scale(1.1);
    }
    
    .expand-button.expanded {
      transform: rotate(180deg);
      background: rgba(158, 158, 158, 0.2) !important;
      color: #424242 !important;
    }
    
    /* Content List - Compact Version */
    .lessons-list {
      padding: 8px 20px;
      background: #fafbfc;
    }
    
    /* Content Table - Compact Version */
    .lessons-table-container {
      background: white;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 6px rgba(0,0,0,0.08);
      border-left: 3px solid #2e7d32;
    }
    
    .lessons-table {
      width: 100%;
      border-collapse: collapse;
      margin: 0;
    }
    
    .lessons-table tbody tr {
      border-bottom: 1px solid #e9ecef;
      transition: background-color 0.2s ease;
    }
    
    .lessons-table tbody tr:hover {
      background: #f8f9fa;
    }
    
    .lessons-table tbody tr:last-child {
      border-bottom: none;
    }
    
    .lessons-table tbody td {
      padding: 12px 10px;
      vertical-align: middle;
    }
    
    .lesson-num-cell {
      text-align: center;
      font-weight: 600;
      color: #2e7d32;
      font-size: 0.9rem;
    }
    
    .lesson-title-cell .lesson-title {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }
    
    .lesson-duration-cell {
      color: #666;
      font-size: 0.9rem;
    }
    
    .lesson-duration-cell span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .lesson-duration-cell mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #2e7d32;
    }
    
    .no-duration {
      color: #999;
      font-style: italic;
    }
    
    .lesson-status-cell {
      text-align: center;
    }
    
    .lesson-status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .lesson-status-badge.free {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .lesson-status-badge.premium {
      background: #e8f5e8;
      color: #2e7d32;
    }
    
    .lesson-action-cell {
      text-align: center;
    }
    
    .view-lesson-btn-table {
      border-radius: 6px !important;
      padding: 0 16px !important;
      height: 36px !important;
      font-weight: 500 !important;
      font-size: 0.9rem !important;
      min-width: 100px !important;
      border: 2px solid #2e7d32 !important;
      color: #2e7d32 !important;
      background: white !important;
      transition: all 0.3s ease !important;
    }
    
    .view-lesson-btn-table:hover {
      background: #2e7d32 !important;
      color: white !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 3px 10px rgba(46, 125, 50, 0.3) !important;
    }
    
    .view-lesson-btn-table mat-icon {
      font-size: 16px !important;
      width: 16px !important;
      height: 16px !important;
      margin-right: 6px !important;
    }

    /* Mobile Card View */
    .lessons-cards-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .lesson-card {
      background: white;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 1px 6px rgba(0,0,0,0.08);
      border: 1px solid #e0e0e0;
      border-left: 3px solid #2e7d32;
      transition: all 0.3s ease;
    }
    
    .lesson-card:hover {
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
      transform: translateY(-1px);
    }
    
    .lesson-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    
    .lesson-number-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #2e7d32, #4caf50);
      color: white;
      border-radius: 50%;
      font-size: 0.8rem;
      font-weight: 600;
      flex-shrink: 0;
    }
    
    .lesson-card-title {
      flex: 1;
      font-size: 0.9rem;
      font-weight: 600;
      color: #2c3e50;
      line-height: 1.3;
    }
    
    .lesson-card-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }
    
    .lesson-card-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .lesson-duration-info {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.8rem;
    }
    
    .lesson-duration-info mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #2e7d32;
    }
    
    .lesson-duration-info .no-duration {
      color: #999;
      font-style: italic;
    }
    
    .lesson-card-action {
      flex-shrink: 0;
    }
    
    .view-lesson-btn-mobile {
      border-radius: 6px !important;
      padding: 0 12px !important;
      height: 32px !important;
      font-weight: 500 !important;
      font-size: 0.8rem !important;
      min-width: 100px !important;
      border: 2px solid #2e7d32 !important;
      color: #2e7d32 !important;
      background: white !important;
      transition: all 0.3s ease !important;
    }
    
    .view-lesson-btn-mobile:hover {
      background: #2e7d32 !important;
      color: white !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 3px 10px rgba(46, 125, 50, 0.3) !important;
    }
    
    .view-lesson-btn-mobile mat-icon {
      font-size: 16px !important;
      width: 16px !important;
      height: 16px !important;
      margin-right: 4px !important;
    }

    /* Responsive Visibility Classes */
    .desktop-only {
      display: block;
    }
    
    .mobile-only {
      display: none;
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
      
      .content-section {
        padding: 20px 16px 40px;
      }
      
      .course-header {
        padding: 20px;
        margin: 16px 0 20px 0;
      }
      
      .course-header .course-title {
        font-size: 1.8rem;
      }
      
      .course-info {
        gap: 16px;
      }
      
      .course-stats {
        gap: 20px;
        padding: 16px;
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

    @media (max-width: 768px) {
      .topic-header {
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      
      .topic-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .view-all-btn {
        flex: 1 !important;
        margin-right: 8px !important;
        background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 2px 8px rgba(123, 31, 162, 0.3) !important;
      }
      
      .view-all-btn:hover {
        background: linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 3px 10px rgba(123, 31, 162, 0.4) !important;
      }
      
      .topic-meta {
        flex-direction: column;
        gap: 6px;
      }
      
      /* Responsive visibility switches */
      .desktop-only {
        display: none !important;
      }
      
      .mobile-only {
        display: block !important;
      }
      
      /* Mobile card adjustments */
      .lessons-cards-container {
        gap: 8px;
      }
      
      .lesson-card {
        padding: 10px;
      }
      
      .lesson-card-header {
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 8px;
      }
      
      .lesson-number-badge {
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
      }
      
      .lesson-card-title {
        font-size: 0.85rem;
        min-width: 0;
      }
      
      .lesson-card-content {
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      
      .lesson-card-action {
        width: 100%;
      }
      
      .view-lesson-btn-mobile {
        width: 100% !important;
        height: 36px !important;
        font-size: 0.85rem !important;
        justify-content: center !important;
        border: 2px solid #2e7d32 !important;
        color: #2e7d32 !important;
        background: white !important;
        transition: all 0.3s ease !important;
      }
      
      .view-lesson-btn-mobile:hover {
        background: #2e7d32 !important;
        color: white !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 3px 10px rgba(46, 125, 50, 0.3) !important;
      }
    }

    @media (max-width: 480px) {
      .lesson-card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .lesson-number-badge {
        align-self: flex-start;
      }
      
      .lesson-card-title {
        font-size: 0.85rem;
        line-height: 1.4;
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
    private lessonService: LessonService
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
      
      // Expand all topics by default when viewing a specific course
      if (this.isViewingSpecificCourse) {
        this.inlineExpandedTopics.clear();
        for (let i = 0; i < this.topics.length; i++) {
          this.inlineExpandedTopics.add(i);
        }
      }
      
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
        
        // Expand all topics by default when viewing a specific course
        if (this.isViewingSpecificCourse) {
          this.inlineExpandedTopics.clear();
          for (let i = 0; i < this.topics.length; i++) {
            this.inlineExpandedTopics.add(i);
          }
        }
        
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

  viewAllTopicDetails(topicIndex: number, event: Event) {
    // Prevent event bubbling to avoid triggering toggleTopic
    event.stopPropagation();
    
    // Navigate to the topic detail view for full content with keynotes and tags
    const topic = this.topics[topicIndex];
    if (topic) {
      this.router.navigate(['/topic', topic.topicId]);
    }
  }  viewLessonDetails(lessonId: number, topicId: number) {
    // Navigate directly to the lesson detail page
    this.router.navigate(['/lesson', lessonId], {
      queryParams: {
        topicId: topicId,
        courseId: this.selectedCourseId,
        source: 'course'
      }
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
