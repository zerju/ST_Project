import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Nav, Platform} from 'ionic-angular';

import {FindAuctionPage} from '../pages/find-auction/find-auction';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MyAuctionsPage} from '../pages/my-auctions/my-auctions';
import {MybidsAuctionPage} from '../pages/mybids-auction/mybids-auction';
import {NewAuctionPage} from '../pages/new-auction/new-auction';
import {RegisterPage} from '../pages/register/register';



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
      {title: 'Home', component: HomePage},
      {title: 'New auction', component: NewAuctionPage},
      {title: 'Find auction', component: FindAuctionPage},
      {title: 'My Bids', component: MybidsAuctionPage},
      {title: 'My Auctions', component: MyAuctionsPage},
    ];
  }
  openPage(page) { this.nav.setRoot(page.component); }
}
