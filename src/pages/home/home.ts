import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  buatPesanan: any;

  constructor(public navCtrl: NavController) {
    this.buatPesanan = BuatPesananPage;
  }


}
