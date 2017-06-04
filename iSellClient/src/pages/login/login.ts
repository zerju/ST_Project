import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Http, Response} from '@angular/http';
import {Storage} from '@ionic/Storage';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  MenuController
} from 'ionic-angular';

import * as myGlobals from '../../app/globals';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  url = myGlobals.rootUrl + '/account/login';
  userID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, private storage: Storage,
              private toastCtrl: ToastController,
              private menu: MenuController) {
    this.menu.swipeEnable(false, 'menu1');
    this.loginForm = new FormGroup(
        {'username': new FormControl(), 'password': new FormControl()});
  }

  login() {
    let body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    // console.log(this.loginForm.value.username);
    this.http.post(this.url, body)
        .map((res: Response) => res.json())
        .subscribe((data) => {
          console.log(data);
          if (data.status == "401") {
            this.presentToast('Wrong login information!');
          } else {
            this.userID = data.userID;
            console.log(data.userID);
            this.storage.set('userID', this.userID);
            this.menu.swipeEnable(true, 'menu1');
            this.navCtrl.setRoot(HomePage);
          }
        });



    // this.storage.get('userID').then((val) => {
    // console.log('userID', val);
    //});
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({message: message, duration: 2500});
    toast.present();
  }
  goToRegister() { this.navCtrl.push(RegisterPage); }
  ionViewDidLoad() { console.log('ionViewDidLoad LoginPage'); }
}
