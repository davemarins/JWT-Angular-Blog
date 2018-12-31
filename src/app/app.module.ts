import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { NewArticleComponent } from './components/blog/newarticle/newarticle.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // always from /common/
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogComponent } from './components/blog/blog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // for Bootstrap Angular
import { SubscribersComponent } from './components/subscribers/subscribers.component'; // for the text editor
import { NewMailComponent } from './components/newsletter/newmail/newmail.component';
import { EditArticleComponent } from './components/blog/editarticle/editarticle.component';
import { UnsubscribeComponent } from './components/subscribers/unsubscribe/unsubscribe.component';
import { SubscribeComponent } from './components/subscribers/subscribe/subscribe.component';
import { TokenInterceptor } from './services/token.interceptor';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ShowMailComponent } from './components/newsletter/showmail/showmail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    // SignupComponent,
    NewArticleComponent,
    RequestResetComponent,
    ResponseResetComponent,
    BlogComponent,
    SubscribersComponent,
    NewMailComponent,
    EditArticleComponent,
    UnsubscribeComponent,
    SubscribeComponent,
    NewsletterComponent,
    ShowMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    // for Bootstrap
    NgbModule,
    // for Font Awesome Icons
    AngularFontAwesomeModule,
    // for Session Countdown
    // CountdownModule,
    // text editor inside the dashboard
    CKEditorModule,
    // Chart.JS module for amazing charts
    ChartsModule
  ],
  providers: [
    // in order to use JWT for API with auth restriction
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
