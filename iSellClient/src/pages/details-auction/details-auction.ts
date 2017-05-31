import {Component, AfterContentInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs/Subscription";

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
  urlGetData = 'http://127.0.0.1:3000/auction/details?id=';


  private diff: number;
  private countDownResult: number;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {
    this.getAuction(5);
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
        });
  }



  ionViewDidLoad() { console.log('ionViewDidLoad DetailsAuctionPage'); }
}
