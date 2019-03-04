import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { Data } from '../../provider/data';
import { ModalEditProfilPage } from '../modal-edit-profil/modal-edit-profil';
import { ModalDetailSampelPage } from '../modal-detail-sampel/modal-detail-sampel';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * Generated class for the ReviewPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-pesanan',
  templateUrl: 'review-pesanan.html',
})
export class ReviewPesananPage {
  sampel: any = [];
  hargaIPB: number = 0;
  hargaNONIPB: number = 0;
  IPB: boolean;
  lamaPengujian: any;
  harga: number = 0;
  harga2x: number = 0;
  kodeUnik: number = 429;
  totalHarga: number = 0;
  totalHarga2: number = 0;
  nama: string;
  institusi: string;
  alamat: string;
  email: string;
  noHp: string;
  npwp: string;
  sisaSampel: any;
  sisaSampelSelected: boolean = true;
  keterangan: string;
  dataDiri: boolean = true;
  data_user: any = [];
  data_rek: any = [];
  pesanan: any = [];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public data: Data) {

    this.sampel = this.navParams.get('data');
    for (var i = 0; i < this.sampel.length; i++) {
      this.hargaIPB += this.sampel[i].HargaIPB;
      this.hargaNONIPB += this.sampel[i].HargaNONIPB;
    }
    this.data.getData().then((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoNPWP;
      if (data.Nama && data.Perusahaan && data.Alamat && data.Email && data.NoHP && data.NoNPWP) {
        this.dataDiri = true;
      } else {
        this.dataDiri = false;
      }

      if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaIPB;
        for (var i = 0; i < this.sampel.length; i++) {
          this.sampel[i].Harga = this.sampel[i].HargaIPB;
        }
      } else if (data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaNONIPB;
        for (var j = 0; j < this.sampel.length; j++) {
          this.sampel[j].Harga = this.sampel[j].HargaNONIPB;
        }
      }
      this.totalHarga = this.harga + this.kodeUnik;

    })

    this.lamaPengujian = "1";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPesananPage');
  }

  editProfil() {
    let modal = this.modalCtrl.create(ModalEditProfilPage);
    modal.onDidDismiss((data) => {
      if (data) {
        this.nama = data.Nama;
        this.institusi = data.Perusahaan;
        this.alamat = data.Alamat;
        this.email = data.Email;
        this.noHp = data.NoHP;
        this.npwp = data.NoNPWP;
        if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaIPB;
          for (var k = 0; k < this.sampel.length; k++) {
            this.sampel[k].Harga = this.sampel[k].HargaIPB;
          }
        } else if (data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaNONIPB;
          for (var l = 0; l < this.sampel.length; l++) {
            this.sampel[l].Harga = this.sampel[l].HargaNONIPB;
          }
        }
        this.totalHarga = this.harga + this.kodeUnik;
      }
    });
    modal.present();

  }

  detailSampel() {
    let modal = this.modalCtrl.create(ModalDetailSampelPage, { data: this.sampel });
    modal.present();
  }

  checkout() {
    if (this.nama && this.institusi && this.alamat && this.email && this.noHp && this.npwp) {
      if (this.sisaSampel) {
        this.sisaSampelSelected = true;
        this.dataDiri = true;
        let loading = this.loadCtrl.create({
          content: 'memuat..'
        });

        this.data.getData().then((data) => {
          this.data_user = data;
          this.data.getRekening().then((data2) => {
            this.data_rek = data2;
            let input = JSON.stringify({
              "lama_pengujian": this.lamaPengujian,
              "sisa_sampel": this.sisaSampel,
              "harga_total": this.totalHarga,
              "Keterangan": this.keterangan,
              "data_user": this.data_user,
              "data_rek": this.data_rek,
              "listKeranjang": this.sampel,
            });

            console.log(input)
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.api_token
              })
            };

            this.httpClient.post(this.data.BASE_URL + '/pesanItem', input, httpOptions).subscribe(data => {
              let response = data;
              this.pesanan = response;
              console.log(response);
              if (this.pesanan.status == 500) {
                loading.dismiss();
                let modal = this.modalCtrl.create(CheckoutPage);
                modal.present();

              }
              else {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Checkout gagal',
                  subTitle: 'Silahkan coba lagi.',
                  buttons: ['OK']
                });
                alert.present();
              }
            });

          })




        })


      }
      else {
        this.sisaSampelSelected = false;
      }
    }
    else {
      this.dataDiri = false;
      if (this.sisaSampel) {
        this.sisaSampelSelected = true;
      } else {
        this.sisaSampelSelected = false;
      }
    }

  }

  lamaSelected() {
    if (this.lamaPengujian == 1) {
      this.totalHarga = this.harga + this.kodeUnik;
    }
    else {
      this.harga2x = this.harga * 2;
      this.totalHarga = this.harga2x + this.kodeUnik;
    }
  }
}
