import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerDetailsPage } from './passenger-details';

@NgModule({
  declarations: [
    PassengerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerDetailsPage),
  ],
})
export class PassengerDetailsPageModule {}
