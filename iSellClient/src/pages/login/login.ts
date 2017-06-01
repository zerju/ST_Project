import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import * as myGlobals from '../../app/globals';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {
    this.loginForm = new FormGroup(
        {'username': new FormControl(), 'password': new FormControl()});
  }

  login() {
    let body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    console.log(this.loginForm.value.username);

    this.http.post(this.url, body)
        .subscribe(data => { console.log(data); },
                   error => { console.log(error.json()); });
  }

  ionViewDidLoad() { console.log('ionViewDidLoad LoginPage'); }
}
