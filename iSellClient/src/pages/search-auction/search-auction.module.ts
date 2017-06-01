import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAuctionPage } from './search-auction';

@NgModule({
  declarations: [
    SearchAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchAuctionPage),
  ],
  exports: [
    SearchAuctionPage
  ]
})
export class SearchAuctionPageModule {}
