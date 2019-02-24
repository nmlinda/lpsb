import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { HomePage } from '../home/home';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '+data.api_token
  })
};

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginform: FormGroup;
  userData = { "password": "", "email": "" };

  data_user: any;
  logins: any = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public http: Http,
    public httpClient: HttpClient,
    public data: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    let EMAILPATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.loginform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  login() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let input = JSON.stringify({
      "Email": this.userData.email,
      "Password": this.userData.password
    });
    console.log(input);
    this.httpClient.post(this.data.BASE_URL + '/login', input, httpOptions).subscribe(data => {
      let response = data;
      this.logins = response;
      console.log(response);
      if (this.logins.success == true) {
        this.data.login(this.logins, this.logins.api_token); // simpan response ke local storage
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Email atau Password salah',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }

  gotoDaftar() {
    this.navCtrl.push(RegisterPage);
  }

  gotoBeranda() {
    this.navCtrl.push(HomePage);
  }
}
