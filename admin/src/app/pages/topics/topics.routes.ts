import { Routes } from '@angular/router';
import { TopicListComponent } from './topic-list/topic-list.component';
import { AddTopicComponent } from './add-topic/add-topic.component';

export const TOPICS_ROUTES: Routes = [
  { path: '', component: TopicListComponent },
  { path: 'add', component: AddTopicComponent },
  { path: 'update/:id', component: AddTopicComponent }
];
