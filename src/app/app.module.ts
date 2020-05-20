import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { AppRoutinModule } from './app.routing.module';
import { HomeModule } from './core/home/home.module';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ProdutoModule } from './core/products/products.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HomeModule,
    ProdutoModule,
    BrowserModule,
    ErrorsModule,
    AppRoutinModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
