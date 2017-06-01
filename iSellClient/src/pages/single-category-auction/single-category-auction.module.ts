import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleCategoryAuctionPage } from './single-category-auction';

@NgModule({
  declarations: [
    SingleCategoryAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleCategoryAuctionPage),
  ],
  exports: [
    SingleCategoryAuctionPage
  ]
})
export class SingleCategoryAuctionPageModule {}
