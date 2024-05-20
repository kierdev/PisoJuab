import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { HomePage } from '../home/home.page';
import { ProfilePage } from '../profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'profile',
        component: ProfilePage,
      },
      {
        path: '',
        redirectTo: '/dashboard/home', // Default path
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
