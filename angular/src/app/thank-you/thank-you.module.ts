import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouRoutingModule } from './thank-you-routing.module';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ThankYouComponent],
  imports: [
    CommonModule,
    ThankYouRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ThankYouModule { }
