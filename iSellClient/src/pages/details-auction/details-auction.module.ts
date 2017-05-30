import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsAuctionPage } from './details-auction';

@NgModule({
  declarations: [
    DetailsAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsAuctionPage),
  ],
  exports: [
    DetailsAuctionPage
  ]
})
export class DetailsAuctionPageModule {}
