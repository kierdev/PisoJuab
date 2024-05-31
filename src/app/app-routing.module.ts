import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TransferPage } from './transfer/transfer.page';
import { PaybillPage } from './billing/paybill/paybill.page';
import { AuthenticationService } from './Services/Authentication/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'transfer',
    loadChildren: () =>
      import('./transfer/transfer.module').then((m) => m.TransferPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        (m) => m.TransactionsPageModule
      ),
    canActivate: [AuthenticationService],
  },
  {
    path: 'exchanges',
    loadChildren: () =>
      import('./exchanges/exchanges.module').then((m) => m.ExchangesPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'deposit',
    loadChildren: () =>
      import('./deposit/deposit.module').then((m) => m.DepositPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'withdraw',
    loadChildren: () =>
      import('./withdraw/withdraw.module').then((m) => m.WithdrawPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then((m) => m.BillingPageModule),
    canActivate: [AuthenticationService],
  },
  {
    path: 'billing/:id',
    component: PaybillPage,
    canActivate: [AuthenticationService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
