import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  buatPesanan: any;
  kategoriAnalisis: any;
  constructor(public navCtrl: NavController) {
    this.buatPesanan = BuatPesananPage;
    this.kategoriAnalisis = KategoriAnalisisPage;
  }


}
