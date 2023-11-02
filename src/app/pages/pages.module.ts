import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorIdInterceptor } from '../core/interceptors/author-id.interceptor';
import { ValidationsPipe } from '../core/pipes/validations.pipe';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    ValidationsPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorIdInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },

  ],
})
export class PagesModule { }
