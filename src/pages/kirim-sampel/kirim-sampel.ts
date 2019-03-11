import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the KirimSampelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kirim-sampel',
  templateUrl: 'kirim-sampel.html',
})
export class KirimSampelPage {
  idPesanan: any;
  kirimJasa: boolean = false;
  kirimSampel: any = [];
  noResi: string;
  kirim: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.idPesanan = this.navParams.get('id');
    console.log(this.idPesanan)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimSampelPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  jasaSelected(){
    this.kirimJasa = true;
  }

  simpan(){
    if(this.kirimSampel){
      if(this.kirimSampel == 1){
        this.noResi = '-KirimSendiri';
      }
      let input = JSON.stringify({
        IDPesanan: this.idPesanan,
        Resi: this.noResi,
      });
      this.data.getData().then((data) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.api_token
          })
        };
        this.httpClient.post(this.data.BASE_URL + '/kirimSampel', input, httpOptions).subscribe(data => {
          let response = data;
          this.kirimSampel = response;
          console.log(response);
          if (this.kirimSampel.Status === 200) {
            this.viewCtrl.dismiss();
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Gagal Menyimpan',
              subTitle: 'Silahkan coba lagi',
              buttons: ['OK']
            });
            alert.present();
          }
  
        });
      })
    }
    else if(!this.noResi){
      this.toastValidator();
    }
  }

  toastValidator(){
    let toast = this.toastCtrl.create({
      message: 'Pastikan Anda telah melengkapi informasi metode pengiriman',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
