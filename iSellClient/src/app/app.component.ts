import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import { NewAuctionPage } from '../pages/new-auction/new-auction';
import { FindAuctionPage } from '../pages/find-auction/find-auction';
import { LoginPage } from '../pages/login/login';



@Component({templateUrl: 'app.html'})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {title: 'New auction', component: NewAuctionPage},
      {title: 'Find auction', component: FindAuctionPage}
    ];
  }
  openPage(page){
    this.nav.setRoot(page.component);
  }

}
