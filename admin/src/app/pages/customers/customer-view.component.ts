import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService, Category } from '../../services/category.service';
import { CourseService, Course } from '../../services/course.service';
import { TopicService, Topic } from '../../services/topic.service';
import { LessonService, Lesson } from '../../services/lesson.service';
import { LessonKeynoteService, LessonKeynote } from '../../services/lesson-keynote.service';
import { TagService, Tag } from '../../services/tag.service';
import { LessonTagService, LessonTag } from '../../services/lesson-tag.service';

@Component({
  selector: 'app-customer-view',
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
  ],template: `
    <div class="modern-customer-view">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Discover Vedic Astrology</h1>
          <p class="hero-subtitle">Explore ancient wisdom through our comprehensive courses</p>
        </div>
        <div class="hero-bg-pattern"></div>
      </div>

      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-container">
          <div class="filter-group">            <mat-form-field appearance="fill" class="modern-select">
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
        <!-- Course Heading -->
        <div class="course-heading-section">
          <div class="course-heading-content">
            <div class="course-breadcrumb">
              <span class="breadcrumb-item">{{getCategoryName(selectedCourse.categoryId)}}</span>
              <mat-icon class="breadcrumb-separator">chevron_right</mat-icon>
              <span class="breadcrumb-item current">{{selectedCourse.title}}</span>
            </div>
            <h1 class="course-main-title">{{selectedCourse.title}}</h1>
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
                  <span>₹{{selectedCourse.price}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Course Overview -->
        <div class="course-overview">
          <div class="course-info">
            <div class="course-meta">
              <span class="difficulty-badge" [class]="'diff-' + selectedCourse.difficultyLevel">{{selectedCourse.difficultyLevel | titlecase}}</span>
              <span *ngIf="selectedCourse.price" class="price-badge">₹{{selectedCourse.price}}</span>
            </div>
            <h2 class="course-title">{{selectedCourse.title}}</h2>
            <div class="course-description" [innerHTML]="selectedCourse.description"></div>
          </div>
          <div class="course-visual" *ngIf="selectedCourse.thumbnailUrl">
            <img [src]="selectedCourse.thumbnailUrl" [alt]="selectedCourse.title" class="course-image">
          </div>
        </div>        <!-- Topics & Lessons -->
        <div class="topics-container">          <!-- Collapse All Button -->
          <div class="topics-header" *ngIf="topics.length > 0">
            <h3 class="topics-title">Course Topics</h3>
            <div class="topics-actions">              <button 
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
          </div>
          
          <div *ngFor="let topic of topics; let i = index" class="topic-block">            <div class="topic-header-modern" (click)="toggleTopic(i)">
              <div class="topic-number">{{i + 1}}</div>
              <div class="topic-info">
                <h3 class="topic-title-modern">{{topic.title}}</h3>
                <div class="topic-desc-modern" [innerHTML]="topic.description"></div>
              </div>
              <button mat-icon-button class="expand-button" [class.expanded]="inlineExpandedTopics.has(i)">
                <mat-icon>{{inlineExpandedTopics.has(i) ? 'expand_less' : 'expand_more'}}</mat-icon>
              </button>
            </div>
            
            <!-- Expanded Topic Content (Full Screen) - Only for individual clicks -->
            <div *ngIf="expandedTopics.has(i)" class="topic-expanded-overlay" (click)="closeTopic(i, $event)">
              <div class="topic-expanded-content" (click)="$event.stopPropagation()">
                <!-- Header with Close Button -->
                <div class="expanded-header">
                  <div class="expanded-header-info">
                    <div class="topic-number-large">{{i + 1}}</div>
                    <div>
                      <h2 class="expanded-topic-title">{{topic.title}}</h2>
                      <div class="expanded-topic-desc" [innerHTML]="topic.description"></div>
                    </div>
                  </div>
                  <button mat-icon-button class="close-button" (click)="closeTopic(i, $event)">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>
                
                <!-- Lessons Content -->
                <div class="expanded-lessons-container">
                  <div *ngFor="let lesson of topic.lessons; let j = index" class="lesson-item">
                    <div class="lesson-content">
                      <div class="lesson-header-modern">
                        <h4 class="lesson-title-modern">{{lesson.title}}</h4>
                        <div class="lesson-status">
                          <span class="status-badge" [class]="lesson.isFree ? 'free' : 'premium'">
                            {{lesson.isFree ? 'Free' : 'Premium'}}
                          </span>
                        </div>
                      </div>
                      <div class="lesson-desc-modern" [innerHTML]="lesson.description"></div>
                      
                      <!-- Keynotes -->
                      <div *ngIf="lesson.keynotes && lesson.keynotes.length > 0" class="keynotes-modern">
                        <h5 class="section-title">Key Insights</h5>
                        <div class="keynotes-list">
                          <div *ngFor="let keynote of lesson.keynotes" class="keynote-item" [class.important]="keynote.isImportant">
                            <div class="keynote-header">
                              <span class="keynote-title-modern">{{keynote.title}}</span>
                              <div class="keynote-meta" *ngIf="keynote.relatedPlanet || keynote.relatedZodiac">
                                <span *ngIf="keynote.relatedPlanet" class="meta-tag planet">{{keynote.relatedPlanet}}</span>
                                <span *ngIf="keynote.relatedZodiac" class="meta-tag zodiac">{{keynote.relatedZodiac}}</span>
                              </div>
                            </div>
                            <div class="keynote-content-modern" [innerHTML]="keynote.content"></div>
                          </div>
                        </div>
                      </div>

                      <!-- Tags -->
                      <div *ngIf="lesson.tags && lesson.tags.length > 0" class="tags-modern">
                        <div class="tag-list">
                          <span *ngFor="let tag of lesson.tags" class="tag-modern">{{tag.tagName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Inline Expanded Content OR Collapsed Preview -->
            <div class="lessons-grid" 
                 [class.inline-expanded]="inlineExpandedTopics.has(i)"
                 *ngIf="!expandedTopics.has(i)">
              <div *ngFor="let lesson of getDisplayLessons(topic, i); let j = index" class="lesson-item" 
                   [class.lesson-preview]="!inlineExpandedTopics.has(i) && j >= 2">
                <div class="lesson-content">
                  <div class="lesson-header-modern">
                    <h4 class="lesson-title-modern">{{lesson.title}}</h4>
                    <div class="lesson-status">
                      <span class="status-badge" [class]="lesson.isFree ? 'free' : 'premium'">
                        {{lesson.isFree ? 'Free' : 'Premium'}}
                      </span>
                    </div>
                  </div>
                  <div class="lesson-desc-modern" 
                       [class.lesson-desc-preview]="!inlineExpandedTopics.has(i)" 
                       [innerHTML]="lesson.description"></div>
                  
                  <!-- Keynotes - Show only when inline expanded -->
                  <div *ngIf="inlineExpandedTopics.has(i) && lesson.keynotes && lesson.keynotes.length > 0" class="keynotes-modern">
                    <h5 class="section-title">Key Insights</h5>
                    <div class="keynotes-list">
                      <div *ngFor="let keynote of lesson.keynotes" class="keynote-item" [class.important]="keynote.isImportant">
                        <div class="keynote-header">
                          <span class="keynote-title-modern">{{keynote.title}}</span>
                          <div class="keynote-meta" *ngIf="keynote.relatedPlanet || keynote.relatedZodiac">
                            <span *ngIf="keynote.relatedPlanet" class="meta-tag planet">{{keynote.relatedPlanet}}</span>
                            <span *ngIf="keynote.relatedZodiac" class="meta-tag zodiac">{{keynote.relatedZodiac}}</span>
                          </div>
                        </div>
                        <div class="keynote-content-modern" [innerHTML]="keynote.content"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Tags - Show only when inline expanded -->
                  <div *ngIf="inlineExpandedTopics.has(i) && lesson.tags && lesson.tags.length > 0" class="tags-modern">
                    <div class="tag-list">
                      <span *ngFor="let tag of lesson.tags" class="tag-modern">{{tag.tagName}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div *ngIf="!inlineExpandedTopics.has(i) && topic.lessons.length > 2" class="more-lessons-indicator">
                <p>+{{topic.lessons.length - 2}} more lessons... <span class="click-hint">Click to expand</span></p>
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
  styles: [`    .modern-customer-view {
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
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 16px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    /* Filter Section */
    .filter-section {
      background: white;
      padding: 40px 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .filter-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .filter-group {
      display: flex;
      gap: 24px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .modern-select {
      min-width: 280px;
      font-size: 16px;
    }

    /* Loading Section */
    .loading-section {
      text-align: center;
      padding: 80px 20px;
      color: white;
    }
    
    .loading-section p {
      margin-top: 20px;
      font-size: 1.1rem;
      opacity: 0.8;
    }    /* Content Section */
    .content-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    /* Course Heading Section */
    .course-heading-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 16px;
      margin-bottom: 40px;
      position: relative;
      overflow: hidden;
    }
    
    .course-heading-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="25" cy="75" r="0.5" fill="white" opacity="0.1"/><circle cx="75" cy="25" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      pointer-events: none;
    }
    
    .course-heading-content {
      position: relative;
      z-index: 2;
    }
    
    .course-breadcrumb {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      font-size: 0.9rem;
      opacity: 0.9;
    }
    
    .breadcrumb-item {
      font-weight: 500;
    }
    
    .breadcrumb-item.current {
      opacity: 1;
      font-weight: 600;
    }
    
    .breadcrumb-separator {
      margin: 0 8px;
      font-size: 1rem;
    }
    
    .course-main-title {
      font-size: 2.8rem;
      font-weight: 700;
      margin: 0 0 24px 0;
      line-height: 1.2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .course-summary {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .course-stats {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.15);
      padding: 12px 16px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .stat-item:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
    
    .stat-item mat-icon {
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }
    
    .difficulty {
      text-transform: capitalize;
    }

    /* Course Overview */
    .course-overview {
      background: white;
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 40px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      display: flex;
      gap: 40px;
      align-items: center;
    }
    
    .course-info {
      flex: 1;
    }
    
    .course-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .difficulty-badge, .price-badge {
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .difficulty-badge.diff-beginner { background: #e8f5e8; color: #2e7d32; }
    .difficulty-badge.diff-intermediate { background: #fff3e0; color: #ef6c00; }
    .difficulty-badge.diff-advanced { background: #ffebee; color: #c62828; }
    
    .price-badge {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .course-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 16px 0;
      color: #333;
    }
    
    .course-description {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.6;
      margin: 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      white-space: pre-wrap;
      display: block;
    }

    /* Enhanced HTML content styles for course descriptions */
    .course-description h1,
    .course-description h2,
    .course-description h3,
    .course-description h4,
    .course-description h5,
    .course-description h6 {
      font-size: 1.3rem !important;
      font-weight: 700 !important;
      color: #333 !important;
      margin: 16px 0 12px 0 !important;
      line-height: 1.4 !important;
      display: block !important;
    }

    .course-description p {
      font-size: 1.1rem !important;
      color: #666 !important;
      line-height: 1.6 !important;
      margin: 12px 0 16px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      display: block !important;
    }

    .course-description div {
      display: block !important;
      margin: 12px 0 !important;
    }

    .course-description br {
      display: block !important;
      margin: 6px 0 !important;
      content: " " !important;
    }

    .course-description ul,
    .course-description ol {
      font-size: 1.1rem !important;
      color: #666 !important;
      line-height: 1.6 !important;
      margin: 12px 0 16px 0 !important;
      padding-left: 24px !important;
      display: block !important;
    }

    .course-description li {
      margin: 6px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }

    .course-description strong,
    .course-description b {
      font-weight: 700 !important;
      color: #333 !important;
    }

    .course-description em,
    .course-description i {
      font-style: italic !important;
    }

    /* Table styles for course descriptions */
    .course-description table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 16px 0 !important;
      background: white !important;
      border: 1px solid #ddd !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
    }

    .course-description table th {
      background: #f8f9fa !important;
      color: #333 !important;
      font-weight: 700 !important;
      padding: 16px 12px !important;
      border: 1px solid #ddd !important;
      text-align: left !important;
      font-size: 1rem !important;
    }

    .course-description table td {
      padding: 14px 12px !important;
      border: 1px solid #ddd !important;
      color: #666 !important;
      font-size: 1rem !important;
      line-height: 1.5 !important;
      vertical-align: top !important;
    }

    .course-description table tr:nth-child(even) {
      background: #f9f9f9 !important;
    }

    .course-description table tr:hover {
      background: #f0f4ff !important;
    }

    .course-description table tbody tr:first-child td {
      border-top: 3px solid #667eea !important;
    }

    /* Additional rich text styles for course descriptions */
    .course-description blockquote {
      border-left: 4px solid #667eea !important;
      background: #f8f9ff !important;
      margin: 16px 0 !important;
      padding: 16px 20px !important;
      font-style: italic !important;
      color: #555 !important;
      border-radius: 0 8px 8px 0 !important;
    }

    .course-description code {
      background: #f4f4f4 !important;
      color: #d63384 !important;
      padding: 3px 8px !important;
      border-radius: 4px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
    }

    .course-description pre {
      background: #f8f8f8 !important;
      border: 1px solid #ddd !important;
      border-radius: 8px !important;
      padding: 16px !important;
      overflow-x: auto !important;
      margin: 16px 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
      line-height: 1.4 !important;
    }

    .course-description a {
      color: #667eea !important;
      text-decoration: underline !important;
    }

    .course-description a:hover {
      color: #5a6fd8 !important;
    }
    
    .course-visual {
      flex-shrink: 0;
    }
    
    .course-image {
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }    /* Topics Container */
    .topics-container {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    
    .topics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 2px solid #e0e7ff;
      margin-bottom: 20px;
    }
      .topics-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    
    .topics-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .expand-all-btn,
    .collapse-all-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .expand-all-btn:hover,
    .collapse-all-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    /* Topic Block */
    .topic-block {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
      .topic-header-modern {
      display: flex;
      align-items: center;
      padding: 32px;
      background: linear-gradient(135deg, #f8f9ff 0%, #e8eeff 100%);
      border-bottom: 1px solid #e0e7ff;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .topic-header-modern:hover {
      background: linear-gradient(135deg, #f0f4ff 0%, #dce7ff 100%);
    }
    
    .expand-button {
      margin-left: auto;
      color: #666;
      transition: transform 0.3s ease;
    }
    
    .expand-button.expanded {
      transform: rotate(180deg);
    }
      .topic-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin-right: 24px;
      flex-shrink: 0;
    }
    
    .topic-title-modern {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .topic-desc-modern {
      font-size: 1rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      white-space: pre-wrap;
      display: block;
    }

    /* Enhanced HTML content styles for topic descriptions */
    .topic-desc-modern h1,
    .topic-desc-modern h2,
    .topic-desc-modern h3,
    .topic-desc-modern h4,
    .topic-desc-modern h5,
    .topic-desc-modern h6 {
      font-size: 1.2rem !important;
      font-weight: 600 !important;
      color: #333 !important;
      margin: 12px 0 8px 0 !important;
      line-height: 1.4 !important;
      display: block !important;
    }

    .topic-desc-modern p {
      font-size: 1rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 8px 0 12px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      display: block !important;
    }

    .topic-desc-modern div {
      display: block !important;
      margin: 8px 0 !important;
    }

    .topic-desc-modern br {
      display: block !important;
      margin: 4px 0 !important;
      content: " " !important;
    }

    .topic-desc-modern ul,
    .topic-desc-modern ol {
      font-size: 1rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 8px 0 12px 0 !important;
      padding-left: 20px !important;
      display: block !important;
    }

    .topic-desc-modern li {
      margin: 4px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }

    .topic-desc-modern strong,
    .topic-desc-modern b {
      font-weight: 600 !important;
      color: #333 !important;
    }

    .topic-desc-modern em,
    .topic-desc-modern i {
      font-style: italic !important;
    }

    /* Table styles for topic descriptions */
    .topic-desc-modern table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 12px 0 !important;
      background: white !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important;
      overflow: hidden !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    }

    .topic-desc-modern table th {
      background: #f8f9fa !important;
      color: #333 !important;
      font-weight: 600 !important;
      padding: 12px 10px !important;
      border: 1px solid #ddd !important;
      text-align: left !important;
      font-size: 0.95rem !important;
    }

    .topic-desc-modern table td {
      padding: 10px !important;
      border: 1px solid #ddd !important;
      color: #666 !important;
      font-size: 0.95rem !important;
      line-height: 1.4 !important;
      vertical-align: top !important;
    }

    .topic-desc-modern table tr:nth-child(even) {
      background: #f9f9f9 !important;
    }

    .topic-desc-modern table tr:hover {
      background: #f0f4ff !important;
    }

    /* Additional rich text styles for topic descriptions */
    .topic-desc-modern blockquote {
      border-left: 3px solid #667eea !important;
      background: #f8f9ff !important;
      margin: 12px 0 !important;
      padding: 12px 16px !important;
      font-style: italic !important;
      color: #555 !important;
      border-radius: 0 6px 6px 0 !important;
    }

    .topic-desc-modern code {
      background: #f4f4f4 !important;
      color: #d63384 !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
    }

    .topic-desc-modern pre {
      background: #f8f8f8 !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important;
      padding: 12px !important;
      overflow-x: auto !important;
      margin: 12px 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
      line-height: 1.4 !important;
    }

    .topic-desc-modern a {
      color: #667eea !important;
      text-decoration: underline !important;
    }

    .topic-desc-modern a:hover {
      color: #5a6fd8 !important;
    }    /* Lessons Grid */
    .lessons-grid {
      padding: 20px;
      display: grid;
      gap: 16px;
      max-width: 100%;
      transition: all 0.3s ease;
    }
    
    .lessons-grid.inline-expanded {
      background: #f8f9ff;
      border-radius: 0 0 16px 16px;
      border-top: 2px solid #e0e7ff;
    }
      .lesson-item {
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      border-left: 4px solid #ff6b6b;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 100%;
      overflow: hidden;
    }
    
    .lesson-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 107, 107, 0.15);
    }
    
    .lesson-content {
      max-width: 100%;
      overflow: hidden;
    }
      .lesson-header-modern {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .lesson-title-modern {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      color: #333;
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
    }
    
    .lesson-status {
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
      color: #ef6c00;
    }    .lesson-desc-modern {
      color: #666;
      line-height: 1.5;
      margin: 0 0 16px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      white-space: pre-wrap;
      display: block;
      font-size: 0.9rem;
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
    
    .more-lessons-indicator {
      text-align: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-top: 12px;
      color: #666;
      font-style: italic;
    }
    
    .click-hint {
      color: #ff6b6b;
      font-weight: 500;
    }
      /* Styles for HTML content within lesson descriptions */
    .lesson-desc-modern h1,
    .lesson-desc-modern h2,
    .lesson-desc-modern h3,
    .lesson-desc-modern h4,
    .lesson-desc-modern h5,
    .lesson-desc-modern h6 {
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      color: #333 !important;
      margin: 12px 0 8px 0 !important;
      line-height: 1.4 !important;
      display: block !important;
    }
    
    .lesson-desc-modern p {
      font-size: 0.95rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 8px 0 12px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      display: block !important;
    }
    
    .lesson-desc-modern div {
      display: block !important;
      margin: 8px 0 !important;
    }
    
    .lesson-desc-modern br {
      display: block !important;
      margin: 4px 0 !important;
      content: " " !important;
    }
    
    .lesson-desc-modern ul,
    .lesson-desc-modern ol {
      font-size: 0.95rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 8px 0 12px 0 !important;
      padding-left: 20px !important;
      display: block !important;
    }
    
    .lesson-desc-modern li {
      margin: 4px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    
    .lesson-desc-modern strong,
    .lesson-desc-modern b {
      font-weight: 600 !important;
      color: #333 !important;
    }
    
    .lesson-desc-modern em,
    .lesson-desc-modern i {
      font-style: italic !important;
    }
    
    /* Table styles for lesson descriptions */
    .lesson-desc-modern table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 12px 0 !important;
      background: white !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important;
      overflow: hidden !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
    }
    
    .lesson-desc-modern table th {
      background: #f8f9fa !important;
      color: #333 !important;
      font-weight: 600 !important;
      padding: 12px 8px !important;
      border: 1px solid #ddd !important;
      text-align: left !important;
      font-size: 0.9rem !important;
    }
    
    .lesson-desc-modern table td {
      padding: 10px 8px !important;
      border: 1px solid #ddd !important;
      color: #666 !important;
      font-size: 0.9rem !important;
      line-height: 1.4 !important;
      vertical-align: top !important;
    }
    
    .lesson-desc-modern table tr:nth-child(even) {
      background: #f9f9f9 !important;
    }
    
    .lesson-desc-modern table tr:hover {
      background: #f0f4ff !important;
    }
    
    .lesson-desc-modern table tbody tr:first-child td {
      border-top: 2px solid #667eea !important;
    }
    
    /* Additional rich text styles */
    .lesson-desc-modern blockquote {
      border-left: 4px solid #667eea !important;
      background: #f8f9ff !important;
      margin: 12px 0 !important;
      padding: 12px 16px !important;
      font-style: italic !important;
      color: #555 !important;
      border-radius: 0 6px 6px 0 !important;
    }
    
    .lesson-desc-modern code {
      background: #f4f4f4 !important;
      color: #d63384 !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.85rem !important;
    }
    
    .lesson-desc-modern pre {
      background: #f8f8f8 !important;
      border: 1px solid #ddd !important;
      border-radius: 6px !important;
      padding: 12px !important;
      overflow-x: auto !important;
      margin: 12px 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.85rem !important;
      line-height: 1.4 !important;
    }
    
    .lesson-desc-modern a {
      color: #667eea !important;
      text-decoration: underline !important;
    }
    
    .lesson-desc-modern a:hover {
      color: #5a6fd8 !important;
    }    /* Keynotes Modern */
    .keynotes-modern {
      margin-top: 16px;
      max-width: 100%;
    }
      .section-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #e74c3c;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .keynotes-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 100%;
    }
    
    .keynote-item {
      background: white;
      padding: 12px;
      border-radius: 6px;
      border-left: 3px solid #e0e7ff;
      transition: border-color 0.3s ease;
      max-width: 100%;
      overflow: hidden;
    }
      .keynote-item.important {
      border-left-color: #e74c3c;
      background: #fef9f9;
    }
      .keynote-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .keynote-title-modern {
      font-weight: 600;
      color: #333;
      font-size: 0.9rem;
      word-wrap: break-word;
      flex: 1;
      min-width: 0;
    }
    
    .keynote-meta {
      display: flex;
      gap: 8px;
    }
    
    .meta-tag {
      padding: 2px 8px;
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
    }    .keynote-content-modern {
      color: #666;
      margin: 0;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      white-space: pre-wrap;
      display: block;
    }
      /* Styles for HTML content within keynote content */
    .keynote-content-modern h1,
    .keynote-content-modern h2,
    .keynote-content-modern h3,
    .keynote-content-modern h4,
    .keynote-content-modern h5,
    .keynote-content-modern h6 {
      font-size: 1rem !important;
      font-weight: 600 !important;
      color: #333 !important;
      margin: 10px 0 6px 0 !important;
      line-height: 1.4 !important;
      display: block !important;
    }
    
    .keynote-content-modern p {
      font-size: 0.9rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 6px 0 10px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      display: block !important;
    }
    
    .keynote-content-modern div {
      display: block !important;
      margin: 6px 0 !important;
    }
    
    .keynote-content-modern br {
      display: block !important;
      margin: 3px 0 !important;
      content: " " !important;
    }
    
    .keynote-content-modern ul,
    .keynote-content-modern ol {
      font-size: 0.9rem !important;
      color: #666 !important;
      line-height: 1.5 !important;
      margin: 6px 0 10px 0 !important;
      padding-left: 16px !important;
      display: block !important;
    }
    
    .keynote-content-modern li {
      margin: 3px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    
    .keynote-content-modern strong,
    .keynote-content-modern b {
      font-weight: 600 !important;
      color: #333 !important;
    }
    
    .keynote-content-modern em,
    .keynote-content-modern i {
      font-style: italic !important;
    }
    
    /* Table styles for keynote content */
    .keynote-content-modern table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 10px 0 !important;
      background: white !important;
      border: 1px solid #ddd !important;
      border-radius: 4px !important;
      overflow: hidden !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
    }
    
    .keynote-content-modern table th {
      background: #f8f9fa !important;
      color: #333 !important;
      font-weight: 600 !important;
      padding: 8px 6px !important;
      border: 1px solid #ddd !important;
      text-align: left !important;
      font-size: 0.85rem !important;
    }
    
    .keynote-content-modern table td {
      padding: 6px !important;
      border: 1px solid #ddd !important;
      color: #666 !important;
      font-size: 0.85rem !important;
      line-height: 1.4 !important;
      vertical-align: top !important;
    }
    
    .keynote-content-modern table tr:nth-child(even) {
      background: #f9f9f9 !important;
    }
    
    .keynote-content-modern table tr:hover {
      background: #f0f4ff !important;
    }
    
    /* Additional rich text styles for keynotes */
    .keynote-content-modern blockquote {
      border-left: 3px solid #667eea !important;
      background: #f8f9ff !important;
      margin: 8px 0 !important;
      padding: 8px 12px !important;
      font-style: italic !important;
      color: #555 !important;
      border-radius: 0 4px 4px 0 !important;
    }
    
    .keynote-content-modern code {
      background: #f4f4f4 !important;
      color: #d63384 !important;
      padding: 1px 4px !important;
      border-radius: 3px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.8rem !important;
    }
    
    .keynote-content-modern pre {
      background: #f8f8f8 !important;
      border: 1px solid #ddd !important;
      border-radius: 4px !important;
      padding: 8px !important;
      overflow-x: auto !important;
      margin: 8px 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.8rem !important;
      line-height: 1.3 !important;
    }
    
    .keynote-content-modern a {
      color: #667eea !important;
      text-decoration: underline !important;
    }
    
    .keynote-content-modern a:hover {
      color: #5a6fd8 !important;
    }

    /* Tags Modern */
    .tags-modern {
      margin-top: 16px;
    }
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .tag-modern {
      background: #e3f2fd;
      color: #1976d2;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    /* No Data Modern */
    .no-data-modern {
      text-align: center;
      padding: 80px 20px;
      color: white;
    }
    
    .no-data-modern mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      opacity: 0.6;
      margin-bottom: 16px;
    }
    
    .no-data-modern h3 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
    }
      .no-data-modern p {
      margin: 0;
      opacity: 0.8;
    }
    
    /* Topic Expanded Overlay */
    .topic-expanded-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      overflow-y: auto;
      padding: 20px;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .topic-expanded-content {
      background: white;
      border-radius: 16px;
      width: 100%;
      max-width: 1000px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .expanded-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      border-radius: 16px 16px 0 0;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .expanded-header-info {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
    }
    
    .topic-number-large {
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
    
    .expanded-topic-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    
    .expanded-topic-desc {
      font-size: 1rem;
      margin: 0;
      opacity: 0.9;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      white-space: pre-wrap;
      display: block;
    }

    /* Enhanced HTML content styles for expanded topic descriptions */
    .expanded-topic-desc h1,
    .expanded-topic-desc h2,
    .expanded-topic-desc h3,
    .expanded-topic-desc h4,
    .expanded-topic-desc h5,
    .expanded-topic-desc h6 {
      font-size: 1.2rem !important;
      font-weight: 600 !important;
      color: white !important;
      margin: 12px 0 8px 0 !important;
      line-height: 1.4 !important;
      display: block !important;
      opacity: 1 !important;
    }

    .expanded-topic-desc p {
      font-size: 1rem !important;
      color: white !important;
      line-height: 1.4 !important;
      margin: 8px 0 12px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      display: block !important;
      opacity: 0.9 !important;
    }

    .expanded-topic-desc div {
      display: block !important;
      margin: 8px 0 !important;
      opacity: 0.9 !important;
    }

    .expanded-topic-desc br {
      display: block !important;
      margin: 4px 0 !important;
      content: " " !important;
    }

    .expanded-topic-desc ul,
    .expanded-topic-desc ol {
      font-size: 1rem !important;
      color: white !important;
      line-height: 1.4 !important;
      margin: 8px 0 12px 0 !important;
      padding-left: 20px !important;
      display: block !important;
      opacity: 0.9 !important;
    }

    .expanded-topic-desc li {
      margin: 4px 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }

    .expanded-topic-desc strong,
    .expanded-topic-desc b {
      font-weight: 600 !important;
      color: white !important;
      opacity: 1 !important;
    }

    .expanded-topic-desc em,
    .expanded-topic-desc i {
      font-style: italic !important;
    }

    /* Table styles for expanded topic descriptions */
    .expanded-topic-desc table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 12px 0 !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 6px !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
    }

    .expanded-topic-desc table th {
      background: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      font-weight: 600 !important;
      padding: 12px 10px !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      text-align: left !important;
      font-size: 0.95rem !important;
    }

    .expanded-topic-desc table td {
      padding: 10px !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      font-size: 0.95rem !important;
      line-height: 1.4 !important;
      vertical-align: top !important;
      opacity: 0.9 !important;
    }

    .expanded-topic-desc table tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.05) !important;
    }

    .expanded-topic-desc table tr:hover {
      background: rgba(255, 255, 255, 0.15) !important;
    }

    /* Additional rich text styles for expanded topic descriptions */
    .expanded-topic-desc blockquote {
      border-left: 3px solid rgba(255, 255, 255, 0.7) !important;
      background: rgba(255, 255, 255, 0.1) !important;
      margin: 12px 0 !important;
      padding: 12px 16px !important;
      font-style: italic !important;
      color: white !important;
      border-radius: 0 6px 6px 0 !important;
      opacity: 0.9 !important;
    }

    .expanded-topic-desc code {
      background: rgba(255, 255, 255, 0.2) !important;
      color: #ffd700 !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
    }

    .expanded-topic-desc pre {
      background: rgba(0, 0, 0, 0.3) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 6px !important;
      padding: 12px !important;
      overflow-x: auto !important;
      margin: 12px 0 !important;
      font-family: 'Courier New', monospace !important;
      font-size: 0.9rem !important;
      line-height: 1.4 !important;
      color: white !important;
    }

    .expanded-topic-desc a {
      color: #ffd700 !important;
      text-decoration: underline !important;
    }

    .expanded-topic-desc a:hover {
      color: #ffed4e !important;
    }
    
    .close-button {
      color: white !important;
      background: rgba(255, 255, 255, 0.1);
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    
    .close-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .expanded-lessons-container {
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .filter-group {
        flex-direction: column;
        align-items: center;
      }
      
      .modern-select {
        min-width: 100%;
        max-width: 400px;
      }
        .course-overview {
        flex-direction: column;
        text-align: center;
        padding: 24px;
      }
      
      .course-heading-section {
        padding: 24px;
        margin-bottom: 24px;
      }
      
      .course-main-title {
        font-size: 2.2rem;
      }
      
      .course-stats {
        gap: 16px;
        justify-content: center;
      }
      
      .stat-item {
        padding: 10px 14px;
        font-size: 0.9rem;
      }
      
      .course-title {
        font-size: 2rem;
      }
      
      .topic-header-modern {
        padding: 20px;
        flex-direction: column;
        text-align: center;
      }
      
      .topic-number {
        margin-right: 0;
        margin-bottom: 12px;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
      }
      
      .lessons-grid {
        padding: 16px;
        gap: 12px;
      }
      
      .lesson-item {
        padding: 12px;
        max-width: 100%;
      }
      
      .lesson-header-modern {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      
      .lesson-title-modern {
        font-size: 1rem;
      }
      
      .lesson-status {
        margin-left: 0;
        align-self: flex-start;
      }
      
      .keynote-item {
        padding: 10px;
      }
        .keynote-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
        /* Topics header mobile styles */
      .topics-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding: 16px 0;
      }
      
      .topics-title {
        font-size: 1.5rem;
      }
      
      .topics-actions {
        align-self: flex-end;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .expand-all-btn,
      .collapse-all-btn {
        font-size: 0.9rem;
        padding: 8px 16px;
      }
      
      /* Expanded view mobile styles */
      .topic-expanded-overlay {
        padding: 10px;
      }
      
      .expanded-header {
        padding: 16px 20px;
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .expanded-header-info {
        flex-direction: column;
        gap: 12px;
      }
      
      .topic-number-large {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
      }
      
      .expanded-topic-title {
        font-size: 1.5rem;
      }
      
      .expanded-lessons-container {
        padding: 16px 20px;
      }
    }
    
    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
      
      .lesson-item {
        padding: 8px;
        margin: 0;
      }
      
      .lessons-grid {
        padding: 12px 8px;
      }
      
      .topic-header-modern {
        padding: 16px;
      }
        .course-overview {
        padding: 16px;
      }
      
      .course-heading-section {
        padding: 20px;
        margin-bottom: 20px;
      }
      
      .course-main-title {
        font-size: 1.8rem;
      }
      
      .course-stats {
        gap: 12px;
        flex-direction: column;
        align-items: stretch;
      }
      
      .stat-item {
        padding: 8px 12px;
        font-size: 0.85rem;
        justify-content: center;
      }
        .course-breadcrumb {
        flex-wrap: wrap;
        gap: 4px;
      }
      
      .topics-actions {
        width: 100%;
        justify-content: space-between;
      }
      
      .expand-all-btn,
      .collapse-all-btn {
        flex: 1;
        max-width: 140px;
        font-size: 0.85rem;
        padding: 6px 12px;
      }
      
      .lesson-title-modern {
        font-size: 0.95rem;
      }
      
      .lesson-desc-modern {
        font-size: 0.85rem;
      }
      
      /* Mobile expanded view */
      .topic-expanded-overlay {
        padding: 5px;
      }
      
      .topic-expanded-content {
        max-height: 95vh;
        border-radius: 12px;
      }
      
      .expanded-header {
        padding: 12px 16px;
        border-radius: 12px 12px 0 0;
      }
      
      .expanded-topic-title {
        font-size: 1.3rem;
      }
      
      .expanded-lessons-container {
        padding: 12px 16px;
      }
    }
  `]
})
export class CustomerViewComponent implements OnInit {
  categories: Category[] = [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  topics: (Topic & { lessons: (Lesson & { keynotes: LessonKeynote[]; tags: Tag[] })[] })[] = [];
  selectedCategoryId: number | null = null;
  selectedCourseId: number | null = null;  selectedCourse: Course | null = null;
  loading = false;
  expandedTopics = new Set<number>(); // For popup expansion (individual clicks)
  inlineExpandedTopics = new Set<number>(); // For inline expansion (expand all)

  constructor(
    private categoryService: CategoryService,
    private courseService: CourseService,
    private topicService: TopicService,
    private lessonService: LessonService,
    private keynoteService: LessonKeynoteService,
    private tagService: TagService,
    private lessonTagService: LessonTagService // Add LessonTagService
  ) {}

  ngOnInit() {
    console.log('CustomerViewComponent initialized'); // Debug log
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  onCategoryChange() {
    this.selectedCourseId = null;
    this.selectedCourse = null;
    this.topics = [];
    this.filteredCourses = this.courses.filter(c => c.categoryId === this.selectedCategoryId);
  }
  onCourseChange() {
    this.selectedCourse = this.courses.find(c => c.courseId === this.selectedCourseId) || null;
    this.topics = [];
    this.expandedTopics.clear(); // Clear popup expanded topics when course changes
    this.inlineExpandedTopics.clear(); // Clear inline expanded topics when course changes
    if (this.selectedCourseId) {
      this.loading = true;
      this.topicService.getTopicsByCourseId(this.selectedCourseId).subscribe(topics => {
        const topicRequests = topics.map(topic =>
          this.lessonService.getLessonsByTopicId(topic.topicId).toPromise().then(lessons =>
            Promise.all((lessons || []).map(async lesson => {
              const [keynotes, lessonTags] = await Promise.all([
                this.keynoteService.getKeynotesByLessonId(lesson.lessonId).toPromise(),
                this.lessonTagService.getTagsByLessonId(lesson.lessonId).toPromise()
              ]);
              console.log('Lesson', lesson.lessonId, 'tags from backend:', lessonTags); // Debug log
              // Map lessonTags to Tag[] structure for display, ensure tagName is always a string
              const tags = (lessonTags || []).map(lt => ({ tagId: lt.tagId, tagName: lt.tagName || '' }));
              return { ...lesson, keynotes: keynotes || [], tags };
            }))
          ).then(lessonsWithDetails => ({ ...topic, lessons: lessonsWithDetails }))
        );
        Promise.all(topicRequests).then(topicsWithLessons => {
          console.log('Setting topics:', topicsWithLessons); // Debug log
          this.topics = topicsWithLessons;
          this.loading = false;
        });
      }, () => { this.loading = false; });
    }
  }
  toggleTopic(topicIndex: number) {
    // Individual click opens popup (full screen)
    if (this.expandedTopics.has(topicIndex)) {
      this.expandedTopics.delete(topicIndex);
    } else {
      // Close other popups and open this one
      this.expandedTopics.clear();
      this.expandedTopics.add(topicIndex);
    }
  }

  closeTopic(topicIndex: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.expandedTopics.delete(topicIndex);
  }

  collapseAll() {
    this.inlineExpandedTopics.clear();
  }

  expandAll() {
    // Expand all topics inline (not popup)
    this.topics.forEach((_, index) => {
      this.inlineExpandedTopics.add(index);
    });
  }

  getDisplayLessons(topic: any, topicIndex: number) {
    // If inline expanded, show all lessons; otherwise show only first 2
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
        if (lesson.durationMinutes) {
          totalMinutes += lesson.durationMinutes;
        }
      });
    });
    return totalMinutes;
  }
}
