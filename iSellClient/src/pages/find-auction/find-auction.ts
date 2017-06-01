import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryAuctionPage} from '../category-auction/category-auction';
import {SearchAuctionPage} from '../search-auction/search-auction';
import {LocationAuctionPage} from '../location-auction/location-auction';

/**
 * Generated class for the FindAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-find-auction',
  templateUrl: 'find-auction.html',
})
export class FindAuctionPage {
  categoryAuction: CategoryAuctionPage;
  searchAuction: SearchAuctionPage;
  locationAuction: LocationAuctionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() { console.log('ionViewDidLoad FindAuctionPage'); }

  goToSearch() { this.navCtrl.push(SearchAuctionPage); }

  goToCategory() { this.navCtrl.push(CategoryAuctionPage); }

  goToLocation() { this.navCtrl.push(LocationAuctionPage); }
}
