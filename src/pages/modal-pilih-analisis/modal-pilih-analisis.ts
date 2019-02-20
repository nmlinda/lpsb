import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '../../provider/data';

/**
 * Generated class for the ModalPilihAnalisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-pilih-analisis',
  templateUrl: 'modal-pilih-analisis.html',
})
export class ModalPilihAnalisisPage {
  jenisAnalisis: any;
  namaAnalisis: string;
  analisis = [
    'Fitokimia',
    'Logam Berat',
    'Senyawa Penciri',
    'Kadar',
    'Ekstraksi',
    'Enzim'
  ];
  kategoris: any = [];
  katalogs: any = [];

  constructor(public data: Data, public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public httpClient: HttpClient) {
      this.jenisAnalisis = this.navParams.get('data');

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 'Authorization': 'Bearer '+data.api_token
          })
        };
    
        this.httpClient.get(this.data.BASE_URL+'/getAllKategori/', httpOptions).subscribe(data =>{
         let response = data;
         this.kategoris = response;
         console.log('api ', this.kategoris);
    
        });
        this.httpClient.get(this.data.BASE_URL+'/getAllKatalog/', httpOptions).subscribe(data =>{
          let response = data;
          this.katalogs = response;
          console.log('api 2 ', this.katalogs);
     
         });
      
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPilihAnalisisPage', this.navParams.get('data'));
  }

  jenisSelected(namaJenis){
    this.namaAnalisis = namaJenis;
  }

  closeModal(){
    let data = {
      analisis: this.namaAnalisis,
      idAnalisis: this.jenisAnalisis
    }
    this.viewCtrl.dismiss(data);
    //console.log(this.analisis);
  }
}
