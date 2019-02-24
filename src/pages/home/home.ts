import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpHeaders, HttpClient} from '@angular/common/http';

import { KategoriAnalisisPage } from '../kategori-analisis/kategori-analisis';
import { Data } from '../../provider/data';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { CariPage } from '../cari/cari';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  buatPesanan: any;
  kategoriAnalisis: any ;
  listKategori: any = [];
  listKategori2: any = [];
  kategori: any = [];
  pemberitahuan: any;
  panjang: any;
  kategoris = [
    'Fitokimia',
    'Logam Berat',
    'Senyawa Penciri',
    'Kadar',
    'Ekstraksi',
    'Enzim'
  ];

  constructor(public data: Data, public nav: NavController, public httpClient: HttpClient) {
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

    cari(){
      this.nav.push(CariPage);
    }
}
