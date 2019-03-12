import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PembayaranPage } from '../pembayaran/pembayaran';
import { KirimSampelPage } from '../kirim-sampel/kirim-sampel';
import { BatalPesananPage } from '../batal-pesanan/batal-pesanan';
import { UlasanPage } from '../ulasan/ulasan';
// import { KirimSertifikatPage } from '../kirim-sertifikat/kirim-sertifikat';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  moreStatus: boolean = false;
  idPesanan: any;
  pesanan: any = [];
  data_user: any = [];
  status: any = [];
  list_sampel: any = [];
  sampel_awal: any = [];
  sampel_sisa: any = [];
  sampel_lain: boolean = false;
  statusAnalisis: any = [];
  awal: any = [];
  sisa: any = [];
  statusResponse: any = [];
  statusPelanggan: string;
  kodeUnik: number = 429;

  status_utama: string;
  ket_status_utama: string;
  waktu_status_utama: Date;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public httpClient: HttpClient,
    public data: Data,
    public modalCtrl: ModalController) {
    this.idPesanan = this.navParams.get('data');


    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      let input = JSON.stringify({
        "IDPesanan": this.idPesanan,
      });

      this.httpClient.post(this.data.BASE_URL + '/detailPesanan', input, httpOptions).subscribe(data => {
        let response = data;
        this.pesanan = response;
        console.log(response);
        if (this.pesanan.Status == 200) {
          this.status = this.pesanan.status_pesanan;

          this.data_user = this.pesanan.data_user;

          this.list_sampel = this.pesanan.listSampel;
          this.sampel_awal = this.list_sampel[0];
          this.sampel_sisa = this.list_sampel.filter(sampel =>
            sampel !== this.sampel_awal);

          if (this.status.StatusUtama == 1) {
            this.status_utama = "Menunggu Validasi";
            this.ket_status_utama = "Pesanan sedang divalidasi oleh sistem.";
            this.waktu_status_utama = this.status.WaktuPesananDibuat;
          }
          else if (this.status.StatusUtama == 2) {
            if (this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 1) {
              this.status_utama = "Pesanan Tervalidasi";
              this.ket_status_utama = "Segera lakukan pembayaran dan pengiriman sampel.";
              this.waktu_status_utama = this.status.WaktuValidasiPesanan;
            }
            else if (this.status.StatusKirimSampel == 2 && this.status.StatusPembayaran == 1) {
              this.status_utama = "Sampel Diterima";
              this.ket_status_utama = "Pengiriman sampel telah diterima.";
              this.waktu_status_utama = this.status.WaktuKirimSampel;
            }
            else if (this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 2) {
              this.status_utama = "Pembayaran Tervalidasi";
              this.ket_status_utama = "Pembayaran telah tervalidasi oleh sistem.";
              this.waktu_status_utama = this.status.WaktuPembayaran;
            }
            else {
              this.status_utama = "Menunggu Analisis";
              this.ket_status_utama = "Menunggu proses analisis pesanan.";
              this.waktu_status_utama = this.status.WaktuStatusUtama;
            }
          }
          else if (this.status.StatusUtama == 3) {
            this.status_utama = "Sedang Dikaji Ulang";
            this.ket_status_utama = "Pesanan Anda sedang dikaji ulang.";
            this.waktu_status_utama = this.status.WaktuDikajiUlang;
            this.statusAnalisis = [
              {
                status: 'Pesanan sedang dikaji ulang',
                waktu: this.waktu_status_utama,
              }
            ];
            this.awal = this.statusAnalisis[0];
            this.sisa = this.statusAnalisis.filter(cart =>
              cart !== this.awal);
          }
          else if (this.status.StatusUtama == 4) {
            this.status_utama = "Sedang Dianalisis";
            this.ket_status_utama = "Pesanan Anda sedang dianalisis.";
            this.waktu_status_utama = this.status.WaktuDianalisis;
            this.statusAnalisis = [
              {
                status: 'Pesanan sedang dianalisis',
                waktu: this.waktu_status_utama,
              },
              {
                status: 'Pesanan sedang dikaji ulang',
                waktu: this.status.WaktuDikajiUlang,
              },
            ];
            this.awal = this.statusAnalisis[0];
            this.sisa = this.statusAnalisis.filter(status =>
              status !== this.awal);
            console.log(this.sisa)

          }
          else if (this.status.StatusUtama == 5) {
            this.status_utama = "Pesanan selesai";
            this.ket_status_utama = "Silahkan unduh sertifikat hasil uji.";
            this.waktu_status_utama = this.status.WaktuSelesai;
            this.statusAnalisis = [
              {
                status: 'Pesanan selesai dianalisis',
                waktu: this.waktu_status_utama,
              },
              {
                status: 'Pesanan sedang dianalisis',
                waktu: this.status.WaktuDianalisis,
              },
              {
                status: 'Pesanan sedang dikaji ulang',
                waktu: this.status.WaktuDikajiUlang,
              },
            ];
            this.awal = this.statusAnalisis[0];
            this.sisa = this.statusAnalisis.filter(status =>
              status !== this.awal);
            console.log(this.sisa)
          }
          else if (this.status.StatusUtama <= 6) {
            this.status_utama = "Pesanan Dibatalkan";
            this.ket_status_utama = "Pesanan Anda telah dibatalkan.";
            this.waktu_status_utama = this.status.WaktuDibatalkan;
          }


        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Lihat Rincian pesanan gagal',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPesananPage');
  }

  showStatus() {
    this.moreStatus = !this.moreStatus;
  }

  showSampel() {
    this.sampel_lain = !this.sampel_lain;
  }

  goto(page) {
    if (page == 'pembayaran') {
      let modal = this.modalCtrl.create(PembayaranPage, {
        id: this.idPesanan,
        harga: this.pesanan.HargaTotal,
        waktu: this.status.WaktuPesananDibuat
      });
      modal.present();
    }
    else if (page == 'kirimSampel') {
      let modal = this.modalCtrl.create(KirimSampelPage, {
        id: this.idPesanan
      });
      modal.present();
    }
    else if (page == 'batal') {
      let modal = this.modalCtrl.create(BatalPesananPage, { id: this.idPesanan });
      modal.present();
    }
    else if (page == 'ulasan') {
      console.log(this.status.WaktuUlasan)
      let modal = this.modalCtrl.create(UlasanPage, { idPesanan: this.idPesanan, waktu: this.status.WaktuUlasan });
      modal.present();
    }
  }


  lihatSertif() {
    let alert = this.alertCtrl.create({
      title: 'Serifikat Hasil Uji',
      message: 'Untuk pengiriman berkas sertifikat dengan pembayaran Cash On Delivery (COD), pilih Kirim',
      buttons: [
        {
          text: 'Kirim',
          handler: () => {
            console.log('Kirim sertif');
            this.ubahStatus('mintaSertif');
          }
        },
        {
          text: 'Unduh',
          role: 'cancel',
          handler: () => {
            console.log('Unduh sertif');
            this.toastUnduh();
          }
        }
      ]
    });
    alert.present();
  }

  toastUnduh() {
    let toast = this.toastCtrl.create({
      message: 'Berhasil diunduh',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ubahStatus(status) {
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      if (status == 'terimaSisa') {
        this.statusPelanggan = 'SisaSampel';
      } else if (status == 'terimaSertif') {
        this.statusPelanggan = 'TerimaSertifikat';
      } else if (status == 'mintaSertif') {
        this.statusPelanggan = 'MintaSertifikat';
      }

      let input = JSON.stringify({
        IDPesanan: this.idPesanan,
        UbahStatus: this.statusPelanggan,
      });

      this.httpClient.post(this.data.BASE_URL + '/ubahStatusByPelanggan', input, httpOptions).subscribe(data => {
        let response = data;
        this.statusResponse = response;
        console.log(response);
        if (this.statusResponse.Status == 200) {
          let currentIndex = this.nav.getActive().index;
          this.nav.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
            this.nav.remove(currentIndex);
          });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
    });
  }

}
