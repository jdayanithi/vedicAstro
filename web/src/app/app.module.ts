import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './AngularMaterialModule';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PerformanceInterceptor } from './interceptors/performance.interceptor';
import { PerformanceDashboardComponent } from './components/performance-dashboard/performance-dashboard.component';
import { IonicModule } from '@ionic/angular';

@NgModule({ 
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    PerformanceDashboardComponent
  ],
  bootstrap: [AppComponent], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot({}),
    LandingComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PerformanceInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
