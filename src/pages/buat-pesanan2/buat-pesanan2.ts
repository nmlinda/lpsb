import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeranjangPage } from '../keranjang/keranjang';
import { HomePage } from '../home/home';

/**
 * Generated class for the BuatPesanan2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buat-pesanan2',
  templateUrl: 'buat-pesanan2.html',
})
export class BuatPesanan2Page {
  jumlah: number = 1;
  ekstrak: boolean = true;
  simplisia: boolean = true;
  serbuk: boolean = true;
  cairan: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesanan2Page');
  }

  addJumlah() {
    this.jumlah += 1;
  }

  minJumlah() {
    if (this.jumlah > 1) {
      this.jumlah -= 1;
    }
  }

  tambahKeranjang(){
    this.navCtrl.push(HomePage);
  }

  gotoKeranjang(){
    this.navCtrl.push(KeranjangPage);
  }

}
