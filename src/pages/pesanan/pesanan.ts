import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',

})
export class PesananPage {
  sisa = "";
  hide = "";
  status: any;
  statusBayar: any;
  statusKirimSampel: any;
  pesanan: any = [];
  pesanans: any = [];
  statusUtama: number;
  belumDianalisis: any = [];
  dianalisis: any = [];
  selesai: any = [];
  batal: any = [];
  sampel: any = [];
  sampelLain: any = [];
  constructor(
    public navCtrl: NavController,
    public data: Data,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public navParams: NavParams) {
    this.status = "1";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
    

  }

  ionViewWillEnter() {
    this.pesanan = [];
    this.pesanans = [];
    this.belumDianalisis = [];
    this.dianalisis = [];
    this.selesai = [];
    this.batal = [];
    this.sampel = [];
    this.sampelLain = [];
    
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getPesanan', httpOptions).subscribe(data => {
        // let response = data;
        this.pesanan = data;
        console.log('will');
        if (this.pesanan.Status == 200) {
          this.pesanans = this.pesanan.AllPesanan;
          for (var i = 0; i < this.pesanans.length; i++) {
            if (this.pesanans[i].StatusUtama == 1 || this.pesanans[i].StatusUtama == 2) {
              this.pesanans[i].show = false;
              this.belumDianalisis.push(this.pesanans[i]);
      
              if (this.belumDianalisis) {
                this.sampel = this.belumDianalisis[i].Sampel;
                for (var j = 0; j < this.sampel.length; j++) {
                  if (j == 0) {
                    this.belumDianalisis[i].awal = this.belumDianalisis[i].Sampel[j];
                  }
                  this.sampelLain = this.belumDianalisis[i].Sampel;
                  this.belumDianalisis[i].sisa = this.sampelLain.filter(sampel =>
                    sampel !== this.belumDianalisis[i].awal);
                }
              }
      
            }
            else if (this.pesanans[i].StatusUtama == 3 || this.pesanans[i].StatusUtama == 4) {
              this.dianalisis.push(this.pesanans[i]);
      
              if (this.dianalisis) {
                this.sampel = this.dianalisis[i].Sampel;
                for (var k = 0; k < this.sampel.length; k++) {
                  if (k == 0) {
                    this.dianalisis[i].awal = this.dianalisis[i].Sampel[k];
                  }
                  this.sampelLain = this.dianalisis[i].Sampel;
                  this.dianalisis[i].sisa = this.sampelLain.filter(sampel =>
                    sampel !== this.dianalisis[i].awal);
                }
              }
      
            }
            else if (this.pesanans[i].StatusUtama == 5) {
              this.selesai.push(this.pesanans[i]);
      
              if (this.selesai) {
                this.sampel = this.selesai[i].Sampel;
                for (var l = 0; l < this.sampel.length; l++) {
                  if (l == 0) {
                    this.selesai[i].awal = this.selesai[i].Sampel[l];
                  }
                  this.sampelLain = this.selesai[i].Sampel;
                  this.selesai[i].sisa = this.sampelLain.filter(sampel =>
                    sampel !== this.selesai[i].awal);
                }
              }
            }
            else if (this.pesanans[i].StatusUtama == 6 || this.pesanans[i].StatusUtama == 7) {
              this.batal.push(this.pesanans[i]);
      
              if (this.batal) {
                this.sampel = this.batal[i].Sampel;
                for (var m = 0; m < this.sampel.length; m++) {
                  if (m == 0) {
                    this.batal[i].awal = this.batal[i].Sampel[m];
                  }
                  this.sampelLain = this.batal[i].Sampel;
                  this.batal[i].sisa = this.sampelLain.filter(sampel =>
                    sampel !== this.batal[i].awal);
                }
              }
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

  showSampel(item) {
    item.show = !item.show;
  }
  detailPesanan(id) {
    this.navCtrl.push(DetailPesananPage, { data: id });
  }
}
