import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
import { Data } from '../../provider/data';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { CariPage } from '../cari/cari';
import { KeranjangPage } from '../keranjang/keranjang';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // cart on navbar
  responses: any = [];
  keranjangs: any = [];
  jumlahKeranjang: number = 0;

  buatPesanan: any;
  kategoriAnalisis: any;
  listKategori: any = [];
  listKategori2: any = [];
  kategori: any = [];
  pemberitahuan: any;
  panjang: any;

  response: any = [];
  notif: any = [];
  jumlahNotif: number;

  constructor(public data: Data,
    public nav: NavController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient) {
    this.buatPesanan = KategoriAnalisisPage;
    this.kategoriAnalisis = KategoriAnalisisPage;
    this.pemberitahuan = PemberitahuanPage;

    this.data.getData().then((data) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      this.httpClient.get(this.data.BASE_URL + '/getInfoRekening', httpOptions).subscribe(data => {
        let response = data;
        this.data.setRekening(response);
      })
    })
  }

  gotoKategori(IDKategori) {
    this.nav.push(KategoriAnalisisPage, { data: IDKategori });
  }

  ionViewWillEnter() {
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      // category
      this.listKategori = [];
      this.listKategori2 = [];
      this.kategori = [];
      this.httpClient.get(this.data.BASE_URL + '/getAllKategori/', httpOptions).subscribe(data => {
        let response = data;
        this.listKategori = response;
        this.listKategori2 = this.listKategori.kategoris;
        console.log(this.listKategori2);

        for (var i = 0; i < this.listKategori2.length; i++) {
          this.kategori[i] = this.listKategori2[i];
        }
      });

      // cart
      this.responses = [];
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


  cari() {
    this.nav.push(CariPage);
  }

  notifikasi() {
    this.nav.push(PemberitahuanPage)
  }
}
