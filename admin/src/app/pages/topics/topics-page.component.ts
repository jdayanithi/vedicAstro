import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';
import { Topic } from '../topic.model';

@Component({
  selector: 'app-topics-view',
  templateUrl: './topics-view.component.html',
  styleUrls: ['./topics-view.component.css']
})
export class TopicsViewComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.topicService.getTopics().subscribe(
      (data: Topic[]) => {
        this.topics = data;
      },
      (error) => {
        console.error('Error fetching topics', error);
      }
    );
  }
}