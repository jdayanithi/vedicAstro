import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
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
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe(response => {
        console.log('Course added successfully', response);
      });
    }
  }
}
