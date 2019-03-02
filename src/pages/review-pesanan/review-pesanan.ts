import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { Data } from '../../provider/data';
import { ModalEditProfilPage } from '../modal-edit-profil/modal-edit-profil';
import { ModalDetailSampelPage } from '../modal-detail-sampel/modal-detail-sampel';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * Generated class for the ReviewPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-pesanan',
  templateUrl: 'review-pesanan.html',
})
export class ReviewPesananPage {
  sampel: any = [];
  hargaIPB: number = 0;
  hargaNONIPB: number = 0;
  IPB: boolean;
  lamaPengujian: any;
  harga: number = 0;
  harga2x: number = 0;
  kodeUnik: number = 429;
  totalHarga: number;
  totalHarga2: number;
  nama: string;
  institusi: string;
  alamat: string;
  email: string;
  noHp: string;
  npwp: string;
  sisaSampel: any;
  sisaSampelSelected: boolean = true;
  keterangan: string;
  dataDiri: boolean = true;
  data_user: any = [];
  data_rek: any= [];
  pesanan: any = [];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public data: Data) {

    this.sampel = this.navParams.get('data');
    for (var i = 0; i < this.sampel.length; i++) {
      this.hargaIPB += this.sampel[i].HargaIPB;
      this.hargaNONIPB += this.sampel[i].HargaNONIPB;
    }
    this.data.getData().then((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoNPWP;
      if (data.Nama && data.Perusahaan && data.Alamat && data.Email && data.NoHP && data.NoNPWP) {
        this.dataDiri = true;
      } else {
        this.dataDiri = false;
      }

      if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaIPB;
      } else if (data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaNONIPB;
      }
      this.totalHarga = this.harga + this.kodeUnik;
    })

    this.lamaPengujian = "1";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPesananPage');
  }

  editProfil() {
    let modal = this.modalCtrl.create(ModalEditProfilPage);
    modal.onDidDismiss((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoIdentitas;
      if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaIPB;
      } else if (data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaNONIPB;
      }
      this.totalHarga = this.harga + this.kodeUnik;
    });
    modal.present();

  }

  detailSampel() {
    let modal = this.modalCtrl.create(ModalDetailSampelPage, { data: this.sampel });
    modal.present()
      ;
  }

  checkout() {
    if (this.nama && this.institusi && this.alamat && this.email && this.noHp && this.npwp) {
      if (this.sisaSampel) {
        this.sisaSampelSelected = true;
        this.dataDiri = true;
        let loading = this.loadCtrl.create({
          content: 'memuat..'
        });

        this.data.getData().then((data) => {
          this.data_user = data;
          this.data.getRekening().then((data2) => {
            this.data_rek = data2;
            let input = JSON.stringify({
              "lama_pengujian": this.lamaPengujian,
              "sisa_sampel": this.sisaSampel,
              "harga_total": this.totalHarga,
              "keterangan": this.keterangan,
              "data_user": this.data_user,
              "data_rek": this.data_rek,
              "listKeranjang": this.sampel,
            });
  
            console.log(input)
            
            this.navCtrl.push(CheckoutPage);
          })
          
         
          
          
        })
          
          
        }
      else {
            this.sisaSampelSelected = false;
          }
    }
      else {
        this.dataDiri = false;
        if (this.sisaSampel) {
          this.sisaSampelSelected = true;
        } else {
          this.sisaSampelSelected = false;
        }
      }

    }

    lamaSelected() {
      if (this.lamaPengujian == 1) {
        this.totalHarga = this.harga + this.kodeUnik;
      }
      else {
        this.harga2x = this.harga * 2;
        this.totalHarga = this.harga2x + this.kodeUnik;
      }
    }
  }
