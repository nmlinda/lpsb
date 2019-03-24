import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
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
  hargaPercepatan: boolean = false;
  harga: number = 0;
  harga2x: number = 0;
  kodeUnik: number = 429;
  totalHarga: number = 0;
  totalHarga2: number = 0;
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
  data_rek: any = [];
  pesanan: any = [];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
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
        this.IPB = true; if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaIPB;
          for (var k = 0; k < this.sampel.length; k++) {
            this.sampel[k].Harga = this.sampel[k].HargaIPB;
          }
        } else if (data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaNONIPB;
          for (var l = 0; l < this.sampel.length; l++) {
            this.sampel[l].Harga = this.sampel[l].HargaNONIPB;
          }
        }
        this.harga = this.hargaIPB;
        for (var i = 0; i < this.sampel.length; i++) {
          this.sampel[i].Harga = this.sampel[i].HargaIPB;
        }
      } else if (data.Perusahaan) {
        this.IPB = true;
        this.harga = this.hargaNONIPB;
        for (var j = 0; j < this.sampel.length; j++) {
          this.sampel[j].Harga = this.sampel[j].HargaNONIPB;
        }
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
      if (data) {
        this.nama = data.Nama;
        this.institusi = data.Perusahaan;
        this.alamat = data.Alamat;
        this.email = data.Email;
        this.noHp = data.NoHP;
        this.npwp = data.NoNPWP;
        if (data.Perusahaan == "Institut Pertanian Bogor" && data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaIPB;
          for (var k = 0; k < this.sampel.length; k++) {
            this.sampel[k].Harga = this.sampel[k].HargaIPB;
          }
        } else if (data.Perusahaan) {
          this.IPB = true;
          this.harga = this.hargaNONIPB;
          for (var l = 0; l < this.sampel.length; l++) {
            this.sampel[l].Harga = this.sampel[l].HargaNONIPB;
          }
        }
        if (data.Nama && data.Perusahaan && data.Alamat && data.Email && data.NoHP && data.NoNPWP) {
          this.dataDiri = true;
        } else {
          this.dataDiri = false;
        }
        if(this.lamaPengujian == 1){
          this.totalBiasa();
        }
        else if(this.lamaPengujian == 2){
          this.totalDipercepat();
        }
      }
    });
    modal.present();

  }

  detailSampel() {
    let modal = this.modalCtrl.create(ModalDetailSampelPage, { data: this.sampel });
    modal.present();
  }

  checkout() {
    if (this.nama && this.institusi && this.alamat && this.email && this.noHp && this.npwp) {
      if (this.sisaSampel >= 0) {
        this.sisaSampelSelected = true;
        this.dataDiri = true;
        let loading = this.loadCtrl.create({
          content: 'memuat..'
        });
        loading.present();

        this.data.getData().then((data) => {
          this.data_user = data;
          this.data.getRekening().then((data2) => {
            this.data_rek = data2;
            let input = JSON.stringify({
              lama_pengujian: this.lamaPengujian,
              sisa_sampel: this.sisaSampel,
              harga_total: this.totalHarga,
              KeteranganPesanan: this.keterangan,
              data_user: this.data_user,
              data_rek: {
                NamaBank: this.data_rek.NamaBank,
                NoRekening: this.data_rek.NoRekening,
                NamaRekening: this.data_rek.NamaRekening,
              },
              listKeranjang: this.sampel,
            });

            console.log(input)
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.api_token
              })
            };

            this.httpClient.post(this.data.BASE_URL + '/pesanItem', input, httpOptions).subscribe(data => {
              let response = data;
              this.pesanan = response;
              console.log(response);
              if (this.pesanan.Status == 200) {
                loading.dismiss();
                let currentIndex = this.navCtrl.getActive().index;
                this.navCtrl.push(CheckoutPage).then(() => {
                  this.navCtrl.remove(currentIndex);
                  this.navCtrl.remove(currentIndex - 1);
                });

              }
              else {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Checkout gagal',
                  subTitle: 'Silahkan coba lagi.',
                  buttons: ['OK']
                });
                alert.present();
              }
            });

          })




        })

      }else{
        this.sisaSampelSelected = false;
        this.toastSisa();
      }
    }
    else {
      this.dataDiri = false;
      if (this.sisaSampel) {
        this.sisaSampelSelected = true;
      } else {
        this.sisaSampelSelected = false;
        this.toastDiri();
      }
    }

  }

  pilihSisa() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih aksi untuk sisa sampel',
      buttons: [
        {
          text: 'Akan diambil setelah pengujian selesai',
          handler: () => {
            this.sisaSampel = 1;
            this.sisaSampelSelected = true;
          }
        }, {
          text: 'Akan ditinggalkan dan dalam 3 bulan ke depan akan dimusnahkan',
          handler: () => {
            this.sisaSampel = 0;
            this.sisaSampelSelected = true;
          }
        }, {
          text: 'Kembali',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Back clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  pilihLama() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Pilih Lama Pengujian',
      subTitle: 'Durasi dihitung sejak analisis dimulai',
      buttons: [
        {
          text: 'Biasa (14 Hari Kerja)',
          handler: () => {
            this.totalBiasa();
          }
        }, {
          text: 'Percepatan (7 Hari Kerja)',
          handler: () => {
            this.totalDipercepat();
            this.toastPercepatan();
          }
        }, {
          text: 'Kembali',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Back clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  toastSisa() {
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda telah melengkapi aksi untuk sisa sampel',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  toastDiri() {
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda telah melengkapi data diri anda',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  toastPercepatan() {
    let toast = this.toastCtrl.create({
      message: 'Harga sub total menjadi dua kali lipat',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  totalBiasa(){
    this.lamaPengujian = 1;
    this.totalHarga = this.harga + this.kodeUnik;
    this.hargaPercepatan = false;
  }

  totalDipercepat(){
    this.lamaPengujian = 2;
    this.harga2x = this.harga * 2;
    this.totalHarga = this.harga2x + this.kodeUnik;
    this.hargaPercepatan = true;
  }
}
