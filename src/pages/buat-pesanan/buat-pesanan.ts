import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewPesananPage } from '../review-pesanan/review-pesanan';
import { ModalPilihAnalisisPage } from '../modal-pilih-analisis/modal-pilih-analisis';
import { EditProfilPage } from '../edit-profil/edit-profil';

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
  jenisAnalisis: any;
  editProfil: any;
  lamaPengujian: string;
  bentuk: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController) {
    this.reviewPesanan = ReviewPesananPage;
    this.editProfil = EditProfilPage;
    this.lamaPengujian = 'pilih';
    this.bentuk = 'pilih';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesananPage');
  }

  pilihAnalisis() {
    let modal = this.modalCtrl.create(ModalPilihAnalisisPage, { data: this.jenisAnalisis });
    modal.onDidDismiss((data) => {
      console.log('data', data)
      this.jenisAnalisis = data;
    });
    modal.present();
  }

  

}
