import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './core/components/notification/notification.component';
import { HttpLoadingInterceptor } from './core/interceptors/http-loading.interceptor';
import { STREAM_ERROR_HANDLER_PROVIDER } from './shared/operators/error-handler/error-handler.operator';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    STREAM_ERROR_HANDLER_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
