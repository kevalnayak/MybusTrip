import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
import { GeneralProvider } from "../providers/general/general";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchBusPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private general:GeneralProvider) {
    this.initializeApp();
    // this.general.getcompany()
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: SearchBusPage },
      { title: 'Cancel ticket', component: HomePage },
      // { title: 'Payment Success', component: PaymentSuccessPage },
      // { title: 'bus list', component: BusListPage },
      // { title: 'Passenger Details', component: PassengerDetailsPage },
      // { title: 'Bus Filter', component: BusFilterPage },
      { title: 'Change password', component: '' },
      { title: 'Login', component: LoginPage },
      { title: 'Signup', component: SignupPage },
      // { title: 'Filter Amentities', component: FilterAmentitiesPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
