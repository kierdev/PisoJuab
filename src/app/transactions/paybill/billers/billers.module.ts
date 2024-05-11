import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillersPageRoutingModule } from './billers-routing.module';

import { BillersPage } from './billers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillersPageRoutingModule
  ],
  declarations: [BillersPage]
})
export class BillersPageModule {}
