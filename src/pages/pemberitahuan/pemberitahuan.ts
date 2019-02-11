import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

/**
 * Generated class for the PemberitahuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemberitahuan',
  templateUrl: 'pemberitahuan.html',
})
export class PemberitahuanPage {
  detailPesanan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detailPesanan = DetailPesananPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemberitahuanPage');
  }

}
