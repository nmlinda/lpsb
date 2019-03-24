import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
/**
 * Generated class for the UlasanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ulasan',
  templateUrl: 'ulasan.html',
})
export class UlasanPage {
  ulas: boolean = false;
  survey1: number;
  survey2: number;
  survey3: number;
  survey4: number;
  survey5: number;
  survey6: number;
  survey7: number;
  survey8: number;
  survey9: number;
  ulasan: string;
  waktuUlasan: Date;
  idPesanan: any;
  response: any = [];

  constructor(public navCtrl: NavController,
    public httpClient: HttpClient,
    public data: Data,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.idPesanan = this.navParams.get('idPesanan');
    //this.waktuUlasan = this.navParams.get('waktu');
    if (this.idPesanan) {
      this.ulas = true;
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


        this.httpClient.post(this.data.BASE_URL + '/getUlasan', input, httpOptions).subscribe(data => {
          this.response = data;
          console.log(this.response)
          if (this.response.Status == 200) {
            this.ulasan = this.response.Ulasan;
            this.waktuUlasan = this.response.WaktuUlasan;
            this.survey1 = this.response.survey1;
            this.survey2 = this.response.survey2;
            this.survey3 = this.response.survey3;
            this.survey4 = this.response.survey4;
            this.survey5 = this.response.survey5;
            this.survey6 = this.response.survey6;
            this.survey7 = this.response.survey7;
            this.survey8 = this.response.survey8;
            this.survey9 = this.response.survey9;

          }

        })

      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UlasanPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  kirim() {
    if (this.ulasan && this.survey1 && this.survey2 && this.survey3 && this.survey4 &&
      this.survey5 && this.survey6 && this.survey7 && this.survey8 && this.survey9) {
      this.data.getData().then((data) => {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.api_token
          })
        };
        let input = JSON.stringify({
          IDPesanan: this.idPesanan,
          survey1: this.survey1,
          survey2: this.survey2,
          survey3: this.survey3,
          survey4: this.survey4,
          survey5: this.survey5,
          survey6: this.survey6,
          survey7: this.survey7,
          survey8: this.survey8,
          survey9: this.survey9,
          Ulasan: this.ulasan,
        });
        console.log(input)
        this.toastBerhasilKirim();



        this.httpClient.post(this.data.BASE_URL + '/beriUlasan', input, httpOptions).subscribe(data => {
          let response = data;
          console.log(response)
          if (response) {
            this.toastBerhasilKirim();
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
              this.navCtrl.remove(currentIndex);
              this.navCtrl.remove(currentIndex - 1);
            });
          }

        })

      })
    } else {
      this.toastValidator();
    }
  }

  toastValidator() {
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda telah melengkapi penilaian Anda.',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  toastBerhasilKirim() {
    let toast = this.toastCtrl.create({
      message: 'Terima kasih atas penilaian Anda!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
