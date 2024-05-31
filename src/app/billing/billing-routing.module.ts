import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingPage } from './billing.page';

const routes: Routes = [
  {
    path: '',
    component: BillingPage
  },  {
    path: 'paybill',
    loadChildren: () => import('./paybill/paybill.module').then( m => m.PaybillPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingPageRoutingModule {}
