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
  lamaPengujian: any;
  bentuk: string;
  kemasan: string;
  inputAsal: boolean = true;
  asal: string;
  tutup: boolean = false;
  jumlah: number = 1;
  kemasanLainnya : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController) {
    this.reviewPesanan = ReviewPesananPage;
    this.editProfil = EditProfilPage;
    this.lamaPengujian = 1;
    this.bentuk = 'pilih';
    this.kemasan = 'pilih';
    
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

  onInputAsal(){
    this.inputAsal = false;
    this.asal = "*untuk asal Non-IPB";
  }
  offInputAsal(){
    this.inputAsal = true;
    this.asal = "*untuk asal IPB";
  }

  sampelCtrl() {
    this.tutup = !this.tutup;
  }

  kemasanSelected(){
    if(this.kemasan == "lainnya") {
      this.kemasanLainnya = true;
    }
    else {
      this.kemasanLainnya = false;
    }
  }

  addJumlah(){
    this.jumlah +=1;
  }

  minJumlah(){
    if (this.jumlah > 1) {
      this.jumlah -=1;
    }
  }
}
