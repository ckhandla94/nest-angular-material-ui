import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpMessageComponent } from './http-message.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HttpMessageComponent,
  ],
  exports: [
    HttpMessageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class HttpMessageModule { }
