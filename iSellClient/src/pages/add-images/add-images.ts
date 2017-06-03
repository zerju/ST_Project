import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker';
import {FileUploadOptions, Transfer, TransferObject} from '@ionic-native/transfer';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import * as myGlobals from '../../app/globals';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddImagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-images',
  templateUrl: 'add-images.html',
})
export class AddImagesPage {
  body: {};
  url = myGlobals.rootUrl + '/auction/create';
  urlUpload = myGlobals.rootUrl + '/auction/upload';
  constructor(
      public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private transfer: Transfer, private camera: Camera,
      private imagePicker: ImagePicker, private toastCtrl: ToastController) {
    this.body = this.navParams.get('body');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddImagesPage');
  }



  chooseGallery() {
    let options = {

    };
    const fileTransfer: TransferObject = this.transfer.create();



    this.imagePicker.getPictures(options).then((results) => {
      this.http.post(this.url, this.body)
          .subscribe(
              data => {
                let returnData=data.json();
                let options1: FileUploadOptions = {
                  fileKey: 'file',
                  fileName: 'image.jpg',
                  mimeType: 'image/jpeg',
                  chunkedMode: false,
                  headers: {'Content-Type': undefined},
                  params: {
                    fileName: 'image.jpg',
                    auction_id: returnData.auction_id
                  }

                };
                for (var i = 0; i < results.length; i++) {
                  let j = i;
                  fileTransfer
                      .upload(results[i], this.urlUpload, options1, true)
                      .then(
                          (data) => {
                            console.log(data);
                            var dataRes = JSON.parse(data.response);
                            options1.params.auction_id = dataRes.auction_id;
                            options1.params.exists = dataRes.exists;
                            // console.log(options1);
                            console.log(j);
                            console.log(results.length-1);
                            if (i === results.length - 1) {
                              this.presentToast('Auction Created');
                              this.navCtrl.push(HomePage);
                            }
                          },
                          (err) => {
                            this.presentToast('Oops, something went wrong');
                          });
                }
                this.presentToast('Auction Created');
                this.navCtrl.push(HomePage);
              },
              error => {
                console.log(error.json());
                this.presentToast('Oops, something went wrong');
              });

    }, (err) => {});
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    }

                                   console.log(options);
    this.camera.getPicture(options).then((imageData) => {
      const fileTransfer: TransferObject = this.transfer.create();
      this.http.post(this.url, this.body).subscribe(data => {
        let returnData = data.json();
        let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: 'image.jpg',
          mimeType: 'image/jpeg',
          chunkedMode: false,
          headers: {'Content-Type': undefined},
          params: {fileName: 'image.jpg', auction_id: returnData.auction_id}

        };

        fileTransfer.upload(imageData, this.urlUpload, options1, true)
            .then(
                (data) => {
                  this.presentToast('Auction Created');
                  this.navCtrl.push(HomePage);
                },
                (err) => {
                  this.presentToast('Err: ' + err);
                });


      });
    });
  }

  create() {
    this.http.post(this.url, this.body)
        .subscribe(
            data => {
              this.presentToast('Auction Created');
              this.navCtrl.push(HomePage);
            },
            error => {
              console.log(error.json());
              this.presentToast('Oops, something went wrong');
            });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 2500});
    toast.present();
  }
}
