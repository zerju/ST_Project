import {ErrorHandler, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import {ImagePicker} from '@ionic-native/image-picker';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {FileUploadOptions, Transfer, TransferObject} from '@ionic-native/transfer';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {AddImagesPage} from '../pages/add-images/add-images';
import {CategoryAuctionPage} from '../pages/category-auction/category-auction';
import {DetailsAuctionPage} from '../pages/details-auction/details-auction';
import {EditAuctionPage} from '../pages/edit-auction/edit-auction';
import {FindAuctionPage} from '../pages/find-auction/find-auction';
import {HomePage} from '../pages/home/home';
import {LocationAuctionPage} from '../pages/location-auction/location-auction';
import {LoginPage} from '../pages/login/login';
import {MyAuctionsPage} from '../pages/my-auctions/my-auctions';

import {SingleCategoryAuctionPage} from '../pages/single-category-auction/single-category-auction';
import { IonicStorageModule } from '@ionic/Storage';

import {MybidsAuctionPage} from '../pages/mybids-auction/mybids-auction';
import {NewAuctionPage} from '../pages/new-auction/new-auction';
import {RegisterPage} from '../pages/register/register';
import {SearchAuctionPage} from '../pages/search-auction/search-auction';

import {MyApp} from './app.component';
import {CapitalizePipe} from './capitalize.pipe';


@NgModule({
  declarations: [
    MyApp, HomePage, LoginPage, RegisterPage, DetailsAuctionPage,
    FindAuctionPage, EditAuctionPage, NewAuctionPage, LocationAuctionPage,
    SearchAuctionPage, CategoryAuctionPage, SingleCategoryAuctionPage,
    MybidsAuctionPage, MyAuctionsPage, CapitalizePipe, AddImagesPage
  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    HttpModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, LoginPage, RegisterPage, DetailsAuctionPage,
    FindAuctionPage, EditAuctionPage, NewAuctionPage, LocationAuctionPage,
    SearchAuctionPage, CategoryAuctionPage, SingleCategoryAuctionPage,
    MybidsAuctionPage, MyAuctionsPage, AddImagesPage
  ],
  providers: [

    Transfer,
    Camera,
    StatusBar,
    SplashScreen,
    Geolocation,
    Storage,
    ImagePicker,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
