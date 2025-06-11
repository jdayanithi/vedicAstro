import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class UpdateCourseComponent {
  courseForm: FormGroup;
  courseId: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      loginId: ['', Validators.required],
      categoryId: [''],
      difficultyLevel: ['BEGINNER', Validators.required],
      price: ['', Validators.required],
      durationHours: [''],
      thumbnailUrl: [''],
      isPublished: [false]
    });

    this.courseId = +this.route.snapshot.params['id'];
    // Simulate fetching course data
    this.courseForm.patchValue({
      title: 'Sample Course',
      description: 'Sample Description',
      loginId: 1,
      categoryId: 2,
      difficultyLevel: 'BEGINNER',
      price: 100,
      durationHours: 10,
      thumbnailUrl: 'http://example.com/image.jpg',
      isPublished: true
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('Course updated:', this.courseForm.value);
    }
  }
}
