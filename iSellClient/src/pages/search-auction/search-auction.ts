import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import * as myGlobals from '../../app/globals';
import 'rxjs/add/operator/map';
import {DetailsAuctionPage} from '../details-auction/details-auction';

/**
 * Generated class for the SearchAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-auction',
  templateUrl: 'search-auction.html',
})
export class SearchAuctionPage {
  queryText: string;
  urlSearch: string = myGlobals.rootUrl + '/auction/search?search=';
  auctions: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {}

  searchByKeyword(event) {
    this.http.get(this.urlSearch + this.queryText)
        .map((res: Response) => res.json())
        .subscribe(data => { this.auctions = data.data; });
  }

  goToAuction(id: number) { this.navCtrl.push(DetailsAuctionPage, {id: id}); }

  ionViewDidLoad() { console.log('ionViewDidLoad SearchAuctionPage'); }
}
