import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubjectPageRoutingModule } from './addsubject-routing.module';

import { AddsubjectPage } from './addsubject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsubjectPageRoutingModule
  ],
  declarations: [AddsubjectPage]
})
export class AddsubjectPageModule {}
