import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailAnalisisPage } from '../detail-analisis/detail-analisis';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
import { CariPage } from '../cari/cari';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '../../provider/data';
import { KeranjangPage } from '../keranjang/keranjang';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';



@IonicPage()
@Component({
  selector: 'page-kategori-analisis',
  templateUrl: 'kategori-analisis.html',
})
export class KategoriAnalisisPage {
  // cart on navbar
  responses: any = [];
  keranjangs: any = [];
  jumlahKeranjang: number = 0;

  // variables from response
  idKategori: number;
  kategori: any;
  katalogs: any = [];
  katalog: any = [];
  listKatalog: any = [];
  panjang: any;
  buatPesanan: any;
  response: any = [];
  notif: any = [];
  jumlahNotif: number;
  harga: any;
  constructor(
    public data: Data,
    public nav: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public httpClient: HttpClient) {
    this.buatPesanan = BuatPesananPage;
    this.idKategori = this.navParams.get('data');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad KategoriAnalisisPage');
  }

  ionViewWillEnter() {
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      //listKatalog
      if (this.idKategori) {

        this.httpClient.get(this.data.BASE_URL + '/getKatalogByKategori/' + this.idKategori,
          httpOptions).subscribe(data => {
            let response = data;
            this.katalogs = response;
            this.listKatalog = this.katalogs.katalogs;
            this.kategori = this.katalogs.NamaKategori;
            console.log(response);
            if (response) {
              this.panjang = this.listKatalog.length;
              this.harga = 0;
              this.data.getData().then((data) => {
                for (var i = 0; i < this.panjang; i++) {
                  if (data.Perusahaan == "Institut Pertanian Bogor") {
                    this.listKatalog[i].Harga = this.listKatalog[i].HargaIPB;
                  }
                  else {
                    this.listKatalog[i].Harga = this.listKatalog[i].HargaNONIPB;
                  }
                }
              })
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
      }
      else {
        this.httpClient.get(this.data.BASE_URL + '/getAllKatalogUmum/', httpOptions).subscribe(data => {
          let response = data;
          this.katalogs = response;
          this.listKatalog = this.katalogs.katalogs;
          this.kategori = "Buat Pesanan";
          console.log(response);

          if (response) {
            this.panjang = this.listKatalog.length;
            this.harga = 0;
            this.data.getData().then((data) => {
              for (var i = 0; i < this.panjang; i++) {
                if (data.Perusahaan == "Institut Pertanian Bogor") {
                  this.listKatalog[i].Harga = this.listKatalog[i].HargaIPB;
                }
                else {
                  this.listKatalog[i].Harga = this.listKatalog[i].HargaNONIPB;
                }
              }
            })
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
      }

      //cart
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
    this.nav.push(KeranjangPage);
  }
  gotoDetailAnalisis(IDjenis) {
    this.nav.push(DetailAnalisisPage, { data: IDjenis });
  }

  cari() {
    this.nav.push(CariPage);
  }

  gotoBuatPesanan() {
    this.nav.push(BuatPesanan2Page);
  }

  notifikasi() {
    this.nav.push(PemberitahuanPage);
  }
}
