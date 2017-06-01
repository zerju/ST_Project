import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationAuctionPage } from './location-auction';

@NgModule({
  declarations: [
    LocationAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationAuctionPage),
  ],
  exports: [
    LocationAuctionPage
  ]
})
export class LocationAuctionPageModule {}
