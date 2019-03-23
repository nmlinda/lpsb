import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the CariPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cari',
  templateUrl: 'cari.html',
})
export class CariPage {
  katalogs: any = [];
  katalog: any = [];
  listKatalog: any = [];
  panjang: any;
  cariAnalisis: string;
  constructor(public navCtrl: NavController,
    public data: Data,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public navParams: NavParams) {
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getAllKatalogUmum/', httpOptions).subscribe(data => {
        let response = data;
        this.katalogs = response;
        this.listKatalog = this.katalogs.katalogs;
        console.log(response);

        this.data.getData().then((data) => {

          this.panjang = this.listKatalog.length;
          for (var i = 0; i < this.panjang; i++) {
            this.katalog[i] = this.listKatalog[i];
            if (data.Perusahaan == "Institut Pertanian Bogor") {
              this.listKatalog[i].Harga = this.listKatalog[i].HargaIPB;
            }
            else {
              this.listKatalog[i].Harga = this.listKatalog[i].HargaNONIPB;
            }
          }
        })
      })

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CariPage');
  }

}
