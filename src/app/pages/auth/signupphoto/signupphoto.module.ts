import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupphotoPageRoutingModule } from './signupphoto-routing.module';

import { SignupphotoPage } from './signupphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupphotoPageRoutingModule
  ],
  declarations: [SignupphotoPage]
})
export class SignupphotoPageModule {}
