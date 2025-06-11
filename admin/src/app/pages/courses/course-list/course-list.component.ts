import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Courses</h1>
        <button mat-raised-button color="primary" routerLink="add">
          <mat-icon>add</mat-icon>
          Add Course
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="courses" class="full-width">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let course">{{course.title}}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let course">{{course.description}}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let course">{{course.price | currency}}</td>
            </ng-container>

            <ng-container matColumnDef="difficultyLevel">
              <th mat-header-cell *matHeaderCellDef>Difficulty</th>
              <td mat-cell *matCellDef="let course">{{course.difficultyLevel}}</td>
            </ng-container>

            <ng-container matColumnDef="isPublished">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let course">
                {{course.isPublished ? 'Published' : 'Draft'}}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let course">
                <button mat-icon-button color="primary" [routerLink]="['update', course.courseId]">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteCourse(course.courseId)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  displayedColumns: string[] = ['title', 'description', 'price', 'difficultyLevel', 'isPublished', 'actions'];

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: () => {
        this.snackBar.open('Error loading courses', 'Close', {
          duration: 3000
        });
      }
    });
  }

  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
          this.snackBar.open('Course deleted successfully', 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Error deleting course', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
