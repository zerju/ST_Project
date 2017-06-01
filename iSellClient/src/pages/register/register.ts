import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import * as myGlobals from '../../app/globals';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;
  url = myGlobals.rootUrl + '/account/register';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http) {
    this.registerForm = new FormGroup({
      'username': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    });
  }

  register() {
    let body = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email
    };
    console.log(this.registerForm.value.username);


    this.http.post(this.url, body)
        .subscribe(data => { console.log(data); },
                   error => { console.log(error.json()); });
  }

  ionViewDidLoad() { console.log('ionViewDidLoad RegisterPage'); }
}
