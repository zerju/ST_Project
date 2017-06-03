import 'rxjs/add/operator/map';

import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Storage} from '@ionic/Storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import * as myGlobals from '../../app/globals';
import {DetailsAuctionPage} from '../details-auction/details-auction';

/**
 * Generated class for the MyAuctionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-auctions',
  templateUrl: 'my-auctions.html',
})
export class MyAuctionsPage {
  urlMyAuctions: string = myGlobals.rootUrl + '/auction/myAuctions?user_id=';
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
      console.log(val);
      this.http.get(this.urlMyAuctions + this.userId)
          .map((res: Response) => res.json())
          .subscribe(data => {
            this.auctions = data.data;
            console.log(data);
          });
    });

  }

  goToAuction(id: number) { this.navCtrl.push(DetailsAuctionPage, {id: id}); }

  ionViewDidLoad() { console.log('ionViewDidLoad MyAuctionsPage'); }
}
