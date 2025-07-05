import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course.courseId !== courseId);
    });
  }
}
