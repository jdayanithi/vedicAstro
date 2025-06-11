import { Routes } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

export const PAYMENT_ROUTES: Routes = [
  { path: '', component: PaymentListComponent },
  { path: 'add', component: PaymentFormComponent },
  { path: 'edit/:id', component: PaymentFormComponent }
];
