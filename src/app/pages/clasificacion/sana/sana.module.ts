import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SanaPageRoutingModule } from './sana-routing.module';

import { SanaPage } from './sana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SanaPageRoutingModule
  ],
  declarations: [SanaPage]
})
export class SanaPageModule {}
