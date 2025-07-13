import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CourseService, Course } from '../../../service/course.service';
import { CategoryService, Category } from '../../../service/category.service';
import { TopicService, LessonService, Topic as TopicType } from '../../../service/lesson.service';
import { AuthService } from '../../../service/auth.service';
import { PurchaseFormComponent } from '../purchase-form/purchase-form.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule
  ],
  template: `
    <div class="course-details-page">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
        <p>Loading course details...</p>
      </div>

      <!-- Course Details Content -->
      <div *ngIf="!loading && course" class="course-content">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-background">
            <img *ngIf="course.thumbnailUrl" [src]="course.thumbnailUrl" [alt]="course.title" class="hero-image">
            <div class="hero-overlay"></div>
          </div>
          <div class="hero-content">
            <div class="container">
              <div class="course-header">
                <div class="breadcrumb">
                  <button mat-button (click)="goBack()" class="back-btn">
                    <mat-icon>arrow_back</mat-icon>
                    Back to Courses
                  </button>
                  <span class="category-tag">{{ getCategoryName() }}</span>
                </div>
                <h1 class="course-title">{{ course.title }}</h1>
                <p class="course-subtitle">{{ course.description || 'Master the ancient wisdom of Vedic Astrology' }}</p>
                
                <div class="course-meta">
                  <div class="meta-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{ getTotalDuration() }} minutes</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>menu_book</mat-icon>
                    <span>{{ getTotalLessons() }} lessons</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>topic</mat-icon>
                    <span>{{ topics.length }} topics</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>trending_up</mat-icon>
                    <span>{{ course.difficultyLevel | titlecase }}</span>
                  </div>
                </div>

                <div class="course-actions">
                  <button *ngIf="hasAccess" 
                          mat-raised-button 
                          color="primary" 
                          class="start-btn"
                          (click)="startCourse()">
                    <mat-icon>play_arrow</mat-icon>
                    Start Learning
                  </button>
                  <button *ngIf="!hasAccess && course.price && course.price > 0" 
                          mat-raised-button 
                          color="accent" 
                          class="purchase-btn"
                          (click)="purchaseCourse()">
                    <mat-icon>shopping_cart</mat-icon>
                    Purchase for ₹{{ course.price }}
                  </button>
                  <button *ngIf="!hasAccess && (!course.price || course.price === 0)" 
                          mat-raised-button 
                          color="primary" 
                          class="enroll-btn"
                          (click)="enrollFree()">
                    <mat-icon>card_giftcard</mat-icon>
                    Enroll for Free
                  </button>
                  <button mat-stroked-button class="preview-btn" (click)="previewCourse()">
                    <mat-icon>visibility</mat-icon>
                    Preview Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Information Tabs -->
        <div class="course-info-section">
          <div class="container">
            <mat-tab-group class="course-tabs" animationDuration="300ms">
              <!-- Overview Tab -->
              <mat-tab label="Overview">
                <div class="tab-content overview-content">
                  <div class="overview-grid">
                    <div class="description-section">
                      <h3>About This Course</h3>
                      <div class="course-description" [innerHTML]="course.description"></div>
                      
                      <div class="learning-outcomes" *ngIf="learningOutcomes.length > 0">
                        <h4>What You'll Learn</h4>
                        <ul class="outcomes-list">
                          <li *ngFor="let outcome of learningOutcomes">
                            <mat-icon>check_circle</mat-icon>
                            <span>{{ outcome }}</span>
                          </li>
                        </ul>
                      </div>

                      <div class="prerequisites" *ngIf="prerequisites.length > 0">
                        <h4>Prerequisites</h4>
                        <ul class="prerequisites-list">
                          <li *ngFor="let prerequisite of prerequisites">
                            <mat-icon>info</mat-icon>
                            <span>{{ prerequisite }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="course-stats">
                      <div class="stats-card">
                        <h4>Course Statistics</h4>
                        <div class="stat-grid">
                          <div class="stat-item">
                            <mat-icon>people</mat-icon>
                            <div class="stat-info">
                              <span class="stat-value">{{ enrollmentCount }}</span>
                              <span class="stat-label">Students Enrolled</span>
                            </div>
                          </div>
                          <div class="stat-item">
                            <mat-icon>star</mat-icon>
                            <div class="stat-info">
                              <span class="stat-value">{{ rating }}/5</span>
                              <span class="stat-label">Average Rating</span>
                            </div>
                          </div>
                          <div class="stat-item">
                            <mat-icon>update</mat-icon>
                            <div class="stat-info">
                              <span class="stat-value">{{ getLastUpdated() }}</span>
                              <span class="stat-label">Last Updated</span>
                            </div>
                          </div>
                          <div class="stat-item">
                            <mat-icon>language</mat-icon>
                            <div class="stat-info">
                              <span class="stat-value">{{ language || 'English' }}</span>
                              <span class="stat-label">Language</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="price-card" *ngIf="course.price && course.price > 0">
                        <h4>Course Pricing</h4>
                        <div class="price-info">
                          <span class="current-price">₹{{ course.price }}</span>
                          <span *ngIf="originalPrice && originalPrice > course.price" class="original-price">₹{{ originalPrice }}</span>
                        </div>
                        <div class="price-features">
                          <div class="feature">
                            <mat-icon>check</mat-icon>
                            <span>Lifetime Access</span>
                          </div>
                          <div class="feature">
                            <mat-icon>check</mat-icon>
                            <span>Mobile & Desktop</span>
                          </div>
                          <div class="feature">
                            <mat-icon>check</mat-icon>
                            <span>Certificate of Completion</span>
                          </div>
                        </div>
                      </div>

                      <div class="free-features" *ngIf="!course.price || course.price === 0">
                        <h4>Free Course Includes</h4>
                        <div class="feature">
                          <mat-icon>check</mat-icon>
                          <span>Full Access to All Lessons</span>
                        </div>
                        <div class="feature">
                          <mat-icon>check</mat-icon>
                          <span>Mobile & Desktop Access</span>
                        </div>
                        <div class="feature">
                          <mat-icon>check</mat-icon>
                          <span>Community Support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-tab>

              <!-- Curriculum Tab -->
              <mat-tab label="Curriculum">
                <div class="tab-content curriculum-content">
                  <div class="curriculum-header">
                    <h3>Course Curriculum</h3>
                    <p>{{ topics.length }} topics • {{ getTotalLessons() }} lessons • {{ getTotalDuration() }} min total length</p>
                  </div>

                  <mat-accordion class="curriculum-accordion">
                    <mat-expansion-panel *ngFor="let topic of topics; let i = index" class="topic-panel">
                      <mat-expansion-panel-header>
                        <mat-panel-title>
                          <div class="topic-header">
                            <span class="topic-number">{{ i + 1 }}</span>
                            <span class="topic-title">{{ topic.title }}</span>
                          </div>
                        </mat-panel-title>
                        <mat-panel-description>
                          <div class="topic-meta">
                            <span>{{ topic.lessons.length || 0 }} lessons</span>
                            <span>{{ getTopicDuration(topic) }} min</span>
                          </div>
                        </mat-panel-description>
                      </mat-expansion-panel-header>
                      
                      <div class="topic-content">
                        <p class="topic-description">{{ topic.description }}</p>
                        <div class="lessons-list" *ngIf="topic.lessons && topic.lessons.length > 0">
                          <div class="lesson-item" *ngFor="let lesson of topic.lessons; let j = index">
                            <div class="lesson-info">
                              <mat-icon class="lesson-icon">play_circle_outline</mat-icon>
                              <span class="lesson-title">{{ lesson.title }}</span>
                            </div>
                            <div class="lesson-meta">
                              <span class="lesson-duration" *ngIf="lesson.duration">{{ lesson.duration }} min</span>
                              <mat-icon *ngIf="lesson.isFree" class="free-icon" title="Free lesson">card_giftcard</mat-icon>
                              <mat-icon *ngIf="!lesson.isFree" class="premium-icon" title="Premium lesson">lock</mat-icon>
                            </div>
                          </div>
                        </div>
                      </div>
                    </mat-expansion-panel>
                  </mat-accordion>
                </div>
              </mat-tab>

              <!-- Instructor Tab -->
              <mat-tab label="Instructor">
                <div class="tab-content instructor-content">
                  <div class="instructor-profile">
                    <div class="instructor-avatar">
                      <mat-icon>person</mat-icon>
                    </div>
                    <div class="instructor-info">
                      <h3>{{ instructorName || 'Vedic Astrology Expert' }}</h3>
                      <p class="instructor-title">{{ instructorTitle || 'Master Astrologer & Spiritual Guide' }}</p>
                      <div class="instructor-stats">
                        <div class="stat">
                          <mat-icon>school</mat-icon>
                          <span>{{ instructorCourses || '10+' }} Courses</span>
                        </div>
                        <div class="stat">
                          <mat-icon>people</mat-icon>
                          <span>{{ instructorStudents || '1000+' }} Students</span>
                        </div>
                        <div class="stat">
                          <mat-icon>star</mat-icon>
                          <span>{{ instructorRating || '4.8' }} Rating</span>
                        </div>
                      </div>
                      <div class="instructor-bio">
                        <p>{{ instructorBio || 'Experienced Vedic astrologer with over 15 years of practice in traditional astrology, spiritual guidance, and ancient wisdom teachings.' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-tab>

              <!-- Reviews Tab -->
              <mat-tab label="Reviews">
                <div class="tab-content reviews-content">
                  <div class="reviews-header">
                    <h3>Student Reviews</h3>
                    <div class="rating-summary">
                      <div class="rating-score">
                        <span class="score">{{ rating }}</span>
                        <div class="stars">
                          <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                                   [class.filled]="star <= rating">star</mat-icon>
                        </div>
                        <span class="reviews-count">({{ reviewsCount }} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="reviews-list">
                    <div class="review-item" *ngFor="let review of reviews">
                      <div class="reviewer-info">
                        <div class="reviewer-avatar">
                          <mat-icon>person</mat-icon>
                        </div>
                        <div class="reviewer-details">
                          <h5>{{ review.name }}</h5>
                          <div class="review-rating">
                            <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                                     [class.filled]="star <= review.rating">star</mat-icon>
                          </div>
                          <span class="review-date">{{ review.date }}</span>
                        </div>
                      </div>
                      <p class="review-text">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </mat-tab>
            </mat-tab-group>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="!loading && !course" class="error-container">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h3>Course not found</h3>
        <p>The requested course could not be loaded.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Courses
        </button>
      </div>
    </div>
  `,
  styles: [`
    .course-details-page {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      color: #666;
    }

    .loading-container p {
      margin-top: 20px;
      font-size: 1.1rem;
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      overflow: hidden;
      min-height: 60vh;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.3;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      min-height: 60vh;
      padding: 40px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      width: 100%;
    }

    .course-header {
      max-width: 800px;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .back-btn {
      color: white !important;
      opacity: 0.9;
    }

    .back-btn:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1) !important;
    }

    .category-tag {
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .course-title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .course-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0 0 32px 0;
      line-height: 1.4;
    }

    .course-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-bottom: 32px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      font-weight: 500;
    }

    .meta-item mat-icon {
      opacity: 0.8;
    }

    .course-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .start-btn,
    .purchase-btn,
    .enroll-btn {
      height: 48px;
      padding: 0 32px !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      border-radius: 24px !important;
    }

    .preview-btn {
      height: 48px;
      padding: 0 24px !important;
      border-radius: 24px !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
      color: white !important;
    }

    .preview-btn:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: white !important;
    }

    /* Course Information Section */
    .course-info-section {
      background: white;
      margin-top: -40px;
      position: relative;
      z-index: 3;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    }

    .course-tabs {
      padding: 40px 0;
    }

    .tab-content {
      padding: 32px 0;
    }

    /* Overview Tab */
    .overview-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 48px;
    }

    .description-section h3,
    .description-section h4 {
      color: #2c3e50;
      margin-bottom: 16px;
    }

    .course-description {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4a5568;
      margin-bottom: 32px;
    }

    .outcomes-list,
    .prerequisites-list {
      list-style: none;
      padding: 0;
    }

    .outcomes-list li,
    .prerequisites-list li {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .outcomes-list li:hover,
    .prerequisites-list li:hover {
      background: #f8f9fa;
    }

    .outcomes-list mat-icon {
      color: #4caf50;
    }

    .prerequisites-list mat-icon {
      color: #2196f3;
    }

    /* Stats and Price Cards */
    .stats-card,
    .price-card,
    .free-features {
      background: #f8f9fa;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .stats-card h4,
    .price-card h4,
    .free-features h4 {
      color: #2c3e50;
      margin: 0 0 20px 0;
    }

    .stat-grid {
      display: grid;
      gap: 16px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #666;
    }

    .price-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .current-price {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
    }

    .original-price {
      font-size: 1.2rem;
      color: #999;
      text-decoration: line-through;
    }

    .price-features .feature,
    .free-features .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #4a5568;
    }

    .price-features mat-icon,
    .free-features mat-icon {
      color: #4caf50;
      font-size: 1.2rem;
    }

    /* Curriculum Tab */
    .curriculum-header {
      margin-bottom: 32px;
    }

    .curriculum-header h3 {
      color: #2c3e50;
      margin-bottom: 8px;
    }

    .curriculum-header p {
      color: #666;
      font-size: 1rem;
    }

    .curriculum-accordion {
      box-shadow: none;
    }

    .topic-panel {
      margin-bottom: 16px;
      border-radius: 12px !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    }

    .topic-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .topic-number {
      width: 32px;
      height: 32px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .topic-title {
      font-weight: 600;
      color: #2c3e50;
    }

    .topic-meta {
      display: flex;
      gap: 16px;
      color: #666;
      font-size: 0.9rem;
    }

    .topic-content {
      padding-top: 16px;
    }

    .topic-description {
      color: #4a5568;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .lessons-list {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
    }

    .lesson-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e9ecef;
    }

    .lesson-item:last-child {
      border-bottom: none;
    }

    .lesson-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .lesson-icon {
      color: #667eea;
    }

    .lesson-title {
      color: #2c3e50;
      font-weight: 500;
    }

    .lesson-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .lesson-duration {
      color: #666;
      font-size: 0.9rem;
    }

    .free-icon {
      color: #4caf50;
      font-size: 1.2rem;
    }

    .premium-icon {
      color: #ff9800;
      font-size: 1.2rem;
    }

    /* Instructor Tab */
    .instructor-profile {
      display: flex;
      gap: 32px;
      align-items: flex-start;
    }

    .instructor-avatar {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .instructor-avatar mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: white;
    }

    .instructor-info h3 {
      color: #2c3e50;
      margin: 0 0 8px 0;
    }

    .instructor-title {
      color: #667eea;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .instructor-stats {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }

    .instructor-stats .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4a5568;
    }

    .instructor-bio {
      color: #4a5568;
      line-height: 1.6;
    }

    /* Reviews Tab */
    .reviews-header {
      margin-bottom: 32px;
    }

    .reviews-header h3 {
      color: #2c3e50;
      margin-bottom: 16px;
    }

    .rating-summary {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .rating-score {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .score {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
    }

    .stars {
      display: flex;
      gap: 4px;
    }

    .stars mat-icon {
      color: #ddd;
      font-size: 1.2rem;
    }

    .stars mat-icon.filled {
      color: #ffb400;
    }

    .reviews-count {
      color: #666;
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .review-item {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
    }

    .reviewer-info {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .reviewer-avatar {
      width: 48px;
      height: 48px;
      background: #667eea;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .reviewer-avatar mat-icon {
      color: white;
    }

    .reviewer-details h5 {
      color: #2c3e50;
      margin: 0 0 4px 0;
    }

    .review-rating {
      display: flex;
      gap: 2px;
      margin-bottom: 4px;
    }

    .review-rating mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: #ddd;
    }

    .review-rating mat-icon.filled {
      color: #ffb400;
    }

    .review-date {
      color: #666;
      font-size: 0.85rem;
    }

    .review-text {
      color: #4a5568;
      line-height: 1.6;
      margin: 0;
    }

    /* Error State */
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
    }

    .error-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ff5722;
      margin-bottom: 20px;
    }

    .error-container h3 {
      color: #2c3e50;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #666;
      margin-bottom: 24px;
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .overview-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .instructor-profile {
        flex-direction: column;
        text-align: center;
      }

      .instructor-stats {
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .hero-content {
        min-height: 50vh;
      }

      .course-title {
        font-size: 2rem;
      }

      .course-meta {
        flex-direction: column;
        gap: 12px;
      }

      .course-actions {
        flex-direction: column;
      }

      .start-btn,
      .purchase-btn,
      .enroll-btn,
      .preview-btn {
        width: 100%;
      }

      .container {
        padding: 0 16px;
      }
    }
  `]
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  topics: TopicType[] = [];
  categories: Category[] = [];
  loading = true;
  hasAccess = false;
  
  // Mock data for enhanced features
  enrollmentCount = 1250;
  rating = 4.8;
  reviewsCount = 89;
  language = 'English';
  originalPrice: number | null = null;
  
  instructorName = 'Dr. Rajesh Sharma';
  instructorTitle = 'Master Vedic Astrologer';
  instructorCourses = 12;
  instructorStudents = 5000;
  instructorRating = 4.9;
  instructorBio = 'Dr. Rajesh Sharma is a renowned Vedic astrologer with over 20 years of experience in traditional astrology, spiritual guidance, and ancient wisdom teachings. He has guided thousands of students on their spiritual journey.';
  
  learningOutcomes = [
    'Master the fundamentals of Vedic astrology',
    'Learn to read and interpret birth charts',
    'Understand planetary influences and their meanings',
    'Apply astrological principles to daily life',
    'Develop intuitive abilities for astrological reading'
  ];
  
  prerequisites = [
    'Basic understanding of astronomy',
    'Interest in spiritual and ancient wisdom',
    'Open mind and willingness to learn'
  ];
  
  reviews = [
    {
      name: 'Priya Sharma',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent course! The instructor explains complex concepts in a very understandable way. I learned so much about Vedic astrology.'
    },
    {
      name: 'Amit Kumar',
      rating: 4,
      date: '1 month ago',
      comment: 'Great content and well-structured lessons. The practical examples really helped me understand the concepts better.'
    },
    {
      name: 'Sneha Patel',
      rating: 5,
      date: '2 months ago',
      comment: 'This course exceeded my expectations. The depth of knowledge and practical applications are amazing.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private topicService: TopicService,
    private lessonService: LessonService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourseDetails(parseInt(courseId, 10));
    }
  }

  loadCourseDetails(courseId: number): void {
    this.loading = true;
    
    // Load course details
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loadCategories();
        this.loadTopicsAndLessons(courseId);
        this.checkUserAccess(courseId);
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadTopicsAndLessons(courseId: number): void {
    this.topicService.getTopicsByCourseId(courseId).subscribe({
      next: (topics) => {
        this.topics = topics;
        // Load lessons for each topic
        const lessonPromises = topics.map(topic =>
          this.lessonService.getLessonsByTopicId(topic.topicId).toPromise()
            .then(lessons => ({ ...topic, lessons: lessons || [] }))
        );
        
        Promise.all(lessonPromises).then(topicsWithLessons => {
          this.topics = topicsWithLessons;
          this.loading = false;
        });
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }

  checkUserAccess(courseId: number): void {
    // TODO: Implement access check based on user enrollment/purchase
    // For now, assume no access for demonstration
    this.hasAccess = false;
  }

  getCategoryName(): string {
    if (!this.course || !this.categories.length) return '';
    const category = this.categories.find(cat => cat.categoryId === this.course!.categoryId);
    return category ? category.name : '';
  }

  getTotalLessons(): number {
    return this.topics.reduce((total, topic) => total + (topic.lessons?.length || 0), 0);
  }

  getTotalDuration(): number {
    let totalMinutes = 0;
    this.topics.forEach(topic => {
      if (topic.lessons) {
        topic.lessons.forEach(lesson => {
          if (lesson.duration) {
            totalMinutes += lesson.duration;
          }
        });
      }
    });
    return totalMinutes;
  }

  getTopicDuration(topic: TopicType): number {
    if (!topic.lessons) return 0;
    return topic.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
  }

  getLastUpdated(): string {
    // Since Course interface doesn't have createdAt/updatedAt, return a placeholder
    return 'Recently updated';
  }

  startCourse(): void {
    if (this.course) {
      this.router.navigate(['/course', this.course.courseId]);
    }
  }

  purchaseCourse(): void {
    if (!this.course) return;
    
    const dialogRef = this.dialog.open(PurchaseFormComponent, {
      width: '500px',
      data: { course: this.course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.hasAccess = true;
        // Show success message
      }
    });
  }

  enrollFree(): void {
    // TODO: Implement free enrollment
    this.hasAccess = true;
  }

  previewCourse(): void {
    if (this.course) {
      this.router.navigate(['/course', this.course.courseId], {
        queryParams: { preview: true }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
