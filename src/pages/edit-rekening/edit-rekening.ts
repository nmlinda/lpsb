import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilPage } from '../profil/profil';

/**
 * Generated class for the EditRekeningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-rekening',
  templateUrl: 'edit-rekening.html',
})
export class EditRekeningPage {
  rekform: FormGroup;
  rekData = {
    "namaNasabah": "",
    "namaBank": "",
    "noRekening": "",
  };
  simpanRek: any = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpClient: HttpClient,
    public alertCtrl: AlertController,
    public data: Data) {
    this.data.getRekening().then((data) => {
      this.rekData.namaNasabah = data.NamaRekening;
      this.rekData.namaBank = data.NamaBank;
      this.rekData.noRekening = data.NoRekening;

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRekeningPage');
  }

  ngOnInit() {
    this.rekform = new FormGroup({
      namaBank: new FormControl('', [Validators.required]),
      namaNasabah: new FormControl('', [Validators.required]),
      noRekening: new FormControl('', [Validators.required]),
    });
  }

  simpan() {
    let input = JSON.stringify({
      "NamaRekening": this.rekData.namaNasabah,
      "NamaBank": this.rekData.namaBank,
      "NoRekening": this.rekData.noRekening
    });
    this.data.getData().then((data) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      this.httpClient.post(this.data.BASE_URL + '/simpanRekening', input, httpOptions).subscribe(data => {
        let response = data;
        this.simpanRek = response;
        console.log(response);
        if (this.simpanRek.Status === 200) {
          this.data.setRekening(this.simpanRek); // simpan response ke local storage
          this.viewCtrl.dismiss();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Gagal Menyimpan',
            subTitle: 'Silahkan coba lagi',
            buttons: ['OK']
          });
          alert.present();
        }

      });

    })

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
