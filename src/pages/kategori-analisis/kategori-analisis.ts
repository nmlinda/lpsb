import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailAnalisisPage } from '../detail-analisis/detail-analisis';
import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
import { CariPage } from '../cari/cari';
import { BuatPesanan2Page } from '../buat-pesanan2/buat-pesanan2';

@IonicPage()
@Component({
  selector: 'page-kategori-analisis',
  templateUrl: 'kategori-analisis.html',
})
export class KategoriAnalisisPage {
  kategori: any;
  jenisAnalisis = [
    'Fitokimia',
    'Alkaloid',
    'Kuinon',
    'Flavonoid',
    'Saponin',
    'Tanin',
    'Steroid/Triterpenoid'
  ];
  buatPesanan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.kategori = this.navParams.get('data');
    this.buatPesanan = BuatPesananPage;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad KategoriAnalisisPage');
  }

  gotoDetailAnalisis(jenis){
    this.navCtrl.push(DetailAnalisisPage, { data: jenis });
  }

  cari(){
    this.navCtrl.push(CariPage);
  }

  gotoBuatPesanan(){
    this.navCtrl.push(BuatPesanan2Page);
  }
}
