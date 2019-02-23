import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { KeranjangPage } from '../keranjang/keranjang';
// import { CariPage } from '../cari/cari';


@IonicPage()
@Component({
  selector: 'page-navbar',
  templateUrl: 'navbar.html',
})
export class NavbarPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavbarPage');
  }

  // cari() {
  //   this.navCtrl.push(CariPage);
  // }

  pemberitahuan() {
    this.navCtrl.push(PemberitahuanPage);
  }
  keranjang(){
    this.navCtrl.push(KeranjangPage);
  }

}
