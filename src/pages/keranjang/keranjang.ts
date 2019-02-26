import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReviewPesananPage } from '../review-pesanan/review-pesanan';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DetailAnalisisPage } from '../detail-analisis/detail-analisis';
import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';

/**
 * Generated class for the KeranjangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keranjang',
  templateUrl: 'keranjang.html',
})
export class KeranjangPage {
  // simpan array
  itemChecked: any = [];
  itemAllChecked: any = [];
  keranjangs: any = [];
  listKeranjang: any = [];
  hapus: any = [];

  // kondisi
  nextButton: boolean = true;
  allCart: boolean = false;
  
  hargaIPB: number = 0;
  hargaNONIPB: number = 0;
  hargaIPBall: number = 0;
  hargaNONIPBall: number = 0;
  panjang: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public alertCtrl: AlertController,
    public data: Data) {

    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getKeranjang', httpOptions).subscribe(data => {
        let response = data;
        this.keranjangs = response;
        console.log(response);
        if (this.keranjangs.Status == 200) {
          this.listKeranjang = this.keranjangs.keranjang;
          this.panjang = this.listKeranjang.length;
          if (this.panjang > 0) {
            for (var i = 0; i < this.panjang; i++) {
              // harga total semua item
              this.hargaIPB += this.listKeranjang[i].HargaIPB;
              this.hargaNONIPB += this.listKeranjang[i].HargaNONIPB;
              // pilih semua cart
              this.listKeranjang[i].checked = true;
              this.itemChecked.push(this.listKeranjang[i]);
            }

            this.allCart = true;
            this.itemAllChecked = this.itemChecked;
            this.nextButton = false;

            this.hargaIPBall = this.hargaIPB;
            this.hargaNONIPBall = this.hargaNONIPB;
          }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeranjangPage');
  }

  selectCart(data) {
    // push to cart
    if (data.checked == true) {
      this.itemChecked.push(data);
      console.log(this.itemChecked);
      // cek dobel item
    } else {
      let newArray = this.itemChecked.filter(function (el) {
        return el.IDItem !== data.IDItem;
      });
      this.itemChecked = newArray;
      console.log(this.itemChecked);
    }
    // kepilih semua
    if (this.itemChecked.length == this.panjang) {
      this.allCart = true;
      // ada yg gakepilih
    } else {
      this.allCart = false;
    }
    this.hargaIPB = 0;
    this.hargaNONIPB = 0;
    // gada yg kepilih
    if (this.itemChecked.length < 1) {
      this.nextButton = true;
    } else {
      // ada yg kepilih
      this.nextButton = false;
      for (var i = 0; i < this.itemChecked.length; i++) {
        this.hargaIPB += this.itemChecked[i].HargaIPB;
        this.hargaNONIPB += this.itemChecked[i].HargaNONIPB;
      }
    }



  }

  selectAllCart() {
    // all item
    if (this.itemChecked.length != this.panjang) {
      for (let i = 0; i < this.panjang; i++) {
        this.listKeranjang[i].checked = true;
      }
      this.itemChecked = this.itemAllChecked;
      this.nextButton = false;
      this.allCart = true;
      this.hargaIPB = this.hargaIPBall;
      this.hargaNONIPB = this.hargaNONIPBall;
    }
    // no item
    else {
      for (let i = 0; i < this.panjang; i++) {
        this.listKeranjang[i].checked = false;
      }
      this.itemChecked = [];
      this.allCart = false;
      this.nextButton = true;
      this.hargaIPB = 0;
      this.hargaNONIPB = 0;
    }

  }

  hapusItem(keranjang) {
    //hapus object dari array
    this.itemChecked = this.itemChecked.filter(cart =>
      cart.IDItem !== keranjang.IDItem);
    console.log(this.itemChecked)
    this.itemAllChecked = this.itemChecked;

    this.listKeranjang = this.listKeranjang.filter(cart =>
      cart.IDItem !== keranjang.IDItem);
    console.log(this.listKeranjang)
    
    //update harga
    this.hargaIPB = 0;
    this.hargaNONIPB = 0;
    for (var i = 0; i < this.itemChecked.length; i++) {
      this.hargaIPB += this.itemChecked[i].HargaIPB;
      this.hargaNONIPB += this.itemChecked[i].HargaNONIPB;
    }

    // cart kosong
    if(this.itemChecked.length < 1){
      this.nextButton = true;
      this.allCart = false;
    }

    //hapus dari db
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      let input = JSON.stringify({
        "IDItem": keranjang.IDItem
      });
        this.httpClient.post(this.data.BASE_URL + '/hapusItem', input, httpOptions).subscribe(data => {
          let response = data;
          this.hapus = response;
          if (this.hapus.Status == 200) {
            console.log(keranjang)
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Gagal Menghapus Pesanan',
              subTitle: 'Silahkan coba lagi.',
              buttons: ['OK']
            });
            alert.present();
          }
        })
    })
  }

  gotoReviewPesanan() {
    console.log(this.itemChecked);
    this.navCtrl.push(ReviewPesananPage, { data: this.itemChecked });
  }

  gotoAnalisisDetail(IDItem) {
    this.navCtrl.push(DetailAnalisisPage, { data: IDItem })
  }

  gotoAllKatalog() {
    this.navCtrl.push(KategoriAnalisisPage);
  }
}
