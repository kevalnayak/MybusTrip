import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBusPage } from './search-bus';

@NgModule({
  declarations: [
    SearchBusPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBusPage),
  ],
})
export class SearchBusPageModule {}
