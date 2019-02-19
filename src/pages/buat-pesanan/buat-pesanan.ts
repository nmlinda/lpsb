import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewPesananPage } from '../review-pesanan/review-pesanan';
import { ModalPilihAnalisisPage } from '../modal-pilih-analisis/modal-pilih-analisis';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '../../provider/data';

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
  //page navigator
  reviewPesanan: any;
  jenisAnalisis: any;
  editProfil: any;

  // dynamic
  inputAsal: boolean = true;
  bentukSelect: boolean = true;
  tutup: boolean = false;  
  kemasanLainnya: boolean = false;
  noSampel: number = 1;

  ekstrak: boolean = true;
  simplisia: boolean = true;
  serbuk: boolean = true;
  cairan: boolean = true;


  //form
  asal: string;
  bentuk: string;
  kemasan: string;
  jumlah: number = 1;
  idAnalisis: any;
  katalog: any = [];
  hargaSampel: number = 0;
  hargaTotal: number = 0;

  bentukSampel: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public data: Data,
    public httpClient: HttpClient
  ) {
      this.reviewPesanan = ReviewPesananPage;
      this.editProfil = EditProfilPage;
      this.bentuk = 'pilih';
      this.kemasan = 'pilih';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuatPesananPage');
  }

  pilihAnalisis() {
    let modal = this.modalCtrl.create(ModalPilihAnalisisPage, { data: this.idAnalisis });
    modal.onDidDismiss((data) => {
      console.log('data', data)
      this.idAnalisis = data.idAnalisis;
      this.jenisAnalisis = data.analisis;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer '+data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getBentukSampel/' + this.idAnalisis, httpOptions).subscribe(data => {
        let response = data;
        this.bentukSampel = response;
        // console.log('bentuk ', this.bentukSampel);
        this.bentukSelect = false;
        console.log(this.bentukSampel.Ekstrak, this.bentukSampel.Simplisia, this.bentukSampel.Cairan,
          this.bentukSampel.Serbuk)
        if (this.bentukSampel.Ekstrak === 1){
          this.ekstrak = false;
        } else {
          this.ekstrak = true;
        }
        if (this.bentukSampel.Simplisia === 1) {
          this.simplisia = false;
        } else{
          this.simplisia = true;
        }
        if (this.bentukSampel.Cairan){
          this.cairan = false;
        } else{
          this.cairan = true;
        }
        if (this.bentukSampel.Serbuk){
          this.serbuk = false;
        } else{
          this.serbuk = true;
        }

      });
      
    });
    modal.present();
  }

  onInputAsal() {
    this.inputAsal = false;
    this.asal = "*untuk asal Non-IPB";
  }
  offInputAsal() {
    this.inputAsal = true;
    this.asal = "*untuk asal IPB";
  }

  sampelCtrl() {
    this.tutup = !this.tutup;
  }

  kemasanSelected() {
    if (this.kemasan == "lainnya") {
      this.kemasanLainnya = true;
    }
    else {
      this.kemasanLainnya = false;
    }
  }

  addJumlah() {
    this.jumlah += 1;
  }

  minJumlah() {
    if (this.jumlah > 1) {
      this.jumlah -= 1;
    }
  }
}
