import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilPage } from '../profil/profil';
import { PesananPage } from '../pesanan/pesanan';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '../../provider/data';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PemberitahuanPage;
  tab3Root = PesananPage;
  tab4Root = ProfilPage;

  response: any = [];
  notif: any = [];
  unread: number;
  constructor(
    public data: Data,
    public httpClient: HttpClient,
    public alertCtrl: AlertController,
  ) {
    
  }

  ionViewWillEnter(){
    this.data.getData().then((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };

      this.httpClient.get(this.data.BASE_URL + '/getPemberitahuan', httpOptions).subscribe(data => {
        this.response = data;
        console.log(this.response);
        if (this.response) {
          this.notif = this.response.Pemberitahuans;
          this.unread = 0;
          for(var i=0; i < this.notif.length; i++){
            if (this.notif[i].Dilihat == 0){
              this.unread += 1;
            }
            
          }
          console.log(this.unread)
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
}
