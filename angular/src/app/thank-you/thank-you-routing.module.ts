import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThankYouComponent } from './thank-you/thank-you.component';


const routes: Routes = [
  {
    path: ':transactionId',
    component: ThankYouComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankYouRoutingModule { }
