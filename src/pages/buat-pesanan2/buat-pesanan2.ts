import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeranjangPage } from '../keranjang/keranjang';
import { HomePage } from '../home/home';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the BuatPesanan2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buat-pesanan2',
  templateUrl: 'buat-pesanan2.html',
})
export class BuatPesanan2Page {
  // info jenis analisis
  IDjenis: any;
  jenisAnalisis: any;
  namaJenis: string;
  hargaIPB: number;
  hargaNONIPB: number;
  metode: string;
  keterangan: string;
  Cairan: boolean = false;
  Ekstrak: boolean = false;
  Serbuk: boolean = false;
  Simplisia: boolean = false;

  //form
  kemasan: any;
  kemasanLain: boolean = false;
  bentuk: any;
  jumlah: number = 1;
  ekstrak: boolean = true;
  simplisia: boolean = true;
  serbuk: boolean = true;
  cairan: boolean = true;
  constructor(
    public data: Data,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient) {

    this.kemasan = 'pilih';
    this.bentuk = 'pilih';
    this.IDjenis = this.navParams.get('data');
    console.log(this.navParams.get('data'))
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
          this.metode = this.jenisAnalisis.Metode;
          this.keterangan = this.jenisAnalisis.Keterangan;
          if(this.jenisAnalisis.Cairan === 1){
            this.Cairan = true;
            this.cairan = false;
          }
          if(this.jenisAnalisis.Ekstrak === 1){
            this.Ekstrak = true;
            this.ekstrak = false;
          }
          if(this.jenisAnalisis.Serbuk === 1){
            this.Serbuk = true;
            this.serbuk = false;
          }
          if(this.jenisAnalisis.Simplisia === 1){
            this.Simplisia = true;
            this.simplisia = false;
          }
        });

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesanan2Page');
  }

  addJumlah() {
    this.jumlah += 1;
  }

  minJumlah() {
    if (this.jumlah > 1) {
      this.jumlah -= 1;
    }
  }

  tambahKeranjang(){
    this.navCtrl.push(HomePage);
  }

  gotoKeranjang(){
    this.navCtrl.push(KeranjangPage);
  }

}
