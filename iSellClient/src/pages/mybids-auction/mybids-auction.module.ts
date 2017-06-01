import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybidsAuctionPage } from './mybids-auction';

@NgModule({
  declarations: [
    MybidsAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(MybidsAuctionPage),
  ],
  exports: [
    MybidsAuctionPage
  ]
})
export class MybidsAuctionPageModule {}
