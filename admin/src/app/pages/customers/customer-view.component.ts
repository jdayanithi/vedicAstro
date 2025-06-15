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
      </div>

      <!-- Course Content -->
      <div *ngIf="selectedCourse && !loading" class="content-section">
        <!-- Course Overview -->
        <div class="course-overview">
          <div class="course-info">
            <div class="course-meta">
              <span class="difficulty-badge" [class]="'diff-' + selectedCourse.difficultyLevel">{{selectedCourse.difficultyLevel | titlecase}}</span>
              <span *ngIf="selectedCourse.price" class="price-badge">₹{{selectedCourse.price}}</span>
            </div>
            <h2 class="course-title">{{selectedCourse.title}}</h2>
            <p class="course-description">{{selectedCourse.description}}</p>
          </div>
          <div class="course-visual" *ngIf="selectedCourse.thumbnailUrl">
            <img [src]="selectedCourse.thumbnailUrl" [alt]="selectedCourse.title" class="course-image">
          </div>
        </div>        <!-- Topics & Lessons -->
        <div class="topics-container">
          <div *ngFor="let topic of topics; let i = index" class="topic-block">
            <div class="topic-header-modern" (click)="toggleTopic(i)">
              <div class="topic-number">{{i + 1}}</div>
              <div class="topic-info">
                <h3 class="topic-title-modern">{{topic.title}}</h3>
                <p class="topic-desc-modern">{{topic.description}}</p>
              </div>
              <button mat-icon-button class="expand-button" [class.expanded]="expandedTopics.has(i)">
                <mat-icon>{{expandedTopics.has(i) ? 'expand_less' : 'expand_more'}}</mat-icon>
              </button>
            </div>
            
            <!-- Expanded Topic Content (Full Screen) -->
            <div *ngIf="expandedTopics.has(i)" class="topic-expanded-overlay" (click)="closeTopic(i, $event)">
              <div class="topic-expanded-content" (click)="$event.stopPropagation()">
                <!-- Header with Close Button -->
                <div class="expanded-header">
                  <div class="expanded-header-info">
                    <div class="topic-number-large">{{i + 1}}</div>
                    <div>
                      <h2 class="expanded-topic-title">{{topic.title}}</h2>
                      <p class="expanded-topic-desc">{{topic.description}}</p>
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
            
            <!-- Collapsed Topic Content (Preview) -->
            <div *ngIf="!expandedTopics.has(i)" class="lessons-grid">
              <div *ngFor="let lesson of topic.lessons.slice(0, 2); let j = index" class="lesson-item lesson-preview">
                <div class="lesson-content">
                  <div class="lesson-header-modern">
                    <h4 class="lesson-title-modern">{{lesson.title}}</h4>
                    <div class="lesson-status">
                      <span class="status-badge" [class]="lesson.isFree ? 'free' : 'premium'">
                        {{lesson.isFree ? 'Free' : 'Premium'}}
                      </span>
                    </div>
                  </div>
                  <div class="lesson-desc-modern lesson-desc-preview" [innerHTML]="lesson.description"></div>
                </div>
              </div>
              <div *ngIf="topic.lessons.length > 2" class="more-lessons-indicator">
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
    }

    /* Content Section */
    .content-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
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
    }

    /* Topics Container */
    .topics-container {
      display: flex;
      flex-direction: column;
      gap: 40px;
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
    }    /* Lessons Grid */
    .lessons-grid {
      padding: 20px;
      display: grid;
      gap: 16px;
      max-width: 100%;
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
    }/* Responsive Design */
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
      
      .lesson-title-modern {
        font-size: 0.95rem;
      }
      
      .lesson-desc-modern {
        font-size: 0.85rem;
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
  selectedCourseId: number | null = null;
  selectedCourse: Course | null = null;
  loading = false;

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
}
