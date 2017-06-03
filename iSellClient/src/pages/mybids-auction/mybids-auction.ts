import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Storage} from '@ionic/Storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import * as myGlobals from '../../app/globals';
import {DetailsAuctionPage} from '../details-auction/details-auction';

/**
 * Generated class for the MybidsAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mybids-auction',
  templateUrl: 'mybids-auction.html',
})
export class MybidsAuctionPage {
  urlMyBids: string = myGlobals.rootUrl + '/auction/myBids?user_id=';
  userId: number;
  auctions: {};

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private storage: Storage) {

    this.getAuctions();
  }

  getAuctions() {
    this.storage.get('userID').then((val) => {
      this.userId = val;
      this.http.get(this.urlMyBids + this.userId)
          .map((res: Response) => res.json())
          .subscribe(data => {
            this.auctions = data.data;
            console.log(data);
          });
    });

  }

  goToAuction(id: number) { this.navCtrl.push(DetailsAuctionPage, {id: id}); }

  ionViewDidLoad() { console.log('ionViewDidLoad MybidsAuctionPage'); }
}
