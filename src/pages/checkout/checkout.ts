import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beranda = HomePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
