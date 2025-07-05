import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './AngularMaterialModule';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CoursesExplorerComponent } from './pages/courses/courses-explorer/courses-explorer.component';
import { PurchaseFormComponent } from './pages/courses/purchase-form/purchase-form.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './shared/shared.module';

@NgModule({ declarations: [
        AppComponent,
        CreatePostComponent,
        ViewAllComponent,
        ViewPostComponent,
        SearchByNameComponent,
        LoginComponent,
        CoursesExplorerComponent,
        PurchaseFormComponent,
        ErrorDialogComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule.forRoot({}),
        SharedModule,
        LandingComponent],providers: [
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
        provideHttpClient(withInterceptorsFromDi())
    ]})
export class AppModule { }
