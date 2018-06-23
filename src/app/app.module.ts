import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PaymentSuccessPage } from '../pages/payment-success/payment-success';
import { SearchBusPage } from '../pages/search-bus/search-bus';
import { PassengerDetailsPage } from '../pages/passenger-details/passenger-details';
import { BusFilterPage } from '../pages/bus-filter/bus-filter';
import { BusListPage } from '../pages/bus-list/bus-list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FilterAmentitiesPage } from '../pages/filter-amentities/filter-amentities';

import {AutoCompleteModule} from 'ionic2-auto-complete'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeneralProvider } from '../providers/general/general';
import {HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { DbService } from "../providers/db-service/db-service";
import { SQLite } from "@ionic-native/sqlite";
import { BusSeatPage } from "../pages/bus-seat/bus-seat";
import { BoardingDropPage } from "../pages/boarding-drop/boarding-drop";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PaymentSuccessPage,
    SearchBusPage,
    PassengerDetailsPage,
    BusFilterPage,
    BusListPage,
    LoginPage,
    SignupPage,
    FilterAmentitiesPage,
    BusSeatPage,
    BoardingDropPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule, 
    HttpClientModule,
     IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PaymentSuccessPage,
    SearchBusPage,
    PassengerDetailsPage,
    BusFilterPage,
    BusListPage,
    LoginPage,
    SignupPage,
    FilterAmentitiesPage,
    BusSeatPage,
    BoardingDropPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeneralProvider,   
    DbService,
    SQLite
  ]
})
export class AppModule {}
