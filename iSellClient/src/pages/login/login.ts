import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormControl} from '@angular/forms';
import { Http, Response } from '@angular/http';
import * as myGlobals from '../../app/globals';
import { Storage } from '@ionic/Storage';
import { HomePage } from '../home/home';


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
              private http: Http, private storage: Storage) {
    this.loginForm = new FormGroup(
        {'username': new FormControl(), 'password': new FormControl()});
  }

  login() {
    let body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    //console.log(this.loginForm.value.username);
    this.http.post(this.url, body)
        .map((res: Response) => res.json())
        .subscribe((data) => {
          this.userID = data.userID;
          console.log(data.userID);
        });
    this.storage.set('userID', this.userID)

    this.navCtrl.setRoot(HomePage);

    //this.storage.get('userID').then((val) => {
      //console.log('userID', val);
    //});
  }

  ionViewDidLoad() { console.log('ionViewDidLoad LoginPage'); }
}
