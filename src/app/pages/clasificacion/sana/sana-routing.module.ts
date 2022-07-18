import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanaPage } from './sana.page';

const routes: Routes = [
  {
    path: '',
    component: SanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SanaPageRoutingModule {}
