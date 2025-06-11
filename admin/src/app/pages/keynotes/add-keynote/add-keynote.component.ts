import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';
import { LessonService } from '../../../services/lesson.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-keynote',
  standalone: true,
  imports: [
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
    MatAutocompleteModule
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
            </div>

            <!-- Astrological Information -->
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
    }

    .form-actions button {
      min-width: 120px;
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
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.keynoteId = +params['id'];
        this.loadKeynote();
      }
    });
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
      relatedZodiac: ['']
    });
  }
  loadLessons(): void {
    this.lessonService.getAllLessons().subscribe({
      next: (lessons: any[]) => {
        this.lessons = lessons;
      },
      error: (error: any) => {
        console.error('Error loading lessons:', error);
        this.snackBar.open('Error loading lessons', 'Close', { duration: 3000 });
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
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading keynote:', error);
        this.snackBar.open('Error loading keynote details', 'Close', { duration: 3000 });
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
      next: (result) => {
        const message = this.isEditMode ? 'Keynote updated successfully' : 'Keynote created successfully';
        this.snackBar.open(message, 'Close', { duration: 3000 });
        this.router.navigate(['/keynotes']);
      },
      error: (error) => {
        console.error('Error saving keynote:', error);
        const message = error.error?.message || 'Error saving keynote';
        this.snackBar.open(message, 'Close', { duration: 5000 });
        this.submitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/keynotes']);
  }
}
