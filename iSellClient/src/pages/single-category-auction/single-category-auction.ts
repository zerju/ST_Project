import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import * as myGlobals from '../../app/globals';
import 'rxjs/add/operator/map';
import {DetailsAuctionPage} from '../details-auction/details-auction';
/**
 * Generated class for the SingleCategoryAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-single-category-auction',
  templateUrl: 'single-category-auction.html',
})
export class SingleCategoryAuctionPage {
  category: string;
  getCategoryUrl: string = myGlobals.rootUrl + '/auction/byCategory?category=';
  auctions: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {
    this.category = navParams.get("category");
    this.getAuctions();
  }

  getAuctions() {
    console.log(this.category);
    this.http.get(this.getCategoryUrl + this.category)
        .map((res: Response) => res.json())
        .subscribe(data => { this.auctions = data.data; });
  }

  goToAuction(id: number) { this.navCtrl.push(DetailsAuctionPage, {id: id}); }

  ionViewDidLoad() { console.log('ionViewDidLoad SingleCategoryAuctionPage'); }
}
