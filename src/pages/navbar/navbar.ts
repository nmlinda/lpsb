import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { KeranjangPage } from '../keranjang/keranjang';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-navbar',
  templateUrl: 'navbar.html',
})
export class NavbarPage {
  responses: any = [];
  keranjangs: any = [];
  jumlahKeranjang: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public data: Data,
    public httpClient: HttpClient) {
      this.data.getData().then((data) => {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.api_token
          })
        };
  
        this.httpClient.get(this.data.BASE_URL + '/getKeranjang', httpOptions).subscribe(data => {
          let response = data;
          this.responses = response;
          console.log(response);
          if (this.responses.Status == 200) {
            this.keranjangs = this.responses.keranjang;
            this.jumlahKeranjang = this.keranjangs.length;
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Gagal memuat',
              subTitle: 'Silahkan coba lagi.',
              buttons: ['OK']
            });
            alert.present();
          }
        });
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavbarPage');
  }

  ionViewWillEnter(){
    this.keranjangs = [];
    this.jumlahKeranjang = 0;
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getKeranjang', httpOptions).subscribe(data => {
        let response = data;
        this.responses = response;
        console.log(response);
        if (this.responses.Status == 200) {
          this.keranjangs = this.responses.keranjang;
          this.jumlahKeranjang = this.keranjangs.length;
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Gagal memuat',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    })
  }

  // pemberitahuan() {
  //   this.navCtrl.push(PemberitahuanPage);
  // }
  keranjang(){
    this.navCtrl.push(KeranjangPage);
  }

}
