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

      this.httpClient.post(this.data.BASE_URL + '/readPemberitahuan',input, httpOptions).subscribe(data => {
        this.response = data;
        if (this.response.Status == 200) {
          console.log(this.response)
          this.navCtrl.push(DetailPesananPage, { data: id_pesanan });
        }
      })
    })
  }

}
