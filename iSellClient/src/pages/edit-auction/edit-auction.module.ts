import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAuctionPage } from './edit-auction';

@NgModule({
  declarations: [
    EditAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAuctionPage),
  ],
  exports: [
    EditAuctionPage
  ]
})
export class EditAuctionPageModule {}
