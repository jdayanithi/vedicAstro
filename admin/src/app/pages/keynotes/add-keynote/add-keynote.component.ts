import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';
import { LessonService } from '../../../services/lesson.service';
import { KeynoteTagService, KeynoteTag } from '../../../services/keynote-tag.service';
import { TagService, Tag } from '../../../services/tag.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-keynote',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatTooltipModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>{{ isEditMode ? 'Edit Keynote' : 'Add New Keynote' }}</h1>
        <button mat-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Keynotes
        </button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Keynote Details' : 'Keynote Information' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
          </div>

          <form *ngIf="!loading" [formGroup]="keynoteForm" (ngSubmit)="onSubmit()" class="keynote-form">
            <!-- Basic Information -->
            <div class="section">
              <h3>Basic Information</h3>
              
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Lesson</mat-label>
                  <input matInput
                         formControlName="lessonSearch"
                         [matAutocomplete]="lessonAuto"
                         placeholder="Search and select lesson">
                  <mat-autocomplete #lessonAuto="matAutocomplete" [displayWith]="displayLessonFn">
                    <mat-option *ngFor="let lesson of filteredLessons | async" [value]="lesson">
                      <div class="lesson-option">
                        <span class="lesson-title">{{lesson.title}}</span>
                        <span class="topic-title">{{lesson.topicTitle}}</span>
                      </div>
                    </mat-option>
                  </mat-autocomplete>
                  <mat-error *ngIf="keynoteForm.get('lessonSearch')?.hasError('required')">
                    Lesson is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Order Sequence</mat-label>
                  <input matInput 
                         type="number" 
                         formControlName="orderSequence" 
                         placeholder="Auto-assigned if empty">
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Title</mat-label>
                <input matInput formControlName="title" placeholder="Enter keynote title">
                <mat-error *ngIf="keynoteForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Content Type</mat-label>
                  <mat-select formControlName="contentType">
                    <mat-option value="text">Text</mat-option>
                    <mat-option value="bullet_points">Bullet Points</mat-option>
                    <mat-option value="quote">Quote</mat-option>
                    <mat-option value="example">Example</mat-option>
                  </mat-select>
                  <mat-error *ngIf="keynoteForm.get('contentType')?.hasError('required')">
                    Content type is required
                  </mat-error>
                </mat-form-field>

                <div class="checkbox-group">
                  <mat-checkbox formControlName="isImportant">
                    <mat-icon>star</mat-icon>
                    Mark as Important
                  </mat-checkbox>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="section">
              <h3>Content</h3>
              
              <mat-form-field appearance="outline">
                <mat-label>Content</mat-label>
                <textarea matInput 
                          formControlName="content" 
                          rows="6" 
                          placeholder="Enter keynote content">
                </textarea>
                <mat-hint>
                  <span *ngIf="keynoteForm.get('contentType')?.value === 'bullet_points'">
                    Use bullet points format (• item 1, • item 2, etc.)
                  </span>
                  <span *ngIf="keynoteForm.get('contentType')?.value === 'quote'">
                    Include quotation marks for quotes
                  </span>
                </mat-hint>
                <mat-error *ngIf="keynoteForm.get('content')?.hasError('required')">
                  Content is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Visual Aid Section -->
            <div class="section">
              <h3>Visual Aid</h3>
              
              <div class="checkbox-group">
                <mat-checkbox formControlName="hasVisualAid" (change)="onVisualAidChange($event)">
                  <mat-icon>image</mat-icon>
                  Has Visual Aid
                </mat-checkbox>
              </div>

              <mat-form-field appearance="outline" *ngIf="keynoteForm.get('hasVisualAid')?.value">
                <mat-label>Visual Aid URL</mat-label>
                <input matInput formControlName="visualAidUrl" placeholder="Enter image/media URL">
                <mat-hint>URL to image, diagram, or other visual content</mat-hint>
              </mat-form-field>
            </div>            <!-- Astrological Information -->
            <div class="section">
              <h3>Astrological Relations</h3>
              
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Related Planet</mat-label>
                  <mat-select formControlName="relatedPlanet">
                    <mat-option value="">None</mat-option>
                    <mat-option *ngFor="let planet of planets" [value]="planet">
                      {{planet}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Related Zodiac Sign</mat-label>
                  <mat-select formControlName="relatedZodiac">
                    <mat-option value="">None</mat-option>
                    <mat-option *ngFor="let sign of zodiacSigns" [value]="sign">
                      {{sign}}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- Tags Section -->
            <div class="section">
              <div class="section-header">
                <h3 class="section-title">
                  <mat-icon>label</mat-icon>
                  Keynote Tags
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

              <div class="tags-container" formArrayName="keynoteTags">
                <div 
                  *ngFor="let tag of keynoteTags.controls; let i = index" 
                  [formGroupName]="i"
                  class="tag-item"
                >
                  <mat-form-field appearance="outline" class="full-width">
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
                    <input matInput formControlName="relevanceScore" type="number" min="1" max="10" />
                    <mat-hint>Enter a score from 1-10 indicating relevance to the keynote</mat-hint>
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

                <div *ngIf="keynoteTags.length === 0" class="no-tags">
                  <mat-icon>label_off</mat-icon>
                  <p>No tags added yet. Click "Add Tag" to start tagging this keynote.</p>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      [disabled]="keynoteForm.invalid || submitting">
                <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                {{ submitting ? 'Saving...' : (isEditMode ? 'Update Keynote' : 'Create Keynote') }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header h1 {
      margin: 0;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .keynote-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .section {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background-color: #fafafa;
    }

    .section h3 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: start;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    mat-form-field {
      width: 100%;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }

    .checkbox-group mat-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .lesson-option {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 0;
    }

    .lesson-title {
      font-weight: 500;
      color: #333;
    }

    .topic-title {
      font-size: 12px;
      color: #666;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }    .form-actions button {
      min-width: 120px;
    }

    /* Tags specific styles */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }

    .add-tag-btn {
      min-width: auto;
    }

    .tags-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .tag-item {
      display: grid;
      grid-template-columns: 2fr 1fr auto;
      gap: 12px;
      align-items: start;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #fff;
    }

    .tag-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .save-tag-btn {
      background-color: #4caf50;
      color: white;
    }

    .no-tags {
      text-align: center;
      padding: 40px 20px;
      color: #666;
      border: 2px dashed #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .no-tags mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ccc;
      margin-bottom: 8px;
    }

    .no-tags p {
      margin: 0;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class AddKeynoteComponent implements OnInit {
  keynoteForm: FormGroup;
  isEditMode = false;
  keynoteId: number | null = null;
  loading = false;
  submitting = false;
  lessons: any[] = [];
  filteredLessons: Observable<any[]>;
  allTags: Tag[] = [];

  planets = [
    'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'
  ];

  zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  constructor(
    private fb: FormBuilder,
    private keynoteService: LessonKeynoteService,
    private lessonService: LessonService,
    private keynoteTagService: KeynoteTagService,
    private tagService: TagService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.keynoteForm = this.createForm();
    this.filteredLessons = this.keynoteForm.get('lessonSearch')!.valueChanges.pipe(
      startWith(''),
      map(value => this.filterLessons(value))
    );
  }
  ngOnInit(): void {
    this.loadLessons();
    this.loadAllTags();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.keynoteId = +params['id'];
        this.loadKeynote();
      }
    });
  }

  get keynoteTags(): FormArray {
    return this.keynoteForm.get('keynoteTags') as FormArray;
  }
  createForm(): FormGroup {
    return this.fb.group({
      lessonSearch: ['', [Validators.required]],
      lessonId: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      contentType: ['text', [Validators.required]],
      orderSequence: [''],
      isImportant: [false],
      hasVisualAid: [false],
      visualAidUrl: [''],
      relatedPlanet: [''],
      relatedZodiac: [''],
      keynoteTags: this.fb.array([])
    });
  }  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons: any[]) => {
        this.lessons = lessons;
      },
      error: (error: any) => {
        console.error('Error loading lessons:', error);
        this.errorHandler.handleApiError(error, 'loading lessons');
      }
    });
  }
  loadKeynote(): void {
    if (!this.keynoteId) return;

    this.loading = true;
    this.keynoteService.getKeynoteById(this.keynoteId).subscribe({
      next: (keynote) => {
        // Find the lesson for autocomplete
        const lesson = this.lessons.find(l => l.lessonId === keynote.lessonId);
        
        this.keynoteForm.patchValue({
          ...keynote,
          lessonSearch: lesson
        });
        
        // Load existing tags
        this.loadKeynoteTags();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading keynote:', error);
        this.errorHandler.handleApiError(error, 'loading keynote details');
        this.loading = false;
      }
    });
  }

  filterLessons(value: any): any[] {
    if (!value || typeof value === 'object') {
      return this.lessons;
    }
    
    const filterValue = value.toLowerCase();
    return this.lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(filterValue) ||
      lesson.topicTitle?.toLowerCase().includes(filterValue)
    );
  }

  displayLessonFn = (lesson: any): string => {
    return lesson ? lesson.title : '';
  }

  onVisualAidChange(event: any): void {
    if (!event.checked) {
      this.keynoteForm.patchValue({ visualAidUrl: '' });
    }
  }
  onSubmit(): void {
    if (this.keynoteForm.invalid) return;

    this.submitting = true;
    const formValue = this.keynoteForm.value;
    
    // Extract lesson ID from selected lesson
    const selectedLesson = formValue.lessonSearch;
    if (!selectedLesson || !selectedLesson.lessonId) {
      this.snackBar.open('Please select a valid lesson', 'Close', { duration: 3000 });
      this.submitting = false;
      return;
    }

    const keynoteData: LessonKeynote = {
      lessonId: selectedLesson.lessonId,
      title: formValue.title,
      content: formValue.content,
      contentType: formValue.contentType,
      orderSequence: formValue.orderSequence || undefined,
      isImportant: formValue.isImportant,
      hasVisualAid: formValue.hasVisualAid,
      visualAidUrl: formValue.hasVisualAid ? formValue.visualAidUrl : null,
      relatedPlanet: formValue.relatedPlanet || null,
      relatedZodiac: formValue.relatedZodiac || null
    };

    const request = this.isEditMode 
      ? this.keynoteService.updateKeynote(this.keynoteId!, keynoteData)
      : this.keynoteService.createKeynote(keynoteData);

    request.subscribe({
      next: async (result) => {
        try {
          // Update keynoteId if this is a new keynote
          if (!this.isEditMode && result.keynoteId) {
            this.keynoteId = result.keynoteId;
          }

          // Handle tags after keynote save
          await this.handleKeynoteTags();

          const message = this.isEditMode 
            ? `Keynote updated successfully with ${this.keynoteTags.length} tag(s)!`
            : `Keynote created successfully with ${this.keynoteTags.length} tag(s)!`;
          
          this.errorHandler.showSuccess(message);
          this.router.navigate(['/keynotes']);
        } catch (error) {
          console.error('Error handling keynote tags:', error);
          const fallbackMessage = this.isEditMode 
            ? 'Keynote updated but some tags failed to save' 
            : 'Keynote created but some tags failed to save';
          
          this.errorHandler.showWarning(fallbackMessage);
          this.router.navigate(['/keynotes']);
        }
      },
      error: (error) => {
        console.error('Error saving keynote:', error);
        this.errorHandler.handleApiError(error, 'saving keynote');
        this.submitting = false;
      }
    });
  }

  private async handleKeynoteTags(): Promise<void> {
    if (!this.keynoteId) {
      throw new Error('Keynote ID is required to handle tags');
    }

    const formTags = this.keynoteTags.value || [];
    
    for (let i = 0; i < formTags.length; i++) {
      const tagData = formTags[i];
      
      // Skip empty or invalid tags
      if (!tagData.tagId || !tagData.relevanceScore) {
        continue;
      }

      const tagPayload = {
        keynoteId: this.keynoteId,
        tagId: Number(tagData.tagId),
        relevanceScore: Number(tagData.relevanceScore)
      };

      try {
        if (tagData.keynoteTagId) {
          // Update existing tag
          await this.keynoteTagService.updateKeynoteTag(tagData.keynoteTagId, {
            ...tagPayload,
            keynoteTagId: tagData.keynoteTagId
          }).toPromise();
        } else {
          // Create new tag
          const created = await this.keynoteTagService.createKeynoteTag(tagPayload).toPromise();
          if (created && created.keynoteTagId) {
            // Update the form with the new keynoteTagId
            const tagForm = this.keynoteTags.at(i);
            tagForm.patchValue({ keynoteTagId: created.keynoteTagId });
          }
        }
      } catch (error) {
        console.error(`Error handling keynote tag at index ${i}:`, error);
        throw error;
      }
    }
  }

  // Tag-related methods
  loadAllTags(): void {
    this.tagService.getTags().subscribe({
      next: (tags: Tag[]) => {
        this.allTags = tags;
      },
      error: (error) => {
        this.errorHandler.handleApiError(error, 'loading tags');
      }
    });
  }

  loadKeynoteTags(): void {
    if (!this.keynoteId) return;

    this.keynoteTagService.getTagsByKeynoteId(this.keynoteId).subscribe({
      next: (keynoteTags: KeynoteTag[]) => {
        // Clear existing tags
        while (this.keynoteTags.length !== 0) {
          this.keynoteTags.removeAt(0);
        }
        
        // Add existing keynote tags to the form
        keynoteTags.forEach((keynoteTag: KeynoteTag) => {
          const keynoteTagForm = this.fb.group({
            keynoteTagId: [keynoteTag.keynoteTagId],
            tagId: [keynoteTag.tagId, Validators.required],
            relevanceScore: [keynoteTag.relevanceScore || 5]
          });
          this.keynoteTags.push(keynoteTagForm);
        });
      },
      error: (error) => {
        this.errorHandler.handleApiError(error, 'loading keynote tags');
      }
    });
  }

  addTag(): void {
    const tagForm = this.fb.group({
      keynoteTagId: [null],
      tagId: [null, Validators.required],
      relevanceScore: [5]
    });
    this.keynoteTags.push(tagForm);
  }

  async saveTag(index: number): Promise<void> {
    const tagForm = this.keynoteTags.at(index);
    
    if (!tagForm.valid) {
      this.snackBar.open('Please select a tag and enter a valid relevance score.', 'Close', { duration: 3000 });
      return;
    }
    
    if (!this.keynoteId) {
      this.snackBar.open('Keynote must be saved before adding tags.', 'Close', { duration: 3000 });
      return;
    }

    const tagData = tagForm.value;
    const tagPayload = {
      keynoteId: this.keynoteId,
      tagId: Number(tagData.tagId),
      relevanceScore: Number(tagData.relevanceScore)
    };

    try {
      if (tagData.keynoteTagId) {
        // Update existing tag
        await this.keynoteTagService.updateKeynoteTag(tagData.keynoteTagId, { 
          ...tagPayload, 
          keynoteTagId: tagData.keynoteTagId 
        }).toPromise();
        this.errorHandler.showSuccess('Tag updated successfully.');      } else {
        // Create new tag
        const created = await this.keynoteTagService.createKeynoteTag(tagPayload).toPromise();
        if (created && created.keynoteTagId) {
          tagForm.patchValue({ keynoteTagId: created.keynoteTagId });
        }
        this.errorHandler.showSuccess('Tag added successfully.');
      }
      
      // Reload tags to ensure consistency
      this.loadKeynoteTags();
    } catch (error: any) {
      this.errorHandler.handleApiError(error, 'saving tag');
    }
  }

  async removeTag(index: number): Promise<void> {
    const tagForm = this.keynoteTags.at(index);
    const tagData = tagForm.value;
    
    if (tagData.keynoteTagId) {
      // Delete from backend
      try {
        await this.keynoteTagService.deleteKeynoteTag(tagData.keynoteTagId).toPromise();
        this.errorHandler.showSuccess('Tag deleted successfully.');
        this.loadKeynoteTags();
      } catch (error: any) {
        this.errorHandler.handleApiError(error, 'deleting tag');
      }
    } else {
      // Just remove locally if not saved yet
      this.keynoteTags.removeAt(index);
    }
  }

  goBack(): void {
    this.router.navigate(['/keynotes']);
  }
}
