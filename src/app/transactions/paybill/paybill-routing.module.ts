import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaybillPage } from './paybill.page';

const routes: Routes = [
  {
    path: '',
    component: PaybillPage
  },  {
    path: 'billers',
    loadChildren: () => import('./billers/billers.module').then( m => m.BillersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaybillPageRoutingModule {}
