import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
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
  IDjenis: any;
  jenisAnalisis: any;
  namaJenis: string;
  hargaIPB: number;
  hargaNONIPB: number;
  idKategori: number;
  kategori: string;
  metode: string;
  keterangan: string;
  cairan: boolean = false;
  ekstrak: boolean = false;
  serbuk: boolean = false;
  simplisia: boolean = false;

  constructor(
    public data: Data,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient) {
    this.IDjenis = this.navParams.get('data');
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getKatalog/' + this.IDjenis,
        httpOptions).subscribe(data => {
          let response = data;
          this.jenisAnalisis = response;
          console.log(this.jenisAnalisis);
          this.IDjenis = this.jenisAnalisis.IDKatalog;
          this.namaJenis = this.jenisAnalisis.JenisAnalisis;
          this.hargaIPB = this.jenisAnalisis.HargaIPB;
          this.hargaNONIPB = this.jenisAnalisis.HargaNONIPB;
          this.kategori = this.jenisAnalisis.Kategori;
          this.idKategori = this.jenisAnalisis.IDKategori;
          console.log(this.kategori)
          this.metode = this.jenisAnalisis.Metode;
          this.keterangan = this.jenisAnalisis.Keterangan;
          if(this.jenisAnalisis.Cairan === 1){
            this.cairan = true;
          }
          if(this.jenisAnalisis.Ekstrak === 1){
            this.ekstrak = true;
          }
          if(this.jenisAnalisis.Serbuk === 1){
            this.serbuk = true;
          }
          if(this.jenisAnalisis.Simplisia === 1){
            this.simplisia = true;
          }
        });

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAnalisisPage');
  }

  buatPesanan() {
    this.navCtrl.push(BuatPesanan2Page, { data: this.IDjenis });
  }

  gotoKategori(){
    this.navCtrl.push(KategoriAnalisisPage, { data: this.idKategori});
  }
}
