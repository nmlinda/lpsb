import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UlasanPage } from '../ulasan/ulasan';

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
    public modalCtrl: ModalController,
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

    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getPesanan', httpOptions).subscribe(data => {
        this.pesanan = data;
        console.log('will');
        if (this.pesanan.Status == 200) {
          this.pesanans = this.pesanan.AllPesanan;
          for (var i = 0; i < this.pesanans.length; i++) {
            this.pesanans[i].show = false;

            this.sampel = [];
            this.sampel = this.pesanans[i].Sampel;
            this.pesanans[i].awal = this.pesanans[i].Sampel[0];
            this.pesanans[i].sisa = this.sampel.filter(sampel =>
              sampel.IDSampel !== this.pesanans[i].awal.IDSampel);

            if (this.pesanans[i].StatusUtama == 1 || this.pesanans[i].StatusUtama == 2) {
              this.belumDianalisis.push(this.pesanans[i]);
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
          console.log(this.pesanans)
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
