import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusListPage } from './bus-list';

@NgModule({
  declarations: [
    BusListPage,
  ],
  imports: [
    IonicPageModule.forChild(BusListPage),
  ],
})
export class BusListPageModule {}
