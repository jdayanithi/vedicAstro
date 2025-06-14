import { Routes } from '@angular/router';
import { CustomerViewComponent } from './customer-view.component';

export const CUSTOMERS_ROUTES: Routes = [
  { path: 'view', component: CustomerViewComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
];
