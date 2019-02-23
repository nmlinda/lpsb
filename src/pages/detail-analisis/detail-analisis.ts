import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';
/**
 * Generated class for the DetailAnalisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-analisis',
  templateUrl: 'detail-analisis.html',
})
export class DetailAnalisisPage {
  jenis: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jenis = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailAnalisisPage');
  }

  buatPesanan(){
    this.navCtrl.push(BuatPesanan2Page);
  }
}
