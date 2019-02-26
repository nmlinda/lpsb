import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { EditRekeningPage } from '../edit-rekening/edit-rekening';
import { DetailSampelPage } from '../detail-sampel/detail-sampel';
import { Data } from '../../provider/data';

/**
 * Generated class for the ReviewPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-pesanan',
  templateUrl: 'review-pesanan.html',
})
export class ReviewPesananPage {
  sampel: any = [];
  hargaIPB: number = 0;
  hargaNONIPB: number = 0;
  IPB: boolean;
  editRekening: any;
  editProfil: any;
  detailSampel: any;
  lamaPengujian: any;
  hargaPercepatan: boolean = true;
  harga: number = 420000;
  harga2: number;
  kodeUnik: number = 429;
  totalHarga: number;
  totalHarga2: number;
  nama: string;
  institusi: string;
  alamat: string;
  email: string;
  noHp: string;
  npwp: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data) {
    this.editProfil= EditProfilPage;
    this.editRekening = EditRekeningPage;
    this.detailSampel = DetailSampelPage;
    
    this.sampel = this.navParams.get('data');
    
    this.data.getData().then((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoIdentitas;
    })

    this.lamaPengujian = "1";
    this.totalHarga = this.harga + this.kodeUnik;
    for(var i=0; i<this.sampel.length; i++){
      this.hargaIPB += this.sampel[i].HargaIPB;
      this.hargaNONIPB += this.sampel[i].HargaNONIPB;
    }
    if(this.institusi == "Institut Pertanian Bogor" && this.institusi){
      this.IPB = true;
    } else{
      this.IPB = false;
    }
    // this.nama = "Muhammad Gofar";
    // this.institusi = "Institut Pertanian Bogor";
    // this.alamat = "Jl Balebak 2 Bogor";
    // this.email = "gofar@gmail.com";
    // this.noHp = "0813434936694";
    // this.npwp = "20857620934";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPesananPage');
  }
  
  checkout(){
    this.navCtrl.push(CheckoutPage);
  }
  lamaSelected(){
    this.hargaPercepatan = !this.hargaPercepatan;
    this.harga2 = this.harga*2;
    this.totalHarga2 = this.harga2 + this.kodeUnik;
  }
}
