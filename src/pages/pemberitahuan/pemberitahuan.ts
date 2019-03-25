import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the PemberitahuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemberitahuan',
  templateUrl: 'pemberitahuan.html',
})
export class PemberitahuanPage {
  notif: any = [];
  response: any = [];
  date: Date;
  constructor(
    public navCtrl: NavController,
    public data: Data,
    public httpClient: HttpClient,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemberitahuanPage');
  }

  ionViewWillEnter() {
     let loading = this.loadCtrl.create({
          content: 'memuat..'
        });
    this.notif = [];
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getPemberitahuan', httpOptions).subscribe(data => {
        let response = data;
        this.notif = response;
        console.log(response);
        if (this.notif.Status == 200) {
          loading.dismiss();
          this.notif = this.notif.Pemberitahuans;
          for (var i = 0; i < this.notif.length; i++) {
            if(this.notif[i].IDStatus == 2){
              this.notif[i].judul = 'Pesanan Divalidasi';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' telah divalidasi. Segera kirim sampel dan lakukan pembayaran.';
            } 
            else if(this.notif[i].IDStatus == 21){
              this.notif[i].judul = 'Pembayaran tervalidasi';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' sudah dibayar.';
            }
            else if(this.notif[i].IDStatus == 22){
              this.notif[i].judul = 'Sampel diterima';
              this.notif[i].pesan = 'Sampel No. '+this.notif[i].NoPesanan+' sudah diterima.';
            }
            else if(this.notif[i].IDStatus == 3){
              this.notif[i].judul = 'Pesanan Dikaji Ulang';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' sedang dikaji ulang.';
            }
            else if(this.notif[i].IDStatus == 4){
              this.notif[i].judul = 'Pesanan Dianalisis';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' sedang dianalisis.';
            }
            else if(this.notif[i].IDStatus == 5){
              this.notif[i].judul = 'Pesanan Selesai';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' telah selesai. Silahkan unduh sertifikat hasil uji';
            }
            else if(this.notif[i].IDStatus == 6){
              this.notif[i].judul = 'Pesanan Dibatalkan';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' telah dibatalkan oleh Anda.';
            }
            else if(this.notif[i].IDStatus == 7){
              this.notif[i].judul = 'Pesanan Dibatalkan';
              this.notif[i].pesan = 'Pesanan No. '+this.notif[i].NoPesanan+' telah dibatalkan oleh Sistem.';
            }
            else if(this.notif[i].IDStatus == 52){
              this.notif[i].judul = 'Sertifikat Dikirim';
              this.notif[i].pesan = 'Sertifikat pesanan No. '+this.notif[i].NoPesanan+' telah dikirim.';
            }
            else if(this.notif[i].IDStatus == 51){
              this.notif[i].judul = 'Sisa Sampel Dikirim';
              this.notif[i].pesan = 'Sisa sampel pesanan No. '+this.notif[i].NoPesanan+' telah dikirim.';
            }
           
          }
          console.log(this.notif)

        } else {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Lihat pemberitahuan gagal',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
    })
  }

  detailPesanan(id_notif, id_pesanan) {
    this.data.getData().then((data) => {
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      loading.present();
      setTimeout(() => {
      loading.dismiss();
    }, 5000);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      let input = JSON.stringify({
        IDPemberitahuan: id_notif,
      });

      this.httpClient.post(this.data.BASE_URL + '/readPemberitahuan', input, httpOptions).subscribe(data => {
        this.response = data;
        if (this.response.Status == 200) {
          loading.dismiss();
          console.log(this.response)
          this.navCtrl.push(DetailPesananPage, { data: id_pesanan });
        }else {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      })
    })
  }

}
