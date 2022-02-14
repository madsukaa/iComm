import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupphotoPage } from './signupphoto.page';

const routes: Routes = [
  {
    path: '',
    component: SignupphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupphotoPageRoutingModule {}
