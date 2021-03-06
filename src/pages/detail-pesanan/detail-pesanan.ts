import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { PembayaranPage } from '../pembayaran/pembayaran';
import { KirimSampelPage } from '../kirim-sampel/kirim-sampel';
import { BatalPesananPage } from '../batal-pesanan/batal-pesanan';
import { UlasanPage } from '../ulasan/ulasan';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from '@ionic-native/file';
declare var cordova: any;


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
  panjang: number;
  sampel_awal: any = [];
  sampel_sisa: any = [];
  sampel_lain: boolean = false;
  statusAnalisis: any = [];
  awal: any = [];
  sisa: any = [];
  statusResponse: any = [];
  statusPelanggan: string;
  kodeUnik: number = 429;

  url: string;
  docsname: string;

  status_utama: string;
  ket_status_utama: string;
  waktu_status_utama: Date;

  storageDirectory: string = '';

  constructor(public nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public loadCtrl: LoadingController,
    public httpClient: HttpClient,
    public data: Data,
    public file: File,
    public platform: Platform,
    public modalCtrl: ModalController) {

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
        // this.storageDirectory = cordova.file.externalRootDirectory + '/Download/';
      }
      else if (this.platform.is('android')) {
        // this.storageDirectory = cordova.file.dataDirectory;
        this.storageDirectory = cordova.file.externalDataDirectory + '/Download/';
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPesananPage');
  }

  ionViewWillEnter() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    this.idPesanan = null;
    this.pesanan = {
      Percepatan: null,
      HargaTotal: null,
      Keterangan: null,
      NoPesanan: null,
    }
    this.data_user = {
      NamaLengkap: "",
      Institusi: "",
      Alamat: "",
      NoHP: "",
      Email: "",
      NoNPWP: "",
    }

    this.sampel_awal = {
      JenisAnalisis: "",
      Metode: "",
      HargaSampel: 0,
      JenisSampel: "",
      Jumlah: 0,
      Kemasan: "",
      BentukSampel: "",
    }

    this.list_sampel = null;
    this.panjang = 0;
    this.sampel_lain = false;
    this.sampel_sisa = null;
    this.status_utama = null;
    this.ket_status_utama = null;
    this.waktu_status_utama = null;
    this.sisa = null;

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
          loading.dismiss();
          this.status = this.pesanan.status_pesanan;

          this.data_user = this.pesanan.data_user;

          this.list_sampel = this.pesanan.listSampel;
          this.sampel_awal = this.list_sampel[0];
          this.panjang = this.list_sampel.length;
          console.log('list sampel', this.panjang)
          if (this.panjang > 1) {
            this.sampel_sisa = this.list_sampel.filter(sampel =>
              sampel !== this.sampel_awal);
            this.sampel_lain = false;
          }

          if (this.status.StatusUtama == 1) {
            this.status_utama = "Menunggu Validasi";
            this.ket_status_utama = "Pesanan sedang divalidasi oleh sistem.";
            this.waktu_status_utama = this.status.WaktuPesananDibuat;
          }
          else if (this.status.StatusUtama == 2) {
            if (this.status.StatusKirimSampel < 3 && this.status.StatusPembayaran < 3) {
              if (this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 1) {
                this.status_utama = "Pesanan Tervalidasi";
                this.ket_status_utama = "Segera lakukan pembayaran dan pengiriman sampel.";
              }
              else if (this.status.StatusKirimSampel == 2 && this.status.StatusPembayaran == 1) {
                this.status_utama = "Menunggu Validasi Pengiriman Sampel";
                this.ket_status_utama = "Pengiriman sampel sedang divalidasi. Segera lakukan pembayaran.";
              }
              else if (this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 2) {
                this.status_utama = "Menunggu Validasi Pembayaran";
                this.ket_status_utama = "Pembayaran sedang divalidasi. Segera lakukan pengiriman sampel.";
              }
              else if (this.status.StatusKirimSampel == 2 && this.status.StatusPembayaran == 2) {
                this.status_utama = "Menunggu Validasi";
                this.ket_status_utama = "Pembayaran dan pengiriman sampel sedang divalidasi.";
              }
              this.waktu_status_utama = this.status.WaktuValidasiPesanan;
            }
            else if (this.status.StatusKirimSampel == 3 && this.status.StatusPembayaran == 1) {
              this.status_utama = "Sampel Diterima";
              this.ket_status_utama = "Pengiriman sampel telah diterima. Segera lakukan pembayaran";
              this.waktu_status_utama = this.status.WaktuKirimSampel;
            }
            else if (this.status.StatusKirimSampel == 3 && this.status.StatusPembayaran == 2) {
              this.status_utama = "Sampel Diterima";
              this.ket_status_utama = "Pengiriman sampel telah diterima. Pembayaran sedang divalidasi.";
              this.waktu_status_utama = this.status.WaktuKirimSampel;
            }
            else if (this.status.StatusKirimSampel == 1 && this.status.StatusPembayaran == 3) {
              this.status_utama = "Pembayaran Tervalidasi";
              this.ket_status_utama = "Pembayaran telah tervalidasi oleh sistem. Segera lakukan pengiriman sampel.";
              this.waktu_status_utama = this.status.WaktuPembayaran;
            }
            else if (this.status.StatusKirimSampel == 2 && this.status.StatusPembayaran == 3) {
              this.status_utama = "Pembayaran Tervalidasi";
              this.ket_status_utama = "Pembayaran telah tervalidasi oleh sistem. Pengiriman sampel sedang divalidasi.";
              this.waktu_status_utama = this.status.WaktuPembayaran;
            }
            else if (this.status.StatusKirimSampel == 3 && this.status.StatusPembayaran == 3) {
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
            if (this.statusAnalisis.length > 1) {
              this.sisa = this.statusAnalisis.filter(cart =>
                cart !== this.awal);
            }
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
            if (this.status.WaktuUlasan) {
              this.ket_status_utama = "Silahkan unduh sertifikat hasil uji.";
            } else {
              this.ket_status_utama = "Silahkan unduh sertifikat hasil uji dan beri penilaian.";
            }
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
          else if (this.status.StatusUtama >= 6) {
            this.status_utama = "Pesanan Dibatalkan";
            if (this.status.AlasanBatal) {
              this.ket_status_utama = "Pesanan telah dibatalkan oleh sistem karena " + this.status.AlasanBatal;
            }
            else {
              this.ket_status_utama = "Pesanan telah dibatalkan oleh Anda.";
            }

            this.waktu_status_utama = this.status.WaktuDibatalkan;
          }


        }
        else {
          loading.dismiss();
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

  showStatus() {
    this.moreStatus = !this.moreStatus;
  }

  showSampel() {
    this.sampel_lain = !this.sampel_lain;
  }

  goto(page) {
    if (page == 'pembayaran') {
      this.nav.push(PembayaranPage, {
        id: this.idPesanan,
        harga: this.pesanan.HargaTotal,
        waktu: this.status.WaktuPesananDibuat
      });
    }
    else if (page == 'kirimSampel') {
      this.nav.push(KirimSampelPage, {
        id: this.idPesanan,
        statusKirim: this.status.StatusKirimSampel
      });
    }
    else if (page == 'batal') {
      this.nav.push(BatalPesananPage, { id: this.idPesanan });
    }
    else if (page == 'ulasan') {
      console.log(this.status.WaktuUlasan)
      this.nav.push(UlasanPage, { idPesanan: this.idPesanan, waktu: this.status.WaktuUlasan });
    }
    else if (page == 'beriUlasan') {
      console.log(this.status.WaktuUlasan)
      this.nav.push(UlasanPage, { idPesanan: this.idPesanan });
    }
  }

  unduh(fail) {
    if (fail == 'fpa') {
      this.url = '/getPermohonanAnalisis/';
      this.docsname = 'Formulir Permohonan Analisis';
    }
    else if (fail == 'tts') {
      this.url = '/getTandaTerimaSampel/';
      this.docsname = 'Tanda Terima Sampel'
    }
    else if (fail == 'hsu') {
      this.url = '/getSertifikat/';
      this.docsname = "Sertifikat Hasil Uji";
    }
    let confirm = this.alertCtrl.create({
      title: 'Unduh ' + this.docsname + '?',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Unduh',
          handler: () => {
            console.log('Agree clicked');

            let loading = this.loadCtrl.create({
              content: 'unduh..'
            });
            loading.present();
            setTimeout(() => {
              loading.dismiss();
            }, 5000);

            this.data.getData().then((data) => {

              const httpOptions = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + data.api_token
                }
              };
              const fileTransfer: FileTransferObject = this.transfer.create();

              let filename = this.docsname + '_' + new Date().getTime() + '.docx';

              fileTransfer.download(this.data.BASE_URL + this.url + this.idPesanan, this.storageDirectory + filename, true, httpOptions).then((entry) => {
                console.log('download berhasil: ' + entry.toURL());
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Unduh ' + this.docsname + ' Berhasil!',
                  message: 'Lokasi Penyimpanan: ' + this.storageDirectory + filename,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('Agree clicked');
                      }
                    }
                  ]
                });
                alert.present();

              }, (error) => {
                console.log(error);
                // handle error

                loading.dismiss();
                let alertError = this.alertCtrl.create({
                  title: 'Unduh Gagal',
                  message: 'silahkan coba kembali',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('Agree clicked');
                      }
                    }
                  ]
                });
                alertError.present();
              });
            })
          }
        }
      ]
    });
    confirm.present();
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
            this.unduh('hsu');
          }
        }
      ]
    });
    alert.present();
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
