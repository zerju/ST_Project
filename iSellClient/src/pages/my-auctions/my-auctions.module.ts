import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAuctionsPage } from './my-auctions';

@NgModule({
  declarations: [
    MyAuctionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAuctionsPage),
  ],
  exports: [
    MyAuctionsPage
  ]
})
export class MyAuctionsPageModule {}
