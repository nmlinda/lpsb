import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewPesananPage } from '../review-pesanan/review-pesanan';
import { ModalPilihAnalisisPage } from '../modal-pilih-analisis/modal-pilih-analisis';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController) {
    this.reviewPesanan = ReviewPesananPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesananPage');
  }

  pilihAnalisis() {
    var data = { message : 'hello world' };
    let modal = this.modalCtrl.create(ModalPilihAnalisisPage);
    modal.present();
  }
  

}
