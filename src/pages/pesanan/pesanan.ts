import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',
  
})
export class PesananPage {
  status: any;
  detailPesanan: any;
  statusBayar: any;
  statusKirimSampel: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.status = "1";
    this.detailPesanan = DetailPesananPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }
  
}
