import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
import { KeranjangPage } from '../keranjang/keranjang';
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
    public alertCtrl: AlertController,
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

  ionViewWillEnter(){
    this.keranjangs = [];
    this.jumlahKeranjang = 0;
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

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
    })
  }

  keranjang(){
    this.navCtrl.push(KeranjangPage);
  }
  buatPesanan() {
    this.navCtrl.push(BuatPesanan2Page, { data: this.IDjenis });
  }

  gotoKategori(){
    this.navCtrl.push(KategoriAnalisisPage, { data: this.idKategori});
  }
}
