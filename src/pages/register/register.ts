import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '+data.api_token
  })
};

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupform: FormGroup;
  userData = { "name": "", "password": "", "email": "" };

  logins: any = [];
  // submitted = false;
  nama: string;
  email: string;
  password: string;
  daftarButton = true;
  regis :any = [];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public http: Http,
    public httpClient: HttpClient,
    public data: Data) {
  }

  ngOnInit() {
    let EMAILPATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let input = {
      Nama: this.userData.name,
      Email: this.userData.email,
      Password: this.userData.password
    };

    console.log(input);
    this.httpClient.post(this.data.BASE_URL + '/register', input, httpOptions).subscribe(data => {
      let response = data;
      this.regis = response;
      console.log(response);
      if (this.regis.success == true) {
        this.data.login(this.regis); // simpan response ke local storage
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Gagal Masuk',
          subTitle: 'Silahkan coba lagi.',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }
}
