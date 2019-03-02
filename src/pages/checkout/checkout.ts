import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  beranda: any;
  date : Date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beranda = HomePage;
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 3);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  gotoDetailPesanan() {
    this.navCtrl.push(DetailPesananPage);
  }
}
