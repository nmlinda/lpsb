import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Toast, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

/**
 * Generated class for the PembayaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pembayaran',
  templateUrl: 'pembayaran.html',
})
export class PembayaranPage {
  idPesanan: any;
  harga: number;
  waktu: Date;
  rekform: FormGroup;
  rekData = {
    "namaNasabah": "",
    "namaBank": "",
    "noRekening": "",
  };
  simpanRek: any = [];
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.idPesanan = this.navParams.get('id');
    this.harga = this.navParams.get('harga');
    // this.waktu.setDate(this.navParams.get('waktu'))+3;
    this.waktu = new Date(this.navParams.get('waktu'));
    this.waktu.setDate(this.waktu.getDate() + 3);
    this.data.getRekening().then((data) => {
      this.rekData.namaNasabah = data.NamaRekening;
      this.rekData.namaBank = data.NamaBank;
      this.rekData.noRekening = data.NoRekening;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembayaranPage');
  }

  ngOnInit() {
    this.rekform = new FormGroup({
      namaBank: new FormControl('', [Validators.required]),
      namaNasabah: new FormControl('', [Validators.required]),
      noRekening: new FormControl('', [Validators.required]),
    });
  }

  simpan() {
    if(this.rekform.invalid){
      this.toastValidator();
    }else{
    let input = JSON.stringify({
      data_rek: {
        NamaRekening: this.rekData.namaNasabah,
        NamaBank: this.rekData.namaBank,
        NoRekening: this.rekData.noRekening
      },
      IDPesanan: this.idPesanan,
      BuktiBayar: "tes",
    });
    this.data.getData().then((data) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      this.httpClient.post(this.data.BASE_URL + '/bayar', input, httpOptions).subscribe(data => {
        let response = data;
        this.simpanRek = response;
        console.log(response);
        if (this.simpanRek.Status === 200) {
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
            this.navCtrl.remove(currentIndex);
            this.navCtrl.remove(currentIndex-1);
          });
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
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  toastValidator() {
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda melengkapi semua informasi yang dibutuhkan',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
