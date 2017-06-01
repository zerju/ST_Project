import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DetailsAuctionPage} from './details-auction';
import {AppModule} from '../../app/app.module';


@NgModule({
  declarations: [
    DetailsAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsAuctionPage),
  ],
  exports: [DetailsAuctionPage]
})
export class DetailsAuctionPageModule {
}
