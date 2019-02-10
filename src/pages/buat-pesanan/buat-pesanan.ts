import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReviewPesananPage } from '../review-pesanan/review-pesanan';

/**
 * Generated class for the BuatPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buat-pesanan',
  templateUrl: 'buat-pesanan.html',
})
export class BuatPesananPage {

  reviewPesanan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reviewPesanan = ReviewPesananPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesananPage');
  }

}
