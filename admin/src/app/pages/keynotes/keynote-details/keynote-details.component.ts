import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LessonKeynoteService, LessonKeynote } from '../../../services/lesson-keynote.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-keynote-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Keynote Details</h1>
        <div class="actions">
          <button mat-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to Keynotes
          </button>          <button mat-raised-button color="accent" [routerLink]="['/keynotes/edit', keynote.keynoteId]" *ngIf="keynote">
            <mat-icon>edit</mat-icon>
            Edit Keynote
          </button>
        </div>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading && keynote" class="keynote-details">
        <!-- Header Information -->
        <mat-card class="info-card header-card">
          <mat-card-content>
            <div class="keynote-header">
              <div class="title-section">
                <h2 class="keynote-title">{{keynote.title}}</h2>
                <div class="badges">
                  <mat-chip class="order-badge">Order: {{keynote.orderSequence}}</mat-chip>
                  <mat-chip *ngIf="keynote.isImportant" class="important-badge">
                    <mat-icon>star</mat-icon>
                    Important
                  </mat-chip>
                  <mat-chip class="content-type-badge content-type-{{keynote.contentType}}">
                    {{getContentTypeLabel(keynote.contentType)}}
                  </mat-chip>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Lesson Information -->
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>Lesson Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Lesson:</span>
                <span class="value lesson-link">{{keynote.lessonTitle}}</span>
              </div>
              <div class="info-item" *ngIf="keynote.topicTitle">
                <span class="label">Topic:</span>
                <span class="value">{{keynote.topicTitle}}</span>
              </div>
              <div class="info-item">
                <span class="label">Lesson ID:</span>
                <span class="value">{{keynote.lessonId}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Content -->
        <mat-card class="info-card content-card">
          <mat-card-header>
            <mat-card-title>Content</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="content-display" [ngClass]="'content-type-' + keynote.contentType">
              <div *ngIf="keynote.contentType === 'bullet_points'" class="bullet-content">
                <ul>
                  <li *ngFor="let point of getBulletPoints(keynote.content)">{{point}}</li>
                </ul>
              </div>
              <div *ngIf="keynote.contentType === 'quote'" class="quote-content">
                <blockquote>
                  <mat-icon>format_quote</mat-icon>
                  {{keynote.content}}
                </blockquote>
              </div>
              <div *ngIf="keynote.contentType === 'text' || keynote.contentType === 'example'" class="text-content">
                <p>{{keynote.content}}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Visual Aid -->
        <mat-card class="info-card" *ngIf="keynote.hasVisualAid && keynote.visualAidUrl">
          <mat-card-header>
            <mat-card-title>Visual Aid</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="visual-aid-container">
              <img [src]="keynote.visualAidUrl" 
                   [alt]="keynote.title"
                   (error)="onImageError($event)"
                   class="visual-aid-image">
              <div class="visual-aid-url">
                <span class="label">URL:</span>
                <a [href]="keynote.visualAidUrl" target="_blank" class="url-link">
                  {{keynote.visualAidUrl}}
                  <mat-icon>open_in_new</mat-icon>
                </a>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Astrological Information -->
        <mat-card class="info-card" *ngIf="keynote.relatedPlanet || keynote.relatedZodiac">
          <mat-card-header>
            <mat-card-title>Astrological Relations</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="astro-chips">
              <mat-chip *ngIf="keynote.relatedPlanet" class="planet-chip">
                <mat-icon>brightness_1</mat-icon>
                {{keynote.relatedPlanet}}
              </mat-chip>
              <mat-chip *ngIf="keynote.relatedZodiac" class="zodiac-chip">
                <mat-icon>stars</mat-icon>
                {{keynote.relatedZodiac}}
              </mat-chip>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- System Information -->
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>System Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Keynote ID:</span>
                <span class="value">{{keynote.keynoteId}}</span>
              </div>
              <div class="info-item" *ngIf="keynote.createdAt">
                <span class="label">Created:</span>
                <span class="value">{{keynote.createdAt | date:'medium'}}</span>
              </div>
              <div class="info-item" *ngIf="keynote.updatedAt">
                <span class="label">Last Updated:</span>
                <span class="value">{{keynote.updatedAt | date:'medium'}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!loading && !keynote" class="no-keynote">
        <mat-icon>note_alt</mat-icon>
        <h2>Keynote Not Found</h2>
        <p>The keynote you're looking for doesn't exist or has been deleted.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          Go Back to Keynotes
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
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

    .actions {
      display: flex;
      gap: 12px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 60px;
    }

    .keynote-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-card {
      width: 100%;
    }

    .header-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .header-card .mat-mdc-card-content {
      padding: 24px;
    }

    .keynote-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .keynote-title {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: white;
    }

    .badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .order-badge {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .important-badge {
      background-color: #ff6b6b;
      color: white;
    }

    .content-type-badge {
      color: white;
      font-weight: 500;
    }

    .content-type-text {
      background-color: rgba(76, 175, 80, 0.8);
    }

    .content-type-bullet_points {
      background-color: rgba(255, 152, 0, 0.8);
    }

    .content-type-quote {
      background-color: rgba(156, 39, 176, 0.8);
    }

    .content-type-example {
      background-color: rgba(33, 150, 243, 0.8);
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      align-items: center;
      min-height: 40px;
    }

    .label {
      font-weight: 600;
      color: #666;
      min-width: 100px;
      margin-right: 12px;
    }

    .value {
      color: #333;
      word-break: break-word;
    }

    .lesson-link {
      color: #1976d2;
      cursor: pointer;
      text-decoration: underline;
    }

    .content-card {
      min-height: 150px;
    }

    .content-display {
      font-size: 16px;
      line-height: 1.6;
    }

    .bullet-content ul {
      margin: 0;
      padding-left: 20px;
    }

    .bullet-content li {
      margin-bottom: 8px;
    }

    .quote-content blockquote {
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
      border-left: 4px solid #9c27b0;
      border-radius: 4px;
      font-style: italic;
      position: relative;
    }

    .quote-content mat-icon {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #9c27b0;
      opacity: 0.3;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .text-content p {
      margin: 0;
      color: #333;
    }

    .visual-aid-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .visual-aid-image {
      max-width: 100%;
      max-height: 400px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .visual-aid-url {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .url-link {
      color: #1976d2;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .url-link:hover {
      text-decoration: underline;
    }

    .url-link mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .astro-chips {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .planet-chip {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .zodiac-chip {
      background-color: #e1f5fe;
      color: #0277bd;
    }

    .planet-chip mat-icon,
    .zodiac-chip mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .no-keynote {
      text-align: center;
      padding: 80px 20px;
      color: #666;
    }

    .no-keynote mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }

    .no-keynote h2 {
      margin: 16px 0;
      color: #333;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .actions {
        width: 100%;
        justify-content: flex-start;
      }

      .keynote-header {
        flex-direction: column;
        gap: 16px;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .label {
        min-width: auto;
        margin-right: 0;
        margin-bottom: 4px;
      }
    }
  `]
})
export class KeynoteDetailsComponent implements OnInit {
  keynoteId: number | null = null;
  keynote: LessonKeynote | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private keynoteService: LessonKeynoteService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.keynoteId = +params['id'];
        this.loadKeynote();
      }
    });
  }

  loadKeynote(): void {
    if (!this.keynoteId) return;

    this.loading = true;
    this.keynoteService.getKeynoteById(this.keynoteId).subscribe({
      next: (keynote) => {
        this.keynote = keynote;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading keynote:', error);
        this.snackBar.open('Error loading keynote details', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  getContentTypeLabel(contentType: string): string {
    switch (contentType) {
      case 'text': return 'Text';
      case 'bullet_points': return 'Bullet Points';
      case 'quote': return 'Quote';
      case 'example': return 'Example';
      default: return contentType;
    }
  }

  getBulletPoints(content: string): string[] {
    return content.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[â€¢\-\*]\s*/, ''));
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  goBack(): void {
    this.router.navigate(['/keynotes']);
  }
}

