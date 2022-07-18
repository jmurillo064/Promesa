import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimientoPageRoutingModule } from './procedimiento-routing.module';

import { ProcedimientoPage } from './procedimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimientoPageRoutingModule
  ],
  declarations: [ProcedimientoPage]
})
export class ProcedimientoPageModule {}
