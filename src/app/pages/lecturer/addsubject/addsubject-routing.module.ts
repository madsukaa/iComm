import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubjectPage } from './addsubject.page';

const routes: Routes = [
  {
    path: '',
    component: AddsubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsubjectPageRoutingModule {}
