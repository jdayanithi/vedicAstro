import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuillModule } from 'ngx-quill';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap, of } from 'rxjs';
import { LessonService, Lesson } from '../../../services/lesson.service';
import { TopicService, Topic } from '../../../services/topic.service';
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';
import { LessonTagService, LessonTag } from '../../../services/lesson-tag.service';
import { KeynoteTagService, KeynoteTag } from '../../../services/keynote-tag.service';
import { TagService, Tag } from '../../../services/tag.service';
import { CourseService, Course } from '../../../services/course.service';

@Component({
  selector: 'app-add-lesson',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    QuillModule
  ],
  template: `
    <div class="container">      <div class="header">
        <h1>{{ isEditMode ? 'Edit Lesson' + (lessonId ? ' (ID: ' + lessonId + ')' : '') : 'Add New Lesson' }}</h1>
        <button mat-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Lessons
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Lesson Information</mat-card-title>
        </mat-card-header>        <mat-card-content>
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
            <p>Loading lesson data...</p>
          </div>

          <form *ngIf="!loading" [formGroup]="lessonForm" (ngSubmit)="onSubmit()">            <!-- Lesson Basic Information -->
            <div class="section">
              <h3 class="section-title">
                <mat-icon>info</mat-icon>
                Lesson Information
              </h3>
              
              <!-- Course Selection -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Search Course</mat-label>
                <input
                  type="text"
                  matInput
                  formControlName="courseSearch"
                  [matAutocomplete]="courseAuto"
                  placeholder="Type to search courses..."
                />
                <mat-autocomplete
                  #courseAuto="matAutocomplete"
                  [displayWith]="displayCourseFn"
                  (optionSelected)="onCourseSelected($event)"
                >
                  <mat-option
                    *ngFor="let course of filteredCourses | async"
                    [value]="course"
                  >
                    {{ displayCourseFn(course) }}
                  </mat-option>
                </mat-autocomplete>
                <mat-icon matSuffix>school</mat-icon>
                <mat-hint>Select a course to filter topics</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Course ID</mat-label>
                <input matInput formControlName="courseId" readonly />
                <mat-hint>Selected from course search above</mat-hint>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Search Topic</mat-label>
                <input
                  type="text"
                  matInput
                  formControlName="topicSearch"
                  [matAutocomplete]="auto"
                  placeholder="Type to search topics..."
                  [disabled]="!lessonForm.get('courseId')?.value"
                />
                <mat-autocomplete
                  #auto="matAutocomplete"
                  [displayWith]="displayTopicFn"
                  (optionSelected)="onTopicSelected($event)"
                >
                  <mat-option
                    *ngFor="let topic of filteredTopics | async"
                    [value]="topic"
                  >
                    {{ displayTopicFn(topic) }}
                  </mat-option>
                </mat-autocomplete>
                <mat-icon matSuffix>search</mat-icon>
                <mat-hint *ngIf="!lessonForm.get('courseId')?.value" class="course-warning">
                  Please select a course first to view available topics
                </mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Topic ID</mat-label>
                <input matInput formControlName="topicId" required readonly />
                <mat-hint>Selected from topic search above</mat-hint>
                <mat-error *ngIf="lessonForm.get('topicId')?.hasError('required')">
                  Topic selection is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Title</mat-label>
                <input matInput formControlName="title" required placeholder="Enter lesson title..." />
                <mat-error *ngIf="lessonForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>              </mat-form-field>

              <div class="rich-text-field">
                <label class="rich-text-label">Description</label>
                <div class="rich-text-container">
                  <quill-editor 
                    formControlName="description"
                    [modules]="quillModules"
                    placeholder="Enter lesson description..."
                    theme="snow"
                  ></quill-editor>
                </div>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Content Type</mat-label>
                <mat-select formControlName="contentType" required>
                  <mat-option value="video">Video</mat-option>
                  <mat-option value="article">Article</mat-option>
                  <mat-option value="quiz">Quiz</mat-option>
                  <mat-option value="exercise">Exercise</mat-option>
                </mat-select>
                <mat-error *ngIf="lessonForm.get('contentType')?.hasError('required')">
                  Content type is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Content URL</mat-label>
                <input matInput formControlName="contentUrl" type="url" placeholder="https://example.com/content" />
                <mat-hint>URL to the lesson content (video, article, etc.)</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Duration (minutes)</mat-label>
                <input matInput type="number" formControlName="durationMinutes" min="0" placeholder="0" />
                <mat-hint>Estimated time to complete this lesson</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width" *ngIf="isEditMode">
                <mat-label>Order Number</mat-label>
                <input matInput type="number" formControlName="orderNumber" min="1" />
                <mat-hint>Position of this lesson within the topic</mat-hint>
              </mat-form-field>

              <div class="checkbox-container">
                <mat-checkbox formControlName="isFree" class="full-width">
                  <strong>Free lesson</strong> (accessible without payment)
                </mat-checkbox>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- Keynotes Section -->
            <div class="section">
              <div class="section-header">
                <h3 class="section-title">
                  <mat-icon>note_alt</mat-icon>
                  Lesson Keynotes
                </h3>
                <button 
                  mat-raised-button 
                  color="accent" 
                  type="button" 
                  (click)="addKeynote()"
                  class="add-keynote-btn"
                >
                  <mat-icon>add</mat-icon>
                  Add Keynote
                </button>
              </div>

              <div class="keynotes-container" formArrayName="keynotes">
                <mat-expansion-panel 
                  *ngFor="let keynote of keynotes.controls; let i = index" 
                  [formGroupName]="i"
                  class="keynote-panel"
                  [expanded]="keynote.get('isNew')?.value"
                >
                  <mat-expansion-panel-header>
                    <mat-panel-title>
                      <div class="keynote-title-container">
                        <mat-icon class="keynote-icon">note_alt</mat-icon>
                        <span class="keynote-title">
                          {{ keynote.get('title')?.value || 'New Keynote' }}
                        </span>
                        <mat-chip 
                          *ngIf="keynote.get('isImportant')?.value" 
                          class="important-chip"
                        >
                          <mat-icon>star</mat-icon>
                          Important
                        </mat-chip>
                        <mat-chip 
                          class="content-type-chip"
                          [ngClass]="'content-type-' + keynote.get('contentType')?.value"
                        >
                          {{ getContentTypeLabel(keynote.get('contentType')?.value) }}
                        </mat-chip>
                      </div>
                    </mat-panel-title>
                    <mat-panel-description>
                      <span class="keynote-preview">
                        {{ getKeynotePreview(keynote.get('content')?.value) }}
                      </span>
                    </mat-panel-description>
                  </mat-expansion-panel-header>                  <div class="keynote-form">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Title</mat-label>
                      <input matInput formControlName="title" required />
                      <mat-error *ngIf="keynote.get('title')?.hasError('required')">
                        Title is required
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Content Type</mat-label>
                      <mat-select formControlName="contentType" required>
                        <mat-option value="text">Text</mat-option>
                        <mat-option value="bullet_points">Bullet Points</mat-option>
                        <mat-option value="quote">Quote</mat-option>
                        <mat-option value="example">Example</mat-option>
                      </mat-select>
                      <mat-error *ngIf="keynote.get('contentType')?.hasError('required')">
                        Content type is required
                      </mat-error>                    </mat-form-field>

                    <div class="rich-text-field keynote-field">
                      <label class="rich-text-label">Content</label>
                      <div class="rich-text-container keynote-editor">
                        <quill-editor 
                          formControlName="content"
                          [modules]="quillModules"
                          [placeholder]="getContentPlaceholder(keynote.get('contentType')?.value)"
                          theme="snow"
                        ></quill-editor>
                      </div>
                      <div class="rich-text-hint">{{ getContentHint(keynote.get('contentType')?.value) }}</div>
                      <div class="rich-text-error" *ngIf="keynote.get('content')?.hasError('required')">
                        Content is required
                      </div>
                    </div>

                    <div class="form-row">
                      <mat-checkbox formControlName="isImportant" class="checkbox-field">
                        Mark as Important
                      </mat-checkbox>
                      
                      <mat-checkbox formControlName="hasVisualAid" class="checkbox-field">
                        Has Visual Aid
                      </mat-checkbox>
                    </div>                    <mat-form-field 
                      appearance="outline" 
                      class="full-width" 
                      *ngIf="keynote.get('hasVisualAid')?.value"
                    >
                      <mat-label>Visual Aid URL</mat-label>
                      <input matInput formControlName="visualAidUrl" type="url" />
                      <mat-hint>URL to an image, diagram, or visual aid</mat-hint>
                    </mat-form-field>                    <div class="form-row">
                      <mat-form-field appearance="outline" class="half-width">
                        <mat-label>Related Planet</mat-label>
                        <mat-select formControlName="relatedPlanet">
                          <mat-option value="">None</mat-option>
                          <mat-option value="Sun">Sun</mat-option>
                          <mat-option value="Moon">Moon</mat-option>
                          <mat-option value="Mars">Mars</mat-option>
                          <mat-option value="Mercury">Mercury</mat-option>
                          <mat-option value="Jupiter">Jupiter</mat-option>
                          <mat-option value="Venus">Venus</mat-option>
                          <mat-option value="Saturn">Saturn</mat-option>
                          <mat-option value="Rahu">Rahu</mat-option>
                          <mat-option value="Ketu">Ketu</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="half-width">
                        <mat-label>Related Zodiac</mat-label>
                        <mat-select formControlName="relatedZodiac">
                          <mat-option value="">None</mat-option>
                          <mat-option value="Aries">Aries</mat-option>
                          <mat-option value="Taurus">Taurus</mat-option>
                          <mat-option value="Gemini">Gemini</mat-option>
                          <mat-option value="Cancer">Cancer</mat-option>
                          <mat-option value="Leo">Leo</mat-option>
                          <mat-option value="Virgo">Virgo</mat-option>
                          <mat-option value="Libra">Libra</mat-option>
                          <mat-option value="Scorpio">Scorpio</mat-option>
                          <mat-option value="Sagittarius">Sagittarius</mat-option>
                          <mat-option value="Capricorn">Capricorn</mat-option>
                          <mat-option value="Aquarius">Aquarius</mat-option>
                          <mat-option value="Pisces">Pisces</mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>

                    <!-- Keynote Tags Section -->
                    <div class="keynote-tags-section">
                      <div class="section-header">
                        <h4 class="section-subtitle">
                          <mat-icon>local_offer</mat-icon>
                          Keynote Tags
                        </h4>
                        <button 
                          mat-button 
                          color="accent" 
                          type="button" 
                          (click)="addKeynoteTag(i)"
                          class="add-keynote-tag-btn"
                        >
                          <mat-icon>add</mat-icon>
                          Add Tag
                        </button>
                      </div>

                      <div class="keynote-tags-container" formArrayName="keynoteTags">
                        <div 
                          *ngFor="let keynoteTag of getKeynoteTags(i).controls; let j = index" 
                          [formGroupName]="j"
                          class="keynote-tag-item"
                        >
                          <mat-form-field appearance="outline" class="tag-select">
                            <mat-label>Tag</mat-label>
                            <mat-select formControlName="tagId" required>
                              <mat-option *ngFor="let tagOption of allTags" [value]="tagOption.tagId">
                                {{ tagOption.tagName }}
                              </mat-option>
                            </mat-select>
                            <mat-error *ngIf="keynoteTag.get('tagId')?.hasError('required')">
                              Tag selection is required
                            </mat-error>
                          </mat-form-field>

                          <mat-form-field appearance="outline" class="relevance-score">
                            <mat-label>Relevance Score</mat-label>
                            <input matInput formControlName="relevanceScore" type="number" min="1" max="10" />
                            <mat-hint>1-10 scale</mat-hint>
                          </mat-form-field>

                          <button 
                            mat-icon-button 
                            color="warn" 
                            type="button" 
                            (click)="removeKeynoteTag(i, j)"
                            matTooltip="Remove this tag"
                            class="remove-tag-btn"
                          >
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>

                        <div *ngIf="getKeynoteTags(i).length === 0" class="no-keynote-tags">
                          <mat-icon>local_offer_outlined</mat-icon>
                          <span>No tags added to this keynote yet.</span>
                        </div>
                      </div>
                    </div>

                    <div class="keynote-actions">
                      <button 
                        mat-button 
                        color="warn" 
                        type="button" 
                        (click)="removeKeynote(i)"
                        matTooltip="Remove this keynote"
                      >
                        <mat-icon>delete</mat-icon>
                        Remove
                      </button>
                    </div>
                  </div>
                </mat-expansion-panel>

                <div *ngIf="keynotes.length === 0" class="no-keynotes">
                  <mat-icon>note_add</mat-icon>
                  <p>No keynotes added yet. Click "Add Keynote" to get started.</p>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- Tags Section -->
            <div class="section">
              <div class="section-header">
                <h3 class="section-title">
                  <mat-icon>label</mat-icon>
                  Lesson Tags
                </h3>
                <button 
                  mat-raised-button 
                  color="accent" 
                  type="button" 
                  (click)="addTag()"
                  class="add-tag-btn"
                >
                  <mat-icon>add</mat-icon>
                  Add Tag
                </button>
              </div>

              <div class="tags-container" formArrayName="tags">
                <div 
                  *ngFor="let tag of tags.controls; let i = index" 
                  [formGroupName]="i"
                  class="tag-item"
                >                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Tag</mat-label>
                    <mat-select formControlName="tagId" required>
                      <mat-option *ngFor="let tagOption of allTags" [value]="tagOption.tagId">
                        {{ tagOption.tagName }}
                      </mat-option>
                    </mat-select>
                    <mat-error *ngIf="tag.get('tagId')?.hasError('required')">
                      Tag selection is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Relevance Score</mat-label>
                    <input matInput formControlName="relevanceScore" type="number" min="1" />
                    <mat-hint>Enter a score from 1-10 indicating relevance to the lesson</mat-hint>
                  </mat-form-field>

                  <div class="tag-actions">
                    <button 
                      mat-icon-button 
                      color="primary" 
                      type="button" 
                      (click)="saveTag(i)"
                      matTooltip="Save this tag"
                      class="save-tag-btn"
                    >
                      <mat-icon>save</mat-icon>
                    </button>
                    <button 
                      mat-button 
                      color="warn" 
                      type="button" 
                      (click)="removeTag(i)"
                      matTooltip="Remove this tag"
                    >
                      <mat-icon>delete</mat-icon>
                      Remove
                    </button>
                  </div>
                </div>

                <div *ngIf="tags.length === 0" class="no-tags">
                  <mat-icon>label_off</mat-icon>
                  <p>No tags added yet. Click "Add Tag" to get started.</p>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>            <div class="button-container">
              <button mat-button type="button" (click)="goBack()">
                Cancel
              </button>
              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                [disabled]="lessonForm.invalid || submitting"
              >
                <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                {{ submitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update' : 'Create') }} Lesson
                <span *ngIf="keynotes.length > 0 && !submitting"> with {{ keynotes.length }} Keynote(s)</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,  styles: [`    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .header h1 {
      margin: 0;
      color: #1976d2;
      font-weight: 500;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px 20px;
      color: #666;
    }

    .loading-container mat-spinner {
      margin-bottom: 16px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
      color: #333;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .add-keynote-btn, .add-tag-btn {
      min-width: 140px;
    }    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    .course-warning {
      color: #ff6b6b !important;
      font-weight: 500;
    }

    .rich-text-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .rich-text-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 8px;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    .rich-text-container {
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      min-height: 120px;
      background-color: white;
      transition: border-color 0.15s ease;
    }

    .rich-text-container .ql-editor {
      min-height: 100px;
      font-family: Roboto, "Helvetica Neue", sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }

    .rich-text-container .ql-toolbar {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    .rich-text-container:focus-within {
      border-color: #1976d2;
      box-shadow: 0 0 0 1px #1976d2;
    }

    .rich-text-hint {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 4px;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    .rich-text-error {
      font-size: 12px;
      color: #f44336;
      margin-top: 4px;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    .keynote-field {
      margin-bottom: 20px;
    }

    .keynote-editor {
      min-height: 100px;
    }

    .keynote-editor .ql-editor {
      min-height: 80px;
    }
    
    .half-width {
      width: 48%;
      margin-bottom: 15px;
    }
    
    .form-row {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .checkbox-field {
      margin-right: 20px;
    }
      .keynotes-container, .tags-container {
      max-height: 600px;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      background-color: #fafafa;
    }

    .tag-item {
      background-color: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      position: relative;
    }

    .tag-item:last-child {
      margin-bottom: 0;
    }    .tag-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }    // Keynote Tags Styles
    .keynote-tags-section {
      margin-top: 20px;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .section-subtitle {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      color: #495057;
    }

    .keynote-tag-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: white;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
    }

    .tag-select {
      flex: 2;
      margin-bottom: 0;
    }

    .relevance-score {
      flex: 1;
      margin-bottom: 0;
    }

    .remove-tag-btn {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
    }

    .add-keynote-tag-btn {
      font-size: 12px;
      height: 32px;
    }

    .no-keynote-tags {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #6c757d;
      font-style: italic;
      padding: 12px;
      justify-content: center;
    }
    
    .keynote-panel {
      margin-bottom: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .keynote-panel:last-child {
      margin-bottom: 0;
    }
    
    .keynote-title-container {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    
    .keynote-icon {
      color: #666;
      font-size: 20px;
    }
    
    .keynote-title {
      font-weight: 500;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .important-chip {
      background-color: #ff6b6b;
      color: white;
      font-size: 11px;
      height: 24px;
      min-height: 24px;
    }
    
    .content-type-chip {
      font-size: 11px;
      height: 24px;
      min-height: 24px;
      color: white;
    }
    
    .content-type-text {
      background-color: #4caf50;
    }
    
    .content-type-bullet_points {
      background-color: #ff9800;
    }
    
    .content-type-quote {
      background-color: #9c27b0;
    }
    
    .content-type-example {
      background-color: #2196f3;
    }
    
    .keynote-preview {
      color: #666;
      font-size: 12px;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
      .keynote-form {
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      margin: 8px 0;
    }
    
    .keynote-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }
    
    .no-keynotes, .no-tags {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }
    
    .no-keynotes mat-icon, .no-tags mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }
      .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }

    .button-container button {
      min-width: 120px;
    }

    .button-container mat-spinner {
      margin-right: 8px;
    }

    .checkbox-container {
      margin: 20px 0;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }
    
    mat-checkbox {
      margin-bottom: 15px;
    }
    
    mat-divider {
      margin: 30px 0;
    }
    
    @media (max-width: 768px) {
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .form-row {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .half-width {
        width: 100%;
      }
      
      .keynote-title-container {
        flex-wrap: wrap;
      }
      
      .keynote-title {
        max-width: 150px;
      }
    }
  `]
})
export class AddLessonComponent implements OnInit {  lessonForm: FormGroup;
  filteredTopics: Observable<Topic[]> = of([]);
  filteredCourses: Observable<Course[]> = of([]);
  isEditMode = false;
  lessonId: number | null = null;
  allTags: Tag[] = []; // Available tags for selection
  allCourses: Course[] = []; // Available courses for selection
  loading = false;
  submitting = false;

  // Quill editor configuration
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link']
    ]
  };  private fb = inject(FormBuilder);
  private lessonService = inject(LessonService);
  private topicService = inject(TopicService);
  private courseService = inject(CourseService);
  private keynoteService = inject(LessonKeynoteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private lessonTagService = inject(LessonTagService);
  private keynoteTagService = inject(KeynoteTagService);
  private tagService = inject(TagService);
  constructor() {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      courseId: [''],
      courseSearch: [''],
      topicId: ['', Validators.required],
      topicSearch: [''],
      contentType: ['', Validators.required],
      contentUrl: [''],
      durationMinutes: [''],
      orderNumber: [1],
      isFree: [false],
      tags: this.fb.array([]),
      keynotes: this.fb.array([])
    });
  }

  get tags(): FormArray {
    return this.lessonForm.get('tags') as FormArray;
  }

  get keynotes(): FormArray {
    return this.lessonForm.get('keynotes') as FormArray;
  }  ngOnInit() {
    this.setupCourseAutocomplete();
    this.setupTopicAutocomplete();
    this.checkEditMode();
    this.loadAllTags();
    this.loadAllCourses();
    this.handleNavigationState();
  }

  handleNavigationState() {
    // Check if we have navigation state with selected topic
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state || window.history.state;
    
    if (state && state.selectedTopic && !this.isEditMode) {
      // Pre-populate course and topic from navigation state
      const selectedTopic = state.selectedTopic;
      
      // Load the course for this topic
      this.courseService.getCourseById(selectedTopic.courseId).subscribe({
        next: (course) => {
          this.lessonForm.patchValue({
            courseId: selectedTopic.courseId,
            courseSearch: course,
            topicId: selectedTopic.topicId,
            topicSearch: selectedTopic
          });
        },
        error: () => {
          console.error('Error loading course for selected topic');
        }
      });
    }
  }
  setupCourseAutocomplete() {
    this.filteredCourses = this.lessonForm.get('courseSearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterCourses(value))
    );
  }

  setupTopicAutocomplete() {
    this.filteredTopics = this.lessonForm.get('topicSearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterTopics(value))
    );
  }

  private _filterCourses(value: string | Course): Observable<Course[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    if (!value || value.trim() === '') {
      return this.courseService.getAllCourses();
    }
    // Filter courses by title
    const filterValue = value.toLowerCase();
    return this.courseService.getAllCourses().pipe(
      switchMap(courses => of(courses.filter(course => 
        course.title.toLowerCase().includes(filterValue)
      )))
    );
  }

  private _filterTopics(value: string | Topic): Observable<Topic[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    
    const selectedCourseId = this.lessonForm.get('courseId')?.value;
    if (!selectedCourseId) {
      return of([]); // No topics if no course is selected
    }
    
    // Get topics for the selected course
    return this.topicService.getTopicsByCourseId(selectedCourseId).pipe(
      switchMap(topics => {
        if (!value || value.trim() === '') {
          return of(topics);
        }
        // Filter topics by title
        const filterValue = value.toLowerCase();
        return of(topics.filter(topic => 
          topic.title.toLowerCase().includes(filterValue)
        ));
      })
    );
  }

  displayCourseFn = (course: Course): string => {
    return course ? `${course.title} (ID: ${course.courseId})` : '';
  }

  displayTopicFn = (topic: Topic): string => {
    return topic ? `${topic.title} (ID: ${topic.topicId})` : '';
  }

  onCourseSelected(event: any) {
    const course = event.option.value as Course;
    this.lessonForm.patchValue({
      courseId: course.courseId,
      topicId: '', // Clear topic selection when course changes
      topicSearch: '' // Clear topic search when course changes
    });
    
    // Trigger topic search refresh
    this.lessonForm.get('topicSearch')?.updateValueAndValidity();
  }

  onTopicSelected(event: any) {
    const topic = event.option.value as Topic;
    this.lessonForm.patchValue({
      topicId: topic.topicId
    });
  }

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.snackBar.open('Error loading courses', 'Close', {
          duration: 3000
        });
      }
    });
  }
  addKeynote() {
    const keynoteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      contentType: ['text', Validators.required],
      isImportant: [false],
      hasVisualAid: [false],
      visualAidUrl: [''],
      relatedPlanet: [''],
      relatedZodiac: [''],
      keynoteTags: this.fb.array([]), // Add keynote tags form array
      isNew: [true] // Flag to expand new keynotes
    });
    
    this.keynotes.push(keynoteForm);
  }

  removeKeynote(index: number) {
    this.keynotes.removeAt(index);
  }

  addTag() {
    const tagForm = this.fb.group({
      lessonTagId: [null],
      tagId: [null, Validators.required],
      tagName: [''],
      relevanceScore: [1]
    });
    this.tags.push(tagForm);
  }
  async removeTag(index: number) {
    const tagForm = this.tags.at(index);
    const tagData = tagForm.value;
    if (tagData.lessonTagId) {
      // Delete from backend, then reload tags
      try {
        await this.lessonTagService.deleteLessonTag(tagData.lessonTagId).toPromise();
        this.snackBar.open('Tag deleted successfully.', 'Close', { duration: 2000 });
        this.loadTags();
      } catch (error: any) {
        let errorMsg = 'Failed to delete tag. Please try again.';
        if (error && error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error && error.message) {
          errorMsg = error.message;
        }
        this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
        console.error('Error deleting tag:', error);
      }
    } else {
      // Just remove locally if not saved yet
      this.tags.removeAt(index);
    }
  }

  // Keynote Tag methods
  getKeynoteTags(keynoteIndex: number): FormArray {
    const keynote = this.keynotes.at(keynoteIndex) as FormGroup;
    return keynote.get('keynoteTags') as FormArray;
  }

  addKeynoteTag(keynoteIndex: number) {
    const keynoteTagForm = this.fb.group({
      keynoteTagId: [null],
      tagId: [null, Validators.required],
      relevanceScore: [5]
    });
    this.getKeynoteTags(keynoteIndex).push(keynoteTagForm);
  }

  removeKeynoteTag(keynoteIndex: number, tagIndex: number) {
    this.getKeynoteTags(keynoteIndex).removeAt(tagIndex);
  }

  getContentTypeLabel(contentType: string): string {
    switch (contentType) {
      case 'text': return 'Text';
      case 'bullet_points': return 'Bullet Points';
      case 'quote': return 'Quote';
      case 'example': return 'Example';
      default: return contentType || 'Text';
    }
  }
  getKeynotePreview(content: string): string {
    if (!content) return 'No content';
    // Strip HTML tags for clean preview display
    const cleanContent = content.replace(/<[^>]*>/g, '');
    return cleanContent.length > 50 ? cleanContent.substring(0, 50) + '...' : cleanContent;
  }

  getContentPlaceholder(contentType: string): string {
    switch (contentType) {
      case 'bullet_points':
        return 'Enter bullet points, one per line:\n• Point 1\n• Point 2\n• Point 3';
      case 'quote':
        return 'Enter the quote text...';
      case 'example':
        return 'Provide a detailed example...';
      default:
        return 'Enter the keynote content...';
    }
  }

  getContentHint(contentType: string): string {
    switch (contentType) {
      case 'bullet_points':
        return 'Use bullet points (•), dashes (-), or asterisks (*) to separate points';
      case 'quote':
        return 'Inspirational or educational quotes related to the lesson';
      case 'example':
        return 'Practical examples that illustrate the lesson concepts';
      default:
        return 'General text content for the keynote';
    }
  }
  checkEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId) && numericId > 0) {
        this.isEditMode = true;
        this.lessonId = numericId;
        console.log('Edit mode enabled for lessonId:', this.lessonId);
        this.loadLesson();
      } else {
        console.error('Invalid lesson ID in route:', id);
        this.snackBar.open('Invalid lesson ID provided', 'Close', { duration: 3000 });
        this.router.navigate(['/lessons']);
      }
    }
  }loadLesson() {
    if (this.lessonId) {
      this.loading = true;
      this.lessonService.getLessonById(this.lessonId).subscribe({
        next: (lesson) => {
          this.lessonForm.patchValue({
            title: lesson.title,
            description: lesson.description,
            topicId: lesson.topicId,
            contentType: lesson.contentType,
            contentUrl: lesson.contentUrl,
            durationMinutes: lesson.durationMinutes,
            orderNumber: lesson.orderNumber,
            isFree: lesson.isFree
          });
          
          // Load topic details for the search field
          this.topicService.getTopicById(lesson.topicId).subscribe({
            next: (topic) => {
              this.lessonForm.patchValue({
                topicSearch: topic,
                courseId: topic.courseId
              });
              
              // Load course details for the course search field
              this.courseService.getCourseById(topic.courseId).subscribe({
                next: (course) => {
                  this.lessonForm.patchValue({
                    courseSearch: course
                  });
                },
                error: () => {
                  console.error('Error loading course details');
                }
              });
            }
          });

          // Load existing keynotes
          this.loadKeynotes();
          // Load existing tags
          this.loadTags(); // Load tags for lesson
          this.loading = false;
        },
        error: () => {
          this.snackBar.open('Error loading lesson', 'Close', {
            duration: 3000
          });
          this.loading = false;
        }
      });
    }
  }

  loadKeynotes() {
    if (this.lessonId) {
      this.keynoteService.getKeynotesByLessonId(this.lessonId).subscribe({
        next: (keynotes: LessonKeynote[]) => {
          // Clear existing keynotes
          while (this.keynotes.length !== 0) {
            this.keynotes.removeAt(0);
          }

          // Add existing keynotes to the form
          keynotes.forEach((keynote: LessonKeynote) => {            const keynoteForm = this.fb.group({
              keynoteId: [keynote.keynoteId],
              title: [keynote.title, Validators.required],
              content: [keynote.content, Validators.required],
              contentType: [keynote.contentType, Validators.required],
              isImportant: [keynote.isImportant || false],
              hasVisualAid: [keynote.hasVisualAid || false],
              visualAidUrl: [keynote.visualAidUrl || ''],
              relatedPlanet: [keynote.relatedPlanet || ''],
              relatedZodiac: [keynote.relatedZodiac || ''],
              keynoteTags: this.fb.array([]), // Add keynote tags form array
              isNew: [false] // Existing keynotes are not expanded by default
            });            this.keynotes.push(keynoteForm);

            // Load keynote tags for this keynote
            if (keynote.keynoteId) {
              this.loadKeynoteTags(keynote.keynoteId, this.keynotes.length - 1);
            }
          });
        },
        error: () => {
          this.snackBar.open('Error loading keynotes', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }  loadTags() {
    if (this.lessonId && typeof this.lessonId === 'number' && this.lessonId > 0) {
      console.log('Loading tags for lessonId:', this.lessonId);
      this.lessonTagService.getTagsByLessonId(this.lessonId).subscribe({
        next: (tags: LessonTag[]) => {
          console.log('Tags loaded successfully:', tags);
          // Clear existing tags
          while (this.tags.length !== 0) {
            this.tags.removeAt(0);
          }
          // Add loaded tags to form array
          tags.forEach((tag: LessonTag) => {
            const tagForm = this.fb.group({
              lessonTagId: [tag.lessonTagId],
              tagId: [tag.tagId, Validators.required],
              tagName: [tag.tagName || ''],
              relevanceScore: [tag.relevanceScore || 1]
            });
            this.tags.push(tagForm);
          });
          console.log('Tags form array updated, length:', this.tags.length);
        },
        error: (error) => {
          console.error('Error loading tags:', error);
          let errorMessage = 'Error loading tags';
          if (error.status) {
            errorMessage += ` (${error.status})`;
          }
          if (error.error && error.error.message) {
            errorMessage += `: ${error.error.message}`;
          }
          this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        }
      });
    } else {
      console.log('lessonId is not valid for loadTags:', this.lessonId, typeof this.lessonId);
    }
  }
  loadAllTags() {
    this.tagService.getTags().subscribe({
      next: (tags: Tag[]) => {
        this.allTags = tags;
      },
      error: () => {
        this.snackBar.open('Error loading tags', 'Close', { duration: 3000 });
      }
    });
  }

  loadKeynoteTags(keynoteId: number, keynoteIndex: number) {
    this.keynoteTagService.getTagsByKeynoteId(keynoteId).subscribe({
      next: (keynoteTags: KeynoteTag[]) => {
        const keynoteTagsArray = this.getKeynoteTags(keynoteIndex);
        // Clear existing keynote tags
        while (keynoteTagsArray.length !== 0) {
          keynoteTagsArray.removeAt(0);
        }
        // Add existing keynote tags to the form
        keynoteTags.forEach((keynoteTag: KeynoteTag) => {
          const keynoteTagForm = this.fb.group({
            keynoteTagId: [keynoteTag.keynoteTagId],
            tagId: [keynoteTag.tagId, Validators.required],
            relevanceScore: [keynoteTag.relevanceScore || 5]
          });
          keynoteTagsArray.push(keynoteTagForm);
        });
      },
      error: () => {
        this.snackBar.open('Error loading keynote tags', 'Close', { duration: 3000 });
      }
    });
  }onSubmit() {
    if (this.lessonForm.valid) {
      this.submitting = true;
      const formData = this.lessonForm.value;
      const lessonData = {
        title: formData.title,
        description: formData.description,
        topicId: formData.topicId,
        contentType: formData.contentType,
        contentUrl: formData.contentUrl,
        durationMinutes: formData.durationMinutes,
        isFree: formData.isFree,
        ...(this.isEditMode && { orderNumber: formData.orderNumber })
      };

      if (this.isEditMode && this.lessonId) {
        // Update existing lesson
        this.lessonService.updateLesson(this.lessonId, lessonData).subscribe({
          next: async () => {
            try {
              // Handle keynotes and tags after lesson update
              await this.handleKeynotes(this.lessonId!);
              await this.handleTags(this.lessonId!);
              
              this.snackBar.open(
                `Lesson updated successfully with ${this.keynotes.length} keynote(s) and ${this.tags.length} tag(s)!`,
                'Close',
                { duration: 3000 }
              );
              this.submitting = false;
              this.goBack();
            } catch (error) {
              console.error('Error updating keynotes/tags:', error);
              this.snackBar.open(
                'Lesson updated but some keynotes or tags failed to save',
                'Close',
                { duration: 5000 }
              );
              this.submitting = false;
              this.goBack();
            }
          },
          error: (error) => {
            console.error('Error updating lesson:', error);
            this.snackBar.open('Error updating lesson. Please try again.', 'Close', {
              duration: 5000
            });
            this.submitting = false;
          }
        });
      } else {
        // Create new lesson
        this.lessonService.createLesson(lessonData).subscribe({
          next: async (lesson) => {
            try {
              // Handle keynotes and tags after lesson creation
              await this.handleKeynotes(lesson.lessonId);
              await this.handleTags(lesson.lessonId);
              
              this.snackBar.open(
                `Lesson created successfully with ${this.keynotes.length} keynote(s) and ${this.tags.length} tag(s)!`,
                'Close',
                { duration: 3000 }
              );
              this.submitting = false;
              this.goBack();
            } catch (error) {
              console.error('Error creating keynotes/tags:', error);
              this.snackBar.open(
                'Lesson created but some keynotes or tags failed to save',
                'Close',
                { duration: 5000 }
              );
              this.submitting = false;
              this.goBack();
            }
          },
          error: (error) => {
            console.error('Error creating lesson:', error);
            this.snackBar.open('Error creating lesson. Please try again.', 'Close', {
              duration: 5000
            });
            this.submitting = false;
          }
        });
      }
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000
      });
    }
  }  private async handleKeynotes(lessonId: number): Promise<void> {
    const keynotePromises: Promise<any>[] = [];
    const formKeynotes = this.lessonForm.get('keynotes')?.value || [];

    for (let index = 0; index < formKeynotes.length; index++) {
      const keynoteData = formKeynotes[index];
      const keynotePayload = {
        lessonId: lessonId,
        title: keynoteData.title,
        content: keynoteData.content,
        contentType: keynoteData.contentType,
        isImportant: keynoteData.isImportant || false,
        hasVisualAid: keynoteData.hasVisualAid || false,
        visualAidUrl: keynoteData.visualAidUrl || null,
        relatedPlanet: keynoteData.relatedPlanet || null,
        relatedZodiac: keynoteData.relatedZodiac || null
      };

      try {
        let savedKeynote;
        if (keynoteData.keynoteId) {
          // Update existing keynote
          savedKeynote = await this.keynoteService.updateKeynote(keynoteData.keynoteId, keynotePayload).toPromise();
        } else {
          // Create new keynote
          savedKeynote = await this.keynoteService.createKeynote(keynotePayload).toPromise();
        }        // Handle keynote tags after keynote is saved
        if (savedKeynote && savedKeynote.keynoteId && keynoteData.keynoteTags) {
          await this.handleKeynoteTags(savedKeynote.keynoteId, keynoteData.keynoteTags);
        }
      } catch (error) {
        console.error('Error handling keynote:', error);
        throw error;
      }
    }
  }

  private async handleKeynoteTags(keynoteId: number, keynoteTags: any[]): Promise<void> {
    if (this.isEditMode) {
      try {
        // Get existing keynote tags
        const existingKeynoteTags = await this.keynoteTagService.getTagsByKeynoteId(keynoteId).toPromise();
        const currentKeynoteTags = existingKeynoteTags || [];
        
        // Find keynote tags to delete
        const formKeynoteTagIds = keynoteTags.map((kt: any) => kt.keynoteTagId).filter((id: any) => id);
        const keynoteTagsToDelete = currentKeynoteTags.filter(kt => 
          kt.keynoteTagId && !formKeynoteTagIds.includes(kt.keynoteTagId)
        );
        
        // Delete removed keynote tags
        const deletePromises = keynoteTagsToDelete
          .filter(kt => kt.keynoteTagId)
          .map(kt => this.keynoteTagService.deleteKeynoteTag(kt.keynoteTagId!).toPromise());
        
        if (deletePromises.length > 0) {
          await Promise.all(deletePromises);
        }
        
        // Handle updates and additions
        const keynoteTagPromises: Promise<any>[] = [];
        keynoteTags.forEach((keynoteTagData: any) => {
          const keynoteTagPayload = {
            keynoteId: keynoteId,
            tagId: keynoteTagData.tagId,
            relevanceScore: keynoteTagData.relevanceScore || 5
          };
          
          if (keynoteTagData.keynoteTagId) {
            // Update existing keynote tag
            keynoteTagPromises.push(
              this.keynoteTagService.updateKeynoteTag(keynoteTagData.keynoteTagId, keynoteTagPayload).toPromise()
            );
          } else {
            // Add new keynote tag
            keynoteTagPromises.push(
              this.keynoteTagService.createKeynoteTag(keynoteTagPayload).toPromise()
            );
          }
        });
        
        if (keynoteTagPromises.length > 0) {
          await Promise.all(keynoteTagPromises);
        }
      } catch (error) {
        console.error('Error handling keynote tags:', error);
        throw error;
      }
    } else {
      // For create mode, just add all keynote tags
      const keynoteTagPromises: Promise<any>[] = [];
      keynoteTags.forEach((keynoteTagData: any) => {
        const keynoteTagPayload = {
          keynoteId: keynoteId,
          tagId: keynoteTagData.tagId,
          relevanceScore: keynoteTagData.relevanceScore || 5
        };
        keynoteTagPromises.push(
          this.keynoteTagService.createKeynoteTag(keynoteTagPayload).toPromise()
        );
      });
      
      if (keynoteTagPromises.length > 0) {
        await Promise.all(keynoteTagPromises);
      }
    }
  }private async handleTags(lessonId: number): Promise<void> {
    const formTags = this.lessonForm.get('tags')?.value || [];
    
    if (this.isEditMode) {
      // For edit mode, we need to handle deletions, updates, and additions
      try {
        // First, get existing tags for this lesson
        const existingTags = await this.lessonTagService.getTagsByLessonId(lessonId).toPromise();
        
        // Handle case where existingTags might be undefined
        const currentTags = existingTags || [];
        
        // Find tags to delete (existing tags not in the form)
        const formTagIds = formTags.map((tag: any) => tag.lessonTagId).filter((id: any) => id);
        const tagsToDelete = currentTags.filter(tag => 
          tag.lessonTagId && !formTagIds.includes(tag.lessonTagId)
        );
        
        // Delete removed tags
        const deletePromises = tagsToDelete
          .filter(tag => tag.lessonTagId) // Ensure lessonTagId exists
          .map(tag => 
            this.lessonTagService.deleteLessonTag(tag.lessonTagId!).toPromise()
          );
        if (deletePromises.length > 0) {
          await Promise.all(deletePromises);
        }
        
        // Handle updates and additions
        const tagPromises: Promise<any>[] = [];
        formTags.forEach((tagData: any) => {
          const tagPayload = {
            lessonId: lessonId,
            tagId: tagData.tagId,
            relevanceScore: tagData.relevanceScore || 1
          };
          
          if (tagData.lessonTagId) {
            // Update existing tag
            tagPromises.push(
              this.lessonTagService.updateLessonTag(tagData.lessonTagId, tagPayload).toPromise()
            );
          } else {
            // Add new tag
            tagPromises.push(
              this.lessonTagService.addLessonTag(tagPayload).toPromise()
            );
          }
        });
        
        if (tagPromises.length > 0) {
          await Promise.all(tagPromises);
        }
      } catch (error) {
        console.error('Error handling tags:', error);
        throw error;
      }
    } else {
      // For create mode, just add all tags
      const tagPromises: Promise<any>[] = [];
      formTags.forEach((tagData: any) => {
        const tagPayload = {
          lessonId: lessonId,
          tagId: tagData.tagId,
          relevanceScore: tagData.relevanceScore || 1
        };
        tagPromises.push(
          this.lessonTagService.addLessonTag(tagPayload).toPromise()
        );
      });
      
      if (tagPromises.length > 0) {
        await Promise.all(tagPromises);
      }
    }
  }
  goBack() {
    // Navigate back to lessons list with the current filter state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state || window.history.state;
    
    this.router.navigate(['/lessons'], { 
      state: { 
        selectedTopic: state?.selectedTopic,
        selectedCourse: state?.selectedCourse,
        selectedCategory: state?.selectedCategory
      } 
    });
  }

  async saveTag(tagIndex: number): Promise<void> {
    const tagForm = this.tags.at(tagIndex);
    if (!tagForm.valid) {
      this.snackBar.open('Please select a tag and enter a valid relevance score.', 'Close', { duration: 3000 });
      return;
    }
    if (!this.lessonId || typeof this.lessonId !== 'number') {
      this.snackBar.open('Lesson ID is missing. Cannot save tag.', 'Close', { duration: 3000 });
      return;
    }
    const tagData = tagForm.value;
    const tagPayload = {
      lessonId: this.lessonId as number,
      tagId: Number(tagData.tagId),
      relevanceScore: Number(tagData.relevanceScore)
    };
    try {
      if (tagData.lessonTagId) {
        await this.lessonTagService.updateLessonTag(tagData.lessonTagId, { ...tagPayload, lessonTagId: tagData.lessonTagId }).toPromise();
        this.snackBar.open('Tag updated successfully.', 'Close', { duration: 2000 });
      } else {
        const created = await this.lessonTagService.addLessonTag(tagPayload).toPromise();
        if (created && created.lessonTagId) {
          tagForm.patchValue({ lessonTagId: created.lessonTagId });
        }
        this.snackBar.open('Tag added successfully.', 'Close', { duration: 2000 });
      }
      this.loadTags(); // Always reload tags after add/update
    } catch (error: any) {
      let errorMsg = 'Failed to save tag. Please try again.';
      if (error && error.error && error.error.message) {
        errorMsg = error.error.message;
      } else if (error && error.message) {
        errorMsg = error.message;
      }
      this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      console.error('Error saving tag:', error);
    }
  }
}
