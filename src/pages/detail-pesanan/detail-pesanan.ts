import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PelacakanPage } from '../pelacakan/pelacakan';
import { PembayaranPage } from '../pembayaran/pembayaran';
import { KirimSampelPage } from '../kirim-sampel/kirim-sampel';

/**
 * Generated class for the DetailPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pesanan',
  templateUrl: 'detail-pesanan.html',
})
export class DetailPesananPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPesananPage');
  }

  gotoPelacakan(){
    this.nav.push(PelacakanPage);
  }

  gotoPembayaran(){
    this.nav.push(PembayaranPage);
  }

  gotoKirimSampel(){
    this.nav.push(KirimSampelPage);
  }
}
