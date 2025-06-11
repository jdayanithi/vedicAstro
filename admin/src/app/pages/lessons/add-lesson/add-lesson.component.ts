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
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap, of } from 'rxjs';
import { LessonService, Lesson } from '../../../services/lesson.service';
import { TopicService, Topic } from '../../../services/topic.service';
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';
import { LessonTagService, LessonTag } from '../../../services/lesson-tag.service';
import { TagService, Tag } from '../../../services/tag.service';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [
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
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ isEditMode ? 'Edit Lesson' : 'Add New Lesson' }}</h1>
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

          <form *ngIf="!loading" [formGroup]="lessonForm" (ngSubmit)="onSubmit()">
            <!-- Lesson Basic Information -->
            <div class="section">
              <h3 class="section-title">
                <mat-icon>info</mat-icon>
                Lesson Information
              </h3>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Search Topic</mat-label>
                <input
                  type="text"
                  matInput
                  formControlName="topicSearch"
                  [matAutocomplete]="auto"
                  placeholder="Type to search topics..."
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
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="4" placeholder="Enter lesson description..."></textarea>
              </mat-form-field>

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
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Content</mat-label>
                      <textarea 
                        matInput 
                        formControlName="content" 
                        rows="4" 
                        required
                        [placeholder]="getContentPlaceholder(keynote.get('contentType')?.value)"
                      ></textarea>
                      <mat-hint>{{ getContentHint(keynote.get('contentType')?.value) }}</mat-hint>
                      <mat-error *ngIf="keynote.get('content')?.hasError('required')">
                        Content is required
                      </mat-error>
                    </mat-form-field>

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
                    </mat-form-field>

                    <div class="form-row">
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
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 15px;
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
    }

    .tag-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
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
export class AddLessonComponent implements OnInit {
  lessonForm: FormGroup;
  filteredTopics: Observable<Topic[]> = of([]);
  isEditMode = false;
  lessonId: number | null = null;
  allTags: Tag[] = []; // Available tags for selection
  loading = false;
  submitting = false;

  private fb = inject(FormBuilder);
  private lessonService = inject(LessonService);
  private topicService = inject(TopicService);
  private keynoteService = inject(LessonKeynoteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private lessonTagService = inject(LessonTagService);
  private tagService = inject(TagService);

  constructor() {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
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
  }

  ngOnInit() {
    this.setupTopicAutocomplete();
    this.checkEditMode();
    this.loadAllTags();
  }

  setupTopicAutocomplete() {
    this.filteredTopics = this.lessonForm.get('topicSearch')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this._filterTopics(value))
    );
  }

  private _filterTopics(value: string | Topic): Observable<Topic[]> {
    if (typeof value !== 'string') {
      return of([]);
    }
    if (!value || value.trim() === '') {
      return this.topicService.getAllTopics();
    }
    return this.topicService.getAllTopics();
  }

  displayTopicFn = (topic: Topic): string => {
    return topic ? `${topic.title} (ID: ${topic.topicId})` : '';
  }
  onTopicSelected(event: any) {
    const topic = event.option.value as Topic;
    this.lessonForm.patchValue({
      topicId: topic.topicId
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

  removeTag(index: number) {
    this.tags.removeAt(index);
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
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
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
      this.isEditMode = true;
      this.lessonId = +id;
      this.loadLesson();
    }
  }  loadLesson() {
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
                topicSearch: topic
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
          keynotes.forEach((keynote: LessonKeynote) => {
            const keynoteForm = this.fb.group({
              keynoteId: [keynote.keynoteId],
              title: [keynote.title, Validators.required],
              content: [keynote.content, Validators.required],
              contentType: [keynote.contentType, Validators.required],
              isImportant: [keynote.isImportant || false],
              hasVisualAid: [keynote.hasVisualAid || false],
              visualAidUrl: [keynote.visualAidUrl || ''],
              relatedPlanet: [keynote.relatedPlanet || ''],
              relatedZodiac: [keynote.relatedZodiac || ''],
              isNew: [false] // Existing keynotes are not expanded by default
            });
            this.keynotes.push(keynoteForm);
          });
        },
        error: () => {
          this.snackBar.open('Error loading keynotes', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  loadTags() {
    if (this.lessonId) {
      this.lessonTagService.getTagsByLessonId(this.lessonId).subscribe({
        next: (tags: LessonTag[]) => {
          while (this.tags.length !== 0) {
            this.tags.removeAt(0);
          }
          tags.forEach((tag: LessonTag) => {
            const tagForm = this.fb.group({
              lessonTagId: [tag.lessonTagId],
              tagId: [tag.tagId, Validators.required],
              tagName: [tag.tagName || ''],
              relevanceScore: [tag.relevanceScore || 1]
            });
            this.tags.push(tagForm);
          });
        },
        error: () => {
          this.snackBar.open('Error loading tags', 'Close', { duration: 3000 });
        }
      });
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
  }  onSubmit() {
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
          next: () => {
            // Handle keynotes and tags after lesson update
            this.handleKeynotes(this.lessonId!);
            this.handleTags(this.lessonId!);
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
          next: (lesson) => {
            // Handle keynotes and tags after lesson creation
            this.handleKeynotes(lesson.lessonId);
            this.handleTags(lesson.lessonId);
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
  }

  private handleKeynotes(lessonId: number) {
    const keynotePromises: Promise<any>[] = [];
    const formKeynotes = this.lessonForm.get('keynotes')?.value || [];

    formKeynotes.forEach((keynoteData: any, index: number) => {
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

      if (keynoteData.keynoteId) {
        // Update existing keynote
        keynotePromises.push(
          this.keynoteService.updateKeynote(keynoteData.keynoteId, keynotePayload).toPromise()
        );
      } else {
        // Create new keynote
        keynotePromises.push(
          this.keynoteService.createKeynote(keynotePayload).toPromise()
        );
      }
    });    // Execute all keynote operations
    if (keynotePromises.length > 0) {
      Promise.all(keynotePromises)
        .then(() => {
          this.snackBar.open(
            `Lesson ${this.isEditMode ? 'updated' : 'created'} successfully with ${keynotePromises.length} keynote(s)!`,
            'Close',
            { duration: 3000 }
          );
          this.submitting = false;
          this.goBack();
        })
        .catch(() => {
          this.snackBar.open(
            `Lesson ${this.isEditMode ? 'updated' : 'created'} but some keynotes failed to save`,
            'Close',
            { duration: 5000 }
          );
          this.submitting = false;
          this.goBack();
        });
    } else {
      this.snackBar.open(
        `Lesson ${this.isEditMode ? 'updated' : 'created'} successfully!`,
        'Close',
        { duration: 3000 }
      );
      this.submitting = false;
      this.goBack();
    }
  }

  private handleTags(lessonId: number) {
    const tagPromises: Promise<any>[] = [];
    const formTags = this.lessonForm.get('tags')?.value || [];

    formTags.forEach((tagData: any) => {
      const tagPayload = {
        lessonId: lessonId,
        tagId: tagData.tagId,
        relevanceScore: tagData.relevanceScore || 1
      };
      if (tagData.lessonTagId) {
        tagPromises.push(
          this.lessonTagService.updateLessonTag(tagData.lessonTagId, tagPayload).toPromise()
        );
      } else {
        tagPromises.push(
          this.lessonTagService.addLessonTag(tagPayload).toPromise()
        );
      }
    });
    return Promise.all(tagPromises);
  }

  goBack() {
    this.router.navigate(['/lessons']);
  }
}
