import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAuctionPage } from './category-auction';

@NgModule({
  declarations: [
    CategoryAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAuctionPage),
  ],
  exports: [
    CategoryAuctionPage
  ]
})
export class CategoryAuctionPageModule {}
