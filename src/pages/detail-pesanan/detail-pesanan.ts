import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PembayaranPage } from '../pembayaran/pembayaran';
import { KirimSampelPage } from '../kirim-sampel/kirim-sampel';
import { BatalPesananPage } from '../batal-pesanan/batal-pesanan';
import { UlasanPage } from '../ulasan/ulasan';
import { KirimSertifikatPage } from '../kirim-sertifikat/kirim-sertifikat';
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
  statusAnalisis = [
    'Pesanan selesai dianalisis.',
    'Pesanan sedang dianalisis.',
    'Pesanan sedang dikaji ulang.'
  ];
  first = this.statusAnalisis[0];
  sisa = this.statusAnalisis.filter(cart =>
    cart !== this.first);
  moreStatus: boolean = false;

  idPesanan: any;
  pesanan: any = [];
  data_user: any = [];
  status: any = [];
  list_sampel: any = [];
  sampel_awal: any = [];
  sampel_sisa: any = [];
  sampel_lain: boolean = false;

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

          if(this.status.StatusUtama == 1){
            this.status_utama = "Menunggu Validasi";
            this.ket_status_utama = "Pesanan sedang divalidasi oleh sistem.";
            this.waktu_status_utama = this.status.WaktuPesananDibuat;
          }
          else if(this.status.StatusUtama == 2){
            if(this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 1){
              this.status_utama = "Pesanan Tervalidasi";
              this.ket_status_utama = "Pesanan telah tervalidasi oleh sistem.";
              this.waktu_status_utama = this.status.WaktuValidasiPesanan;
            }
            else if(this.status.StatusKirimSampel == 2 && this.status.StatusPembayaran == 1){
              this.status_utama = "Sampel Diterima";
              this.ket_status_utama = "Pengiriman sampel telah diterima.";
              this.waktu_status_utama = this.status.WaktuKirimSampel;
            }
            else if(this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 2){
              this.status_utama = "Pembayaran Tervalidasi";
              this.ket_status_utama = "Pembayaran telah tervalidasi oleh sistem.";
              this.waktu_status_utama = this.status.WaktuPembayaran;
            }
            else{
              this.status_utama = "Menunggu Analisis";
              this.ket_status_utama = "Menunggu proses analisis pesanan.";
              this.waktu_status_utama = this.status.WaktuStatusUtama;
            }       
          }        
        }
        else{
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

  showStatus(){
    this.moreStatus = !this.moreStatus;
  }

  showSampel(){
    this.sampel_lain = !this.sampel_lain;
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
    let modal = this.modalCtrl.create(BatalPesananPage, {data: this.idPesanan});
    modal.present();
  }

  gotoUlasan(){
    let modal = this.modalCtrl.create(UlasanPage , {data: this.idPesanan});
    modal.present();
  }

  gotoKirimSertifikat(){
    let modal = this.modalCtrl.create(KirimSertifikatPage);
    modal.present();
  }

  lihatSertif(){
    let alert = this.alertCtrl.create({
      title: 'Serifikat Hasil Uji',
      message: 'Jika Anda menginginkan pengiriman berkas sertifikat, pilih Kirim',
      buttons: [
        {
          text: 'Kirim (COD)',
          role: 'cancel',
          handler: () => {
            console.log('Kirim sertif');
          }
        },
        {
          text: 'Unduh',
          role: 'cancel',
          handler: () => {
            console.log('Unduh sertif');
            this.toastUnduhSertif();
          }
        }
      ]
    });
    alert.present();
  }
  toastUnduhSertif() {
    let toast = this.toastCtrl.create({
      message: 'Sertifikat berhasil diunduh',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
