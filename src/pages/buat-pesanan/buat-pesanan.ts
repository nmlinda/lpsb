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
  analisisModal: boolean = true;

  ekstrak: boolean = true;
  simplisia: boolean = true;
  serbuk: boolean = true;
  cairan: boolean = true;

  asal: string;

  //form
  institusi: number;
  institusiLainnya: string;
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

      this.httpClient.get(this.data.BASE_URL + '/getBentukHargaSampel/' + this.idAnalisis, httpOptions).subscribe(data => {
        let response = data;
        this.bentukSampel = response;

        // bentuk
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

        // harga
        console.log(this.bentukSampel.HargaIPB, this.bentukSampel.HargaNONIPB)
        if(this.institusi === 1){
          this.hargaSampel = this.bentukSampel.HargaIPB;
        } else {
          console.log(this.institusi);
          this.hargaSampel = this.bentukSampel.HargaNONIPB;
        }
        this.hargaTotal = this.hargaSampel;
      });
      
    });
    modal.present();
  }

  institusiSelected(){
    this.analisisModal = false;
  }

  onInputAsal() {
    this.inputAsal = false;
    this.asal = "*untuk asal Non-IPB";
    if(this.bentukSampel.HargaIPB){
      this.hargaSampel = this.bentukSampel.HargaIPB;
      this.hargaTotal = this.hargaSampel;
    }
  }
  offInputAsal() {
    this.inputAsal = true;
    this.asal = "*untuk asal IPB";
    if(this.bentukSampel.HargaNONIPB){
      this.hargaSampel = this.bentukSampel.HargaNONIPB;
      this.hargaTotal = this.hargaSampel;
    }
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
