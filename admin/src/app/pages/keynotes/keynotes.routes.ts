import { Routes } from '@angular/router';
import { KeynoteListComponent } from './keynote-list/keynote-list.component';
import { KeynoteDetailsComponent } from './keynote-details/keynote-details.component';
import { AddKeynoteComponent } from './add-keynote/add-keynote.component';

export const KEYNOTES_ROUTES: Routes = [
  { path: '', component: KeynoteListComponent },
  { path: 'add', component: AddKeynoteComponent },
  { path: 'edit/:id', component: AddKeynoteComponent },
  { path: ':id', component: KeynoteDetailsComponent }
];
