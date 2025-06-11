import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number;

  constructor(private fb: FormBuilder, private courseService: CourseService, private route: ActivatedRoute) {
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

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.courseForm.patchValue(course);
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.updateCourse(this.courseId, this.courseForm.value).subscribe(response => {
        console.log('Course updated successfully', response);
      });
    }
  }
}
