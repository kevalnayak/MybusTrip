import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusFilterPage } from './bus-filter';

@NgModule({
  declarations: [
    BusFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(BusFilterPage),
  ],
})
export class BusFilterPageModule {}
