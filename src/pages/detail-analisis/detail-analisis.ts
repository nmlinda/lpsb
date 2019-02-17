import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
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
  jenis: any;
  buatPesanan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jenis = this.navParams.get('data');
    this.buatPesanan = BuatPesananPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAnalisisPage');
  }

}
