import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { TopicService, Topic } from '../../services/topic.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-topics-view',
  templateUrl: './topics-view.component.html',
  styleUrls: ['./topics-view.component.css']
})
export class TopicsViewComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicService: TopicService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getAllTopics().subscribe(
      (data: Topic[]) => {
        this.topics = data;
      },
      (error) => {
        console.error('Error fetching topics', error);
      }
    );
  }
}
