import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { Lesson } from '../models/lesson.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.getLessons().subscribe(
      (data: Lesson[]) => {
        this.lessons = data;
      },
      (error) => {
        console.error('Error fetching lessons', error);
      }
    );
  }
}