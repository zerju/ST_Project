import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormControl} from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import * as myGlobals from '../../app/globals';

/**
 * Generated class for the EditAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-auction',
  templateUrl: 'edit-auction.html',
})
export class EditAuctionPage {
  editAuctionForm: FormGroup;
  url = myGlobals.rootUrl + '/auction/edit';
  urlGetData = myGlobals.rootUrl + '/auction/details?id=';

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
    this.editAuctionForm = new FormGroup({
      'name': new FormControl(),
      'date_from': new FormControl(),
      'date_to': new FormControl(),
      'item_name': new FormControl(),
      'item_description': new FormControl(),
      'price': new FormControl(),
      'category': new FormControl()
    });
  }

  // ngOnInit() { console.log(this.auction); }

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
          console.log(this.date_from);
          this.editAuctionForm.updateValueAndValidity();
        });
  }

  edit() {
    let body = {
      id: this.auction_id,
      auction_name: this.editAuctionForm.value.name,
      date_from: this.editAuctionForm.value.date_from,
      date_to: this.editAuctionForm.value.date_to,
      auction_item: this.editAuctionForm.value.item_name,
      item_description: this.editAuctionForm.value.item_description,
      price: this.editAuctionForm.value.price,
      category: this.editAuctionForm.value.category,
      auction_user_id: this.auction_user_id,  // dummy
      lat: this.lat,                          // dummy
      long: this.long                         // dummy
    };


    this.http.post(this.url, body)
        .subscribe(data => { console.log(data); },
                   error => { console.log(error.json()); });
  }

  ionViewDidLoad() { console.log('ionViewDidLoad EditAuctionPage'); }
}
