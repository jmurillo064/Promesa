import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnfermaPageRoutingModule } from './enferma-routing.module';

import { EnfermaPage } from './enferma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnfermaPageRoutingModule
  ],
  declarations: [EnfermaPage]
})
export class EnfermaPageModule {}
