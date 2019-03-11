import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  ulasan: string;
  waktuUlasan: Date;
  idPesanan: any;
  response: any = [];
  constructor(public navCtrl: NavController,
    public httpClient: HttpClient,
    public data: Data,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.idPesanan = this.navParams.get('idPesanan');
    this.waktuUlasan = this.navParams.get('waktu');

    if (this.waktuUlasan) {
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
          if(this.response.Status == 200){
            this.ulasan = this.response.Ulasan;
            this.waktuUlasan = this.response.WaktuUlasan;
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

  kirim(){
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      let input = JSON.stringify({
        IDPesanan: this.idPesanan,
        Ulasan: this.ulasan,
      });


      this.httpClient.post(this.data.BASE_URL + '/beriUlasan', input, httpOptions).subscribe(data => {
        let response = data;
        console.log(response)
        if(response){
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(DetailPesananPage, {data: this.idPesanan}).then(() => {
            this.navCtrl.remove(currentIndex);
            this.navCtrl.remove(currentIndex-1);
        });
        }

      })

    })
  }
}
