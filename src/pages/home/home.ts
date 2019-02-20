import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient} from '@angular/common/http';

import { BuatPesananPage } from '../buat-pesanan/buat-pesanan';
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
  pemberitahuan: any;
  
  kategoris = [
    'Fitokimia',
    'Logam Berat',
    'Senyawa Penciri',
    'Kadar',
    'Ekstraksi',
    'Enzim'
  ];

  constructor(public data: Data, public nav: NavController, public httpClient: HttpClient) {
    this.buatPesanan = BuatPesananPage;
    this.kategoriAnalisis = KategoriAnalisisPage;
    this.pemberitahuan = PemberitahuanPage;
    // this.data.getData().then((data)=>
    // {
      
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer '+data.api_token
        })
      };
  
      this.httpClient.get(this.data.BASE_URL+'/getAllKategori/', httpOptions).subscribe(data =>{
       let response = data;
       this.listKategori = response;
       console.log(this.listKategori);
  
      });
  
    // })
    }

    gotoKategori(kategori){
      this.nav.push(KategoriAnalisisPage,{ data: kategori });
    }

    cari(){
      this.nav.push(CariPage);
    }
}
