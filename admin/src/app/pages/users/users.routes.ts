import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';

export const USERS_ROUTES: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: AddUserComponent },
  { path: ':id', component: UserDetailsComponent }
];
