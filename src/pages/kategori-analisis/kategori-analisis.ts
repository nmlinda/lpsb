import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailAnalisisPage } from '../detail-analisis/detail-analisis';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
import { CariPage } from '../cari/cari';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '../../provider/data';



@IonicPage()
@Component({
  selector: 'page-kategori-analisis',
  templateUrl: 'kategori-analisis.html',
})
export class KategoriAnalisisPage {
  idKategori: number;
  kategori: any;
  katalogs: any = [];
  katalog: any = [];
  listKatalog: any = [];
  panjang: any;
  buatPesanan: any;
  constructor(
    public data: Data,
    public nav: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient) {
    this.buatPesanan = BuatPesananPage;
    this.idKategori = this.navParams.get('data');

    if (this.idKategori) {
      this.data.getData().then((data) => {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.api_token
          })
        };

        this.httpClient.get(this.data.BASE_URL + '/getKatalogByKategori/' + this.idKategori,
          httpOptions).subscribe(data => {
            let response = data;
            this.katalogs = response;
            this.listKatalog = this.katalogs.katalogs;
            this.kategori = this.idKategori;
            console.log(response);

            this.panjang = this.listKatalog.length;
            for (var i = 0; i < this.panjang; i++) {
              this.katalog[i] = this.listKatalog[i];
            }
          });

      })
    }
    else {
      this.data.getData().then((data) => {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.api_token
          })
        };

        this.httpClient.get(this.data.BASE_URL + '/getAllKatalog/', httpOptions).subscribe(data => {
          let response = data;
          this.katalogs = response;
          this.listKatalog = this.katalogs.katalogs;
          this.kategori = "Buat Pesanan";
          console.log(response);

          this.panjang = this.listKatalog.length;
          for (var i = 0; i < this.panjang; i++) {
            this.katalog[i] = this.listKatalog[i];
          }
        });
      })
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad KategoriAnalisisPage');
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
}
