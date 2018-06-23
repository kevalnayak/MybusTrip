import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusSeatPage } from './bus-seat';

@NgModule({
  declarations: [
    BusSeatPage,
  ],
  imports: [
    IonicPageModule.forChild(BusSeatPage),
  ],
})
export class BusSeatPageModule {}
