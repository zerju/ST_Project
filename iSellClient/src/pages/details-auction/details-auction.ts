import 'rxjs/add/operator/map';

import {AfterContentInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Http, RequestMethod, RequestOptions, Response} from '@angular/http';
import {Storage} from '@ionic/Storage';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomValidators} from 'ng2-validation';
import {Observable} from 'rxjs/Rx';

import * as myGlobals from '../../app/globals';
import {EditAuctionPage} from '../edit-auction/edit-auction';
import {HomePage} from '../home/home';

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
  urlRoot = myGlobals.rootUrl;

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
  lat: number;
  long: number;

  bid: number;
  highestBid: number;
  yourHighest: boolean;
  userId: number;
  canBid: boolean = false;
  canEdit: boolean = false;

  pictures: {id: number, picture_url: string, auction_id: string, rootUrl: string};

  bidForm: FormGroup;

  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private storage: Storage) {

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
    this.storage.get('userID').then((val) => {
      this.userId = val;
      return this.http.get(this.urlGetData + id.toString())
          .map((res: Response) => res.json())
          .subscribe(data => {
            console.log(data.pictures.length);
            for (let i = 0; i < data.pictures.length; i++) {
              data.pictures[i].picture_url =
                  this.urlRoot + '/' + data.pictures[i].picture_url;
              console.log(data.pictures[i]);
            }
            this.pictures = data.pictures;
            this.auction_id = data.data.id;
            this.date_from = data.data.date_from;
            this.date_to = data.data.date_to;
            this.auction_name = data.data.auction_name;
            this.auction_item = data.data.auction_item;
            this.auction_user_id = data.data.user_id;
            this.item_description = data.data.item_description;
            this.price = data.data.price;
            this.category = data.data.category;
            this.lat = data.data.lat;
            this.long = data.data.long;
            /*for(let i = 0;i < data.pictures.length;i++){
              data.pictures[i].picture_url =
                  rootUrl + '/' + data.pictures[i].picture_url;
            }*/
            this.pictures = data.pictures;
            this.canBid = this.auction_user_id != this.userId;
            this.canEdit = this.auction_user_id == this.userId;
            console.log(this.auction_user_id);

            console.log(this.canEdit);
            this.getHighestBid();


          });
    });

  }


  placeBid(value: any) {
    if (value.valid) {
      let body = {value: this.bid, userId: this.userId, auctionId: this.auction_id};

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
    let options =
        new RequestOptions({method: RequestMethod.Delete});
    this.http.delete(this.urlDelete + auction_id, options).map((res:Response)=> res.json()).subscribe(data=> {
      console.log(data);
    });
    this.navCtrl.push(HomePage);
  }

  editAuction() { this.navCtrl.push(EditAuctionPage, {id: this.auction_id}); }



  ionViewDidLoad() { console.log('ionViewDidLoad DetailsAuctionPage'); }
}
