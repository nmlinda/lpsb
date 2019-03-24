import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
import { KeranjangPage } from '../keranjang/keranjang';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
/**
 * Generated class for the DetailAnalisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-analisis',
  templateUrl: 'detail-analisis.html',
})
export class DetailAnalisisPage {
  // cart on navbar
  responses: any = [];
  keranjangs: any = [];
  jumlahKeranjang: number = 0;

  // variables from response
  IDjenis: any;
  jenisAnalisis: any;
  namaJenis: string;
  harga: number;
  idKategori: number;
  kategori: string;
  metode: string;
  keterangan: string;
  cairan: boolean = false;
  ekstrak: boolean = false;
  serbuk: boolean = false;
  simplisia: boolean = false;

  response: any = [];
  notif: any = [];
  jumlahNotif: number;
  constructor(
    public data: Data,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public httpClient: HttpClient) {
    this.IDjenis = this.navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAnalisisPage');
  }

  ionViewWillEnter() {
    this.data.getData().then((data) => {
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      loading.present();

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      // katalog
      this.httpClient.get(this.data.BASE_URL + '/getKatalog/' + this.IDjenis,
        httpOptions).subscribe(data => {
          let response = data;
          this.jenisAnalisis = response;

          if (this.jenisAnalisis.Status == 200) {
            console.log(this.jenisAnalisis);

            loading.dismiss();

            this.IDjenis = this.jenisAnalisis.IDKatalog;
            this.namaJenis = this.jenisAnalisis.JenisAnalisis;
            this.kategori = this.jenisAnalisis.Kategori;
            this.idKategori = this.jenisAnalisis.IDKategori;

            this.harga = 0;
            this.data.getData().then((data) => {
              if (data.Perusahaan == "Institut Pertanian Bogor") {
                this.harga = this.jenisAnalisis.HargaIPB;
              }
              else {
                this.harga = this.jenisAnalisis.HargaNONIPB;
              }
            })
            console.log(this.kategori)
            this.metode = this.jenisAnalisis.Metode;
            this.keterangan = this.jenisAnalisis.Keterangan;
            if (this.jenisAnalisis.Cairan === 1) {
              this.cairan = true;
            }
            if (this.jenisAnalisis.Ekstrak === 1) {
              this.ekstrak = true;
            }
            if (this.jenisAnalisis.Serbuk === 1) {
              this.serbuk = true;
            }
            if (this.jenisAnalisis.Simplisia === 1) {
              this.simplisia = true;
            }
          } 
          else {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Silahkan coba lagi.',
              buttons: ['OK']
            });
            alert.present();
          }
        });

      // cart
      this.keranjangs = [];
      this.jumlahKeranjang = 0;
      this.httpClient.get(this.data.BASE_URL + '/getKeranjang', httpOptions).subscribe(data => {
        let response = data;
        this.responses = response;
        console.log(response);
        if (this.responses.Status == 200) {
          this.keranjangs = this.responses.keranjang;
          this.jumlahKeranjang = this.keranjangs.length;
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Gagal memuat',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      });

      //notif
      this.response = [];
      this.notif = [];
      this.jumlahNotif = null;
      this.httpClient.get(this.data.BASE_URL + '/getPemberitahuan', httpOptions).subscribe(data => {
        this.response = data;
        console.log(this.response);
        if (this.response) {
          this.notif = this.response.Pemberitahuans;
          this.jumlahNotif = null;
          for (var i = 0; i < this.notif.length; i++) {
            if (this.notif[i].Dilihat == 0) {
              this.jumlahNotif += 1;
            }
          }
          console.log(this.jumlahNotif)
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Gagal memuat',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    })
  }

  keranjang() {
    this.navCtrl.push(KeranjangPage);
  }
  buatPesanan() {
    this.navCtrl.push(BuatPesanan2Page, { data: this.IDjenis });
  }

  gotoKategori() {
    this.navCtrl.push(KategoriAnalisisPage, { data: this.idKategori });
  }

  notifikasi() {
    this.navCtrl.push(PemberitahuanPage);
  }
}
