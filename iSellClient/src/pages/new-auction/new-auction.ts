import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import * as myGlobals from '../../app/globals';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {
  Transfer,
  FileUploadOptions,
  TransferObject
} from '@ionic-native/transfer';

/**
 * Generated class for the NewAuctionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-auction',
  templateUrl: 'new-auction.html',
})
export class NewAuctionPage {
  createAuctionForm: FormGroup;
  url = myGlobals.rootUrl + '/auction/create';
  urlUpload = myGlobals.rootUrl + '/auction/upload';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, private transfer: Transfer,
              private camera: Camera) {
    this.createAuctionForm = new FormGroup({
      'name': new FormControl(),
      'date_from': new FormControl(),
      'date_to': new FormControl(),
      'item_name': new FormControl(),
      'item_description': new FormControl(),
      'price': new FormControl(),
      'category': new FormControl()
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
      auction_user_id: 1,  // dummy
      lat: 10,             // dummy
      long: 10             // dummy
    };


    this.http.post(this.url, body)
        .subscribe(data => { console.log(data); },
                   error => { console.log(error.json()); });
  }

  upload() {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    }

    console.log(options);
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:


      const fileTransfer: TransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'name.jpg',
        headers: {}

      };
      alert("deluje");
      fileTransfer.upload(imageData, this.urlUpload, options1)
          .then(
              (data) => {
                // success
                alert("success");
              },
              (err) => {
                // error
                alert("error" + JSON.stringify(err));
              });


    });
  }

  ionViewDidLoad() { console.log('ionViewDidLoad NewAuctionPage'); }
}
