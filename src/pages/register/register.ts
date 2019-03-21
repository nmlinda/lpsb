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
  userData = {
    "name": "",
    "institusi": 0,
    "institusiLain": "",
    "noIdentitas": "",
    "password": "",
    "email": ""
  };

  logins: any = [];
  // submitted = false;
  nama: string;
  email: string;
  password: string;
  daftarButton = true;

  institusi: string;
  institusiLain: boolean = false;
  IPB: boolean = false;
  regis: any = [];
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
      institusi: new FormControl('', [Validators.required]),
      institusiLain: new FormControl('', [Validators.required]),
      noIdentitas: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  institusiChange() {
    if (this.userData.institusi == 1) {
      this.IPB = true;
      this.institusiLain = false;
      this.signupform.controls['institusiLain'].disable();
      this.signupform.controls['noIdentitas'].enable();
    } else if (this.userData.institusi == 2) {
      this.institusiLain = true;
      this.IPB = false;
      this.signupform.controls['institusiLain'].enable();
      this.signupform.controls['noIdentitas'].disable();
    }
  }

  gotoLogin() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(LoginPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  signup() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    if (this.userData.institusi == 1) {
      this.institusi = "Institut Pertanian Bogor";
    } else if (this.userData.institusi == 2) {
      this.institusi = this.userData.institusiLain;
    }
    let input = {
      Nama: this.userData.name,
      Email: this.userData.email,
      Password: this.userData.password,
      Perusahaan: this.institusi,
      NoIdentitas: this.userData.noIdentitas,
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
