import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the ReviewPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-pesanan',
  templateUrl: 'review-pesanan.html',
})
export class ReviewPesananPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.checkout = CheckoutPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPesananPage');
  }
  checkout(){
    this.navCtrl.push(CheckoutPage);
  }
}
