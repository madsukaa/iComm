import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewsubjectPageRoutingModule } from './viewsubject-routing.module';

import { ViewsubjectPage } from './viewsubject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsubjectPageRoutingModule
  ],
  declarations: [ViewsubjectPage]
})
export class ViewsubjectPageModule {}
