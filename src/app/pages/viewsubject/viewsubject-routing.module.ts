import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsubjectPage } from './viewsubject.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsubjectPageRoutingModule {}
