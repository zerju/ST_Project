import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {
  SingleCategoryAuctionPage
} from '../single-category-auction/single-category-auction';

/**
 * Generated class for the CategoryAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category-auction',
  templateUrl: 'category-auction.html',
})
export class CategoryAuctionPage {
  art: string = 'art';
  pet: string = 'pets';
  auto: string = 'auto-moto';
  tech: string = 'technology';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openCategory(value: string) {
    this.navCtrl.push(SingleCategoryAuctionPage, {category: value});
  }

  ionViewDidLoad() { console.log('ionViewDidLoad CategoryAuctionPage'); }
}
