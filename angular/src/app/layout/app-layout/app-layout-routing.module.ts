import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/app/shared/services/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'thank-you',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/thank-you/thank-you.module').then((m) => m.ThankYouModule),
      },
      {
        path: 'transactions',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
