import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAuctionPage } from './new-auction';

@NgModule({
  declarations: [
    NewAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAuctionPage),
  ],
  exports: [
    NewAuctionPage
  ]
})
export class NewAuctionPageModule {}
