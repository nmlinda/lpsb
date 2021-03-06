import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
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
  status:string;
  lihat: boolean;

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

  ionViewWillEnter(){
    this.status = "password";
    this.lihat = true;
  }
  ionViewWillLeave(){
    this.lihat = true;
  }
  ngOnInit() {
    let EMAILPATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.loginform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }
  showPassword(){
    this.status = "text";
    this.lihat = false;
    console.log(this.status);
  }

  hidePassword(){
    this.status = "password";
    this.lihat = true;
    console.log(this.status);
  }
  login() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    let input = JSON.stringify({
      "Email": this.userData.email,
      "Password": this.userData.password
    });
    console.log(input);
    this.httpClient.post(this.data.BASE_URL + '/login', input, httpOptions).subscribe(data => {
      let response = data;
      this.logins = response;
      console.log(response);
      if (this.logins.Status == 200) {
        this.data.login(this.logins); // simpan response ke local storage
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }
      else if (this.logins.Status == 400) {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Email atau Password salah',
          subTitle: 'Silahkan coba lagi.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (this.logins.Status == 500) {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Masuk Gagal',
          subTitle: 'Silahkan coba lagi.',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }

  gotoDaftar() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(RegisterPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

}
