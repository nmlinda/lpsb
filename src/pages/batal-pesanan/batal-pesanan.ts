import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../provider/data';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

/**
 * Generated class for the BatalPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-batal-pesanan',
  templateUrl: 'batal-pesanan.html',
})
export class BatalPesananPage {
  idPesanan: any;
  alasan: any;
  alasanLainnya: any;
  // alasanLain: boolean = false;
  response: any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public httpClient: HttpClient,
    public data: Data,
    public viewCtrl: ViewController) {
    console.log(this.navParams.get('id'))
    this.idPesanan = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BatalPesananPage');
  }

  ionViewWillEnter(){
    this.alasan = "lain";
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  // lainnya(){
  //   this.alasanLain = true;
  // }

  batal(){
    if(!this.alasan){
      this.toastValidator();
    }else{
      if(!this.alasanLainnya && this.alasan == "lain"){
        this.toastValidator();
      }else{
        this.alasan = this.alasanLainnya;
        this.batalPesanan(this.alasan);
      }
    }
  }

  toastValidator(){
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda telah melengkapi alasan membatalkan pesanan',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  batalPesanan(alasan){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      let input = JSON.stringify({
        IDPesanan: this.idPesanan,
        UbahStatus: 'Batal',
        Alasan: alasan,
      });

      this.httpClient.post(this.data.BASE_URL + '/ubahStatusByPelanggan', input, httpOptions).subscribe(data => {
        this.response = data;
        console.log(data);
        if (this.response.Status == 200) {
          loading.dismiss();
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
            this.navCtrl.remove(currentIndex);
            this.navCtrl.remove(currentIndex-1);
          });
        } else {
          loading.dismiss();
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
