import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindAuctionPage } from './find-auction';

@NgModule({
  declarations: [
    FindAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(FindAuctionPage),
  ],
  exports: [
    FindAuctionPage
  ]
})
export class FindAuctionPageModule {}
