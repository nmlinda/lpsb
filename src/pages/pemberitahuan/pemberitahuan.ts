import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemberitahuanPage');
  }

  ionViewWillEnter() {
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
        if (this.notif.Pemberitahuans) {
          this.notif = this.notif.Pemberitahuans;
          for (var i = 0; i < this.notif.length; i++) {
            if(this.notif[i].IDStatus == 2){
              this.notif[i].judul = 'Pesanan Divalidasi';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' telah divalidasi. Segera kirim sampel dan lakukan pembayaran.';
            } 
            else if(this.notif[i].IDStatus == 3){
              this.notif[i].judul = 'Pesanan Dikaji Ulang';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' sedang dikaji ulang.';
            }
            else if(this.notif[i].IDStatus == 4){
              this.notif[i].judul = 'Pesanan Dianalisis';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' sedang dianalisis.';
            }
            else if(this.notif[i].IDStatus == 5){
              this.notif[i].judul = 'Pesanan Selesai';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' telah selesai. Silahkan unduh sertifikat hasil uji';
            }
            else if(this.notif[i].IDStatus == 6){
              this.notif[i].judul = 'Pesanan Dibatalkan';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' telah dibatalkan oleh Anda.';
            }
            else if(this.notif[i].IDStatus == 7){
              this.notif[i].judul = 'Pesanan Dibatalkan';
              this.notif[i].pesan = 'Pesanan '+this.notif[i].IDPesanan+' telah dibatalkan oleh Sistem.';
            }
            else if(this.notif[i].IDStatus == 52){
              this.notif[i].judul = 'Sertifikat Dikirim';
              this.notif[i].pesan = 'Sertifikat pesanan '+this.notif[i].IDPesanan+' telah dikirim.';
            }
            else if(this.notif[i].IDStatus == 51){
              this.notif[i].judul = 'Sisa Sampel Dikirim';
              this.notif[i].pesan = 'Sisa sampel pesanan '+this.notif[i].IDPesanan+' telah dikirim.';
            }
           
          }
          console.log(this.notif)

        } else {
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
          console.log(this.response)
          this.navCtrl.push(DetailPesananPage, { data: id_pesanan });
        }
      })
    })
  }

}
