import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { HomePage } from '../home/home';
// import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
import { TabsPage } from '../tabs/tabs';

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
  date: Date;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
     public navParams: NavParams) {
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 3);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  gotoBeranda() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(TabsPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
}
