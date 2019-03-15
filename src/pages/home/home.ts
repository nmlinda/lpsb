import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpHeaders, HttpClient} from '@angular/common/http';

import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
import { Data } from '../../provider/data';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { CariPage } from '../cari/cari';
import { KeranjangPage } from '../keranjang/keranjang';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // cart on navbar
  responses: any = [];
  keranjangs: any = [];
  jumlahKeranjang: number = 0;
  
  buatPesanan: any;
  kategoriAnalisis: any ;
  listKategori: any = [];
  listKategori2: any = [];
  kategori: any = [];
  pemberitahuan: any;
  panjang: any;

  constructor(public data: Data,
    public nav: NavController, 
    public alertCtrl: AlertController,
    public httpClient: HttpClient) {
    this.buatPesanan = KategoriAnalisisPage;
    this.kategoriAnalisis = KategoriAnalisisPage;
    this.pemberitahuan = PemberitahuanPage;
    
    this.data.getData().then((data)=>
    {
      
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ data.api_token
        })
      };
      this.httpClient.get(this.data.BASE_URL + '/getInfoRekening', httpOptions).subscribe(data => {
        let response = data;
        this.data.setRekening(response);
      })
  
      this.httpClient.get(this.data.BASE_URL+'/getAllKategori/', httpOptions).subscribe(data =>{
       let response = data;
       this.listKategori = response;
       this.listKategori2 = this.listKategori.kategoris;
       console.log(this.listKategori2);
       
       this.panjang = this.listKategori2.length;
       console.log(this.listKategori2.length);
  
         for(var i=0; i<this.panjang;i++){
           this.kategori[i] = this.listKategori2[i];
         }
      });
  
    })
    }

    gotoKategori(IDKategori){
      this.nav.push(KategoriAnalisisPage,{ data: IDKategori });
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
  
    keranjang(){
      this.nav.push(KeranjangPage);
    }
  

    cari(){
      this.nav.push(CariPage);
    }
}
