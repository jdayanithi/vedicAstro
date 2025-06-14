import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryService, Category } from '../../services/category.service';
import { CourseService, Course } from '../../services/course.service';
import { TopicService, Topic } from '../../services/topic.service';
import { LessonService, Lesson } from '../../services/lesson.service';
import { LessonKeynoteService, LessonKeynote } from '../../services/lesson-keynote.service';
import { TagService, Tag } from '../../services/tag.service';
import { LessonTagService, LessonTag } from '../../services/lesson-tag.service';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
    
  ],
  template: `
    <div class="customer-container">
      <h1 class="main-title">Explore Courses</h1>
      <div class="filters-row">
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategoryId" (selectionChange)="onCategoryChange()">
            <mat-option *ngFor="let cat of categories" [value]="cat.categoryId">{{cat.name}}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Course</mat-label>
          <mat-select [(ngModel)]="selectedCourseId" (selectionChange)="onCourseChange()" [disabled]="!selectedCategoryId">
            <mat-option *ngFor="let course of filteredCourses" [value]="course.courseId">{{course.title}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <mat-progress-spinner *ngIf="loading" mode="indeterminate" color="primary" class="loading-spinner"></mat-progress-spinner>
      <ng-container *ngIf="selectedCourse && !loading">
        <mat-card class="course-card">
          <div class="course-header">
            <img *ngIf="selectedCourse.thumbnailUrl" [src]="selectedCourse.thumbnailUrl" class="course-thumb" alt="Course thumbnail">
            <div>
              <h2>{{selectedCourse.title}}</h2>
              <p class="course-desc">{{selectedCourse.description}}</p>
              <mat-chip color="primary" selected>{{selectedCourse.difficultyLevel | titlecase}}</mat-chip>
              <mat-chip color="accent" selected *ngIf="selectedCourse.price">₹{{selectedCourse.price}}</mat-chip>
            </div>
          </div>
        </mat-card>
        <div *ngFor="let topic of topics; let i = index" class="topic-section">
          <mat-card class="topic-card hoverable">
            <div class="topic-header">
              <mat-icon class="topic-avatar">auto_stories</mat-icon>
              <h3 class="topic-title">{{topic.title}}</h3>
            </div>
            <p class="topic-desc">{{topic.description}}</p>
            <div *ngFor="let lesson of topic.lessons; let j = index" class="lesson-section">
              <mat-card class="lesson-card hoverable">                <div class="lesson-header">
                  <mat-icon class="lesson-avatar">menu_book</mat-icon>
                  <span class="lesson-title">{{lesson.title}}</span>
                  <!-- <mat-chip *ngIf="lesson.isFree" color="primary" selected class="chip-hover">Free</mat-chip> -->
                  <!-- <mat-chip *ngIf="!lesson.isFree" color="warn" selected class="chip-hover">Paid</mat-chip> -->
                </div>
                <div class="lesson-desc">{{lesson.description}}</div>                <div *ngIf="lesson.keynotes && lesson.keynotes.length > 0" class="keynotes-section">
                  <h4>Keynotes</h4>
                  <div class="keynote-chips">
                    <mat-chip *ngFor="let keynote of lesson.keynotes" [color]="keynote.isImportant ? 'accent' : ''" selected class="chip-hover">
                      <span class="keynote-title">{{keynote.title}}</span>
                      <span *ngIf="keynote.relatedPlanet">({{keynote.relatedPlanet}})</span>
                      <span *ngIf="keynote.relatedZodiac">({{keynote.relatedZodiac}})</span>
                    </mat-chip>
                  </div>
                  <ul class="keynote-list">
                    <li *ngFor="let keynote of lesson.keynotes">
                      <span class="keynote-content">{{keynote.content}}</span>
                    </li>
                  </ul>
                </div>                <div *ngIf="lesson.tags && lesson.tags.length > 0" class="tags-section">
                  <div class="tag-chips">
                    <mat-chip *ngFor="let tag of lesson.tags" color="primary" selected class="chip-hover">{{tag.tagName}}</mat-chip>
                  </div>
                </div>
              </mat-card>
            </div>
          </mat-card>
        </div>
      </ng-container>
      <div *ngIf="selectedCourseId && !selectedCourse && !loading" class="no-data">No course found.</div>
    </div>
  `,
  styles: [`
    .customer-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 16px 40px 16px;
    }
    .main-title {
      text-align: center;
      color: #1976d2;
      margin-bottom: 40px;
      font-size: 2.5rem;
      font-weight: 700;
    }
    .filters-row {
      display: flex;
      gap: 32px;
      margin-bottom: 40px;
      justify-content: center;
    }
    .filter-field {
      min-width: 220px;
      flex: 1;
      margin-right: 12px;
    }
    .loading-spinner {
      display: block;
      margin: 48px auto 32px auto;
    }
    .course-card {
      margin-bottom: 48px;
      background: #f5faff;
      border-left: 6px solid #1976d2;
      transition: box-shadow 0.2s;
      padding: 24px 24px 24px 24px;
    }
    .course-card:hover {
      box-shadow: 0 4px 24px 0 rgba(25, 118, 210, 0.12);
    }
    .course-header {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    .course-thumb {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      margin-right: 16px;
    }
    .course-desc {
      color: #555;
      margin: 12px 0 0 0;
    }
    .topic-section {
      margin-bottom: 48px;
    }
    .topic-card {
      background: #fff8e1;
      border-left: 4px solid #ffb300;
      margin-bottom: 24px;
      padding: 24px 24px 16px 24px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .topic-card.hoverable:hover {
      box-shadow: 0 4px 24px 0 rgba(255, 179, 0, 0.12);
      transform: translateY(-2px) scale(1.01);
    }
    .topic-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
    }
    .topic-avatar {
      background: #ffe082;
      color: #ff9800;
      border-radius: 50%;
      padding: 6px;
      font-size: 32px;
    }
    .topic-title {
      color: #ff9800;
      margin-bottom: 4px;
      font-size: 1.3rem;
      font-weight: 600;
    }
    .topic-desc {
      color: #666;
      margin-bottom: 20px;
    }
    .lesson-section {
      margin-bottom: 24px;
    }
    .lesson-card {
      background: #f3f7fa;
      border-left: 3px solid #2196f3;
      margin-bottom: 16px;
      padding: 20px 20px 12px 20px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .lesson-card.hoverable:hover {
      box-shadow: 0 4px 24px 0 rgba(33, 150, 243, 0.12);
      transform: translateY(-2px) scale(1.01);
    }
    .lesson-header {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .lesson-avatar {
      background: #bbdefb;
      color: #1976d2;
      border-radius: 50%;
      padding: 6px;
      font-size: 28px;
    }
    .lesson-title {
      color: #1976d2;
      font-weight: 600;
    }
    .lesson-desc {
      color: #444;
      margin-bottom: 12px;
    }
    .chip-hover {
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      margin-right: 8px;
      margin-bottom: 4px;
    }
    .chip-hover:hover {
      background: #e3f2fd !important;
      color: #1976d2 !important;
      box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.10);
    }
    .content-type-chip.type-video { background: #e3f2fd; color: #1976d2; }
    .content-type-chip.type-article { background: #f3e5f5; color: #7b1fa2; }
    .content-type-chip.type-quiz { background: #fff3e0; color: #f57c00; }
    .content-type-chip.type-exercise { background: #e8f5e8; color: #388e3c; }    .keynotes-section h4 { margin: 12px 0 8px 0; color: #388e3c; }
    .keynote-chips, .tag-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .keynote-list { margin: 0 0 0 0; padding-left: 24px; }
    .keynote-content { color: #333; }
    .tags-section { margin-top: 12px; }
    .no-data { text-align: center; color: #888; margin-top: 40px; }
    /* Responsive styles */
    @media (max-width: 700px) {
      .customer-container {
        padding: 16px 2vw 24px 2vw;
      }
      .main-title {
        font-size: 2rem;
        margin-bottom: 24px;
      }
      .filters-row {
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }
      .filter-field {
        min-width: 0;
        width: 100%;
        margin-right: 0;
      }
      .course-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      .course-thumb {
        width: 80px;
        height: 80px;
        margin-right: 0;
      }
      .topic-header {
        flex-direction: row;
        gap: 8px;
        margin-bottom: 8px;
      }
      .topic-title {
        font-size: 1.1rem;
      }
      .lesson-header {
        font-size: 1rem;
        gap: 8px;
        margin-bottom: 6px;
      }
      .topic-section {
        margin-bottom: 28px;
      }
      .lesson-section {
        margin-bottom: 14px;
      }
      .lesson-card {
        padding: 12px 8px 8px 8px;
      }
      .topic-card {
        padding: 12px 8px 8px 8px;
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
