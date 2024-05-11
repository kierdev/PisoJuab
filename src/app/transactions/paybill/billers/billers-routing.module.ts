import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillersPage } from './billers.page';

const routes: Routes = [
  {
    path: '',
    component: BillersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillersPageRoutingModule {}
