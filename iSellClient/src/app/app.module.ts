import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {
  Transfer,
  FileUploadOptions,
  TransferObject
} from '@ionic-native/transfer';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {DetailsAuctionPage} from '../pages/details-auction/details-auction';
import {FindAuctionPage} from '../pages/find-auction/find-auction';
import {EditAuctionPage} from '../pages/edit-auction/edit-auction';
import {NewAuctionPage} from '../pages/new-auction/new-auction';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationAuctionPage} from '../pages/location-auction/location-auction';
import {SearchAuctionPage} from '../pages/search-auction/search-auction';
import {CategoryAuctionPage} from '../pages/category-auction/category-auction';
import {MybidsAuctionPage} from '../pages/mybids-auction/mybids-auction';
import {MyAuctionsPage} from '../pages/my-auctions/my-auctions';
import {
  SingleCategoryAuctionPage
} from '../pages/single-category-auction/single-category-auction';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DetailsAuctionPage,
    FindAuctionPage,
    EditAuctionPage,
    NewAuctionPage,
    LocationAuctionPage,
    SearchAuctionPage,
    CategoryAuctionPage,
    SingleCategoryAuctionPage,
    MybidsAuctionPage,
    MyAuctionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DetailsAuctionPage,
    FindAuctionPage,
    EditAuctionPage,
    NewAuctionPage,
    LocationAuctionPage,
    SearchAuctionPage,
    CategoryAuctionPage,
    SingleCategoryAuctionPage,
    MybidsAuctionPage,
    MyAuctionsPage
  ],
  providers: [
    Transfer,
    Camera,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
