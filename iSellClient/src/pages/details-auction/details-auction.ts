import {Component, AfterContentInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import * as myGlobals from '../../app/globals';
import {EditAuctionPage} from '../edit-auction/edit-auction';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

/**
 * Generated class for the DetailsAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-auction',
  templateUrl: 'details-auction.html',
})
export class DetailsAuctionPage implements AfterContentInit {
  urlGetData = myGlobals.rootUrl + '/auction/details?id=';
  urlPlaceBid = myGlobals.rootUrl + '/auction/placeBid';
  urlHighestBid = myGlobals.rootUrl + '/auction/highestBid?auction_id=';
  urlDelete = myGlobals.rootUrl + '/auction/delete?delete=';


  private diff: number;
  // private countDownResult: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  auction_id: number;
  date_from: string;
  date_to: string;
  auction_name: string;
  auction_item: string;
  auction_user_id: number;
  item_description: string;
  price: number;
  category: string;
  pictures: string;
  lat: number;
  long: number;

  bid: number;
  highestBid: number;
  yourHighest: boolean;
  userId: number = 2;

  bidForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {
    this.getAuction(this.navParams.get('id'));

    this.bidForm =
        new FormGroup({'bid': new FormControl(null, [Validators.required])});
  }


  ngAfterContentInit() {
    Observable.interval(1000)
        .map((x) => {
          this.diff = Math.floor(
              (new Date(this.date_to).getTime() - new Date().getTime()) / 1000);
        })
        .subscribe((x) => {
          this.days = this.getDays(this.diff);
          this.hours = this.getHours(this.diff);
          this.minutes = this.getMinutes(this.diff);
          this.seconds = this.getSeconds(this.diff);
        });

    console.log(this.auction_id);
  }

  getDays(t) {
    var days;
    days = Math.floor(t / 86400);

    return days;
  }

  getHours(t) {
    var days, hours;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;

    return hours;
  }

  getMinutes(t) {
    var days, hours, minutes;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;

    return minutes;
  }

  getSeconds(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return seconds;
  }

  getAuction(id: number) {
    console.log(this.urlGetData);
    return this.http.get(this.urlGetData + id.toString())
        .map((res: Response) => res.json())
        .subscribe(data => {
          this.auction_id = data.data.id;
          this.date_from = data.data.date_from;
          this.date_to = data.data.date_to;
          this.auction_name = data.data.auction_name;
          this.auction_item = data.data.auction_item;
          this.auction_user_id = data.data.auction_user_id;
          this.item_description = data.data.item_description;
          this.price = data.data.price;
          this.category = data.data.category;
          this.lat = data.data.lat;
          this.long = data.data.long;
          this.getHighestBid();


        });
  }


  placeBid(value: any) {
    if (value.valid) {
      let body = {value: this.bid, userId: 2, auctionId: this.auction_id};

      this.http.post(this.urlPlaceBid, body)
          .subscribe(data => {
            console.log(data);
            this.getHighestBid()
          }, error => { console.log(error.json()); });
    }
  }

  getHighestBid() {
    this.http.get(this.urlHighestBid + this.auction_id)
        .map((res: Response) => res.json())
        .subscribe(data => {
          if (data.data === undefined) {
            this.highestBid = this.price;
            this.bidForm.get('bid')
                .setValidators(CustomValidators.min(this.highestBid + 1));
          } else {
            this.highestBid = data.data.value;
            this.bidForm.get('bid')
                .setValidators(CustomValidators.min(this.highestBid + 1));
            data.data.user_id == this.userId ? this.yourHighest = true :
                                               this.yourHighest = false;
          }
        });
  }

  deleteAuction() {
    let auction_id = this.auction_id;

    this.http.delete(this.urlDelete + auction_id);
  }

  editAuction() { this.navCtrl.push(EditAuctionPage, {id: this.auction_id}); }



  ionViewDidLoad() { console.log('ionViewDidLoad DetailsAuctionPage'); }
}
