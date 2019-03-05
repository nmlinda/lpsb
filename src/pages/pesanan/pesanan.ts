import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',

})
export class PesananPage {
  sisa = "";
  status: any;
  detailPesanan: any;
  statusBayar: any;
  statusKirimSampel: any;
  pesanan: any = [];
  pesanans: any = [];
  statusUtama: number;
  belumDianalisis: any = [];
  dianalisis: any = [];
  selesai: any = [];
  batal: any = [];
  bd1st: any = [];
  bdSisa: any = [];
  constructor(
    public navCtrl: NavController,
    public data: Data,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public navParams: NavParams) {
    this.status = "1";
    this.detailPesanan = DetailPesananPage;

    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getPesanan', httpOptions).subscribe(data => {
        let response = data;
        this.pesanan = response;
        console.log(response);
        if (this.pesanan.Status == 200) {
          this.pesanans = this.pesanan.AllPesanan;
          console.log('pesanan', this.pesanans.length)
          console.log('bd', this.belumDianalisis.length)
          for (var i = 0; i < this.pesanans.length; i++) {
            if (this.pesanans[i].StatusUtama == 1 || this.pesanans[i].StatusUtama == 2) {
              this.belumDianalisis.push(this.pesanans[i]);

              if (this.belumDianalisis) {
                 this.bd1st = this.belumDianalisis[i].Sampel;

                for (var j = 0; j < this.bd1st.length; j++) {
                  if (j == 0) {
                    this.belumDianalisis[i].awal = this.belumDianalisis[i].Sampel[j];
                  }
                  this.bdSisa = this.belumDianalisis[i].Sampel;
                  this.belumDianalisis[i].sisa = this.bdSisa.filter(sampel =>
                    sampel !== this.belumDianalisis[i].awal);
                }
              }

            }
            else if (this.pesanans[i].StatusUtama == 3 || this.pesanans[i].StatusUtama == 4) {
              this.dianalisis.push(this.pesanans[i]);
            }
            else if (this.pesanans[i].StatusUtama == 5) {
              this.selesai.push(this.pesanans[i]);
            }
            else if (this.pesanans[i].StatusUtama == 6 || this.pesanans[i].StatusUtama == 7) {
              this.batal.push(this.pesanans[i]);
            }


          }
          console.log(this.belumDianalisis)

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Buat pesanan gagal',
            subTitle: 'Silahkan coba lagi.',
            buttons: ['OK']
          });
          alert.present();
        }
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  showSampel(item){
    this.sisa = item.awal.JenisSampel;
  }
  hideSampel(item){
    this.sisa = "";
  }
}
