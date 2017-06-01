import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import * as myGlobals from '../../app/globals';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {DetailsAuctionPage} from '../details-auction/details-auction';

/**
 * Generated class for the LocationAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location-auction',
  templateUrl: 'location-auction.html',
})
export class LocationAuctionPage {
  urlGetLocation: string = myGlobals.rootUrl + '/auction/byLocation?';
  auctions: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private http: Http) {
    geolocation.getCurrentPosition().then(pos => {
      this.getByLocation(pos.coords.latitude, pos.coords.longitude);
      console.log('lat: ' + pos.coords.latitude + ', lon: ' +
                  pos.coords.longitude);
    });
  }

  getByLocation(lat: number, long: number) {
    this.http.get(this.urlGetLocation + 'lat=' + lat + '&long=' + long)
        .map((res: Response) => res.json())
        .subscribe(data => {
          this.auctions = data.data;
          console.log(data);
        });
  }

  goToAuction(id: number) { this.navCtrl.push(DetailsAuctionPage, {id: id}); }

  ionViewDidLoad() { console.log('ionViewDidLoad LocationAuctionPage'); }
}
