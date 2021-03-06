import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

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
  statusKirim: any;
  kirimJasa: boolean = false;
  kirimSampel: any = null;
  getResi: any = [];
  noResi: string;
  kirim: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public httpClient: HttpClient,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimSampelPage');
  }

  ionViewWillEnter() {
    this.idPesanan = this.navParams.get('id');
    this.statusKirim = this.navParams.get('statusKirim');
    console.log(this.idPesanan, this.statusKirim)
    if (this.statusKirim == 2) {
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
  
      let input = JSON.stringify({
        IDPesanan: this.idPesanan
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
          this.getResi = response;
          console.log(response)
          if(this.getResi.Status == 200){
            this.setResi(this.getResi.Resi);
            loading.dismiss();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Silahkan coba lagi',
              buttons: ['OK']
            });
            loading.dismiss();
            alert.present();
          }
        })
      });
    }
  }

  setResi(resi){
    if(resi == '-KirimSendiri'){
      this.kirimSampel = 1;
    }else if(resi){
      this.kirimSampel = 2;
      this.jasaSelected();
      this.noResi = resi;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  jasaSelected() {
    this.kirimJasa = true;
  }

  langsungSelected(){
    this.kirimJasa = false;
  }

  simpan() {
    if (this.kirimSampel) {
      if (this.kirimSampel == 1) {
        this.noResi = '-KirimSendiri';
        this.post(this.idPesanan, this.noResi);
      }
      else if (this.kirimSampel ==2){
        if(!this.noResi) {
          this.toastValidator();
        }else{
          this.post(this.idPesanan, this.noResi);
        }
      }
      
    }
    else{
      this.toastValidator();
    }
  }

  post(id, resi){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    let input = JSON.stringify({
      IDPesanan: id,
      Resi: resi,
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
        if (this.kirimSampel.Status == 200) {
          loading.dismiss();
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
            this.navCtrl.remove(currentIndex);
            this.navCtrl.remove(currentIndex-1);
          });
        }
        else {
          loading.dismiss();
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

  toastValidator() {
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
