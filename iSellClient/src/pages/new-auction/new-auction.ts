import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Http} from '@angular/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import {FileUploadOptions, Transfer, TransferObject} from '@ionic-native/transfer';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as myGlobals from '../../app/globals';
import {AddImagesPage} from '../add-images/add-images';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/Storage';

/**
 * Generated class for the NewAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-new-auction', templateUrl: 'new-auction.html'})
export class NewAuctionPage {
  createAuctionForm: FormGroup;
  url = myGlobals.rootUrl + '/auction/create';
  urlUpload = myGlobals.rootUrl + '/auction/upload';
  categories: string[] = ['auto-moto', 'technology', 'pets', 'art'];
  lat: number;
  long: number;
  userId: number;
  // today = new Date();
  // dd = this.today.getDate();
  // mm = this.today.getMonth() + 1;  // January is 0!
  // yyyy = this.today.getFullYear();
  // minDate = this.dd + '/' + this.mm + '/' + this.yyyy;


  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private transfer: Transfer, private camera: Camera,
      private geolocation: Geolocation, private toastCtrl: ToastController,
      private storage: Storage) {
    this.storage.get('userID').then((val) => {
      this.userId = val;
    });
    geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
    });
    this.createAuctionForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'date_from': new FormControl('', [Validators.required]),
      'date_to': new FormControl('', [Validators.required]),
      'item_name': new FormControl('', [Validators.required]),
      'item_description': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required])
    });
  }

  create() {
    let body = {
      auction_name: this.createAuctionForm.value.name,
      date_from: this.createAuctionForm.value.date_from,
      date_to: this.createAuctionForm.value.date_to,
      auction_item: this.createAuctionForm.value.item_name,
      item_description: this.createAuctionForm.value.item_description,
      price: this.createAuctionForm.value.price,
      category: this.createAuctionForm.value.category,
      auction_user_id: this.userId,
      lat: this.lat,
      long: this.long
    };

    this.navCtrl.push(AddImagesPage, {body: body});
    /*this.http.post(this.url, body)
        .subscribe(
            data => {
              this.presentToast('Auction Created');
              this.navCtrl.push(HomePage);
            },
            error => {
              console.log(error.json());
              this.presentToast('Oops, something went wrong');
            });*/
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 2500});
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAuctionPage');
  }
}
