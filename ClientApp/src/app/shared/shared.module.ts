import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListfilterComponent } from './listfilter.component';




@NgModule({
  declarations: [
   
  ListfilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [ 
    CommonModule, 
    HttpClientModule,
    FormsModule,
    ListfilterComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
