import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PembayaranPage } from '../pembayaran/pembayaran';
import { KirimSampelPage } from '../kirim-sampel/kirim-sampel';
import { BatalPesananPage } from '../batal-pesanan/batal-pesanan';
import { UlasanPage } from '../ulasan/ulasan';
import { KirimSertifikatPage } from '../kirim-sertifikat/kirim-sertifikat';

/**
 * Generated class for the DetailPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-pesanan',
  templateUrl: 'detail-pesanan.html',
})
export class DetailPesananPage {
  statusAnalisis = [
    'Pesanan selesai dianalisis.',
    'Pesanan sedang dianalisis.',
    'Pesanan sedang dikaji ulang.'
  ];
  first = this.statusAnalisis[0];
  sisa = this.statusAnalisis.filter(cart =>
    cart !== this.first);
  moreStatus: boolean = false;
  constructor(public nav: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPesananPage');
  }

  showStatus(){
    this.moreStatus = !this.moreStatus;
  }
 
  gotoPembayaran(){
    let modal = this.modalCtrl.create(PembayaranPage);
    modal.present();
  }

  gotoKirimSampel(){
    let modal = this.modalCtrl.create(KirimSampelPage);
    modal.present();
  }

  gotoBatal(){
    let modal = this.modalCtrl.create(BatalPesananPage);
    modal.present();
  }

  gotoUlasan(){
    let modal = this.modalCtrl.create(UlasanPage);
    modal.present();
  }

  gotoKirimSertifikat(){
    let modal = this.modalCtrl.create(KirimSertifikatPage);
    modal.present();
  }
}
