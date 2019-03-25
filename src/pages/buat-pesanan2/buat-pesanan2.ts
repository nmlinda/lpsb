import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
// import { KeranjangPage } from '../keranjang/keranjang';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetailAnalisisPage } from '../detail-analisis/detail-analisis';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeranjangPage } from '../keranjang/keranjang';

@IonicPage()
@Component({
  selector: 'page-buat-pesanan2',
  templateUrl: 'buat-pesanan2.html',
})
export class BuatPesanan2Page {
  pesanform: FormGroup;
  pesanData = {
    "namaJenis": "",
    "kemasan": "",
    "kemasanLainnya": "",
    "bentuk": "",
    "jumlah": ""
  };

  kemasan2: string;

  // info jenis analisis
  info: boolean = true;
  IDjenis: any;
  jenisAnalisis: any;
  namaJenis: string;
  harga: number;
  metode: string;
  keterangan: string;
  bentukCairan: number;
  bentukEkstrak: number;
  bentukSimplisia: number;
  bentukSerbuk: number;
  Cairan: boolean = false;
  Ekstrak: boolean = false;
  Serbuk: boolean = false;
  Simplisia: boolean = false;

  //form
  kemasanLain: boolean = false;
  ekstrak: boolean = true;
  simplisia: boolean = true;
  serbuk: boolean = true;
  cairan: boolean = true;

  keranjang: any;
  constructor(
    public data: Data,
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public httpClient: HttpClient) {

    this.pesanData.kemasan = 'pilih';
    this.pesanData.bentuk = 'pilih';
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad BuatPesanan2Page');
}

ionViewWillEnter(){
  this.IDjenis = null;
  this.namaJenis = null;
  this.harga = null;
  this.bentukCairan = null;
  this.bentukEkstrak = null;
  this.bentukSerbuk = null;
  this.bentukSimplisia = null;
  this.cairan = true;
  this.ekstrak = true;
  this.serbuk = true;
  this.simplisia = true;

  this.IDjenis = this.navParams.get('id');
  this.namaJenis = this.navParams.get('namaJenis');
  this.harga = this.navParams.get('harga');
  console.log(this.navParams.get('serbuk'))
  this.bentukCairan = this.navParams.get('cairan');
  this.bentukEkstrak = this.navParams.get('ekstrak');
  this.bentukSerbuk = this.navParams.get('serbuk');
  this.bentukSimplisia = this.navParams.get('simplisia');
  if (this.bentukCairan === 1) {
    this.cairan = false;
  }
  if (this.bentukEkstrak === 1) {
    this.ekstrak = false;
  }
  if (this.bentukSerbuk === 1) {
    this.serbuk = false;
  }
  if (this.bentukSimplisia === 1) {
    this.simplisia = false;
  }

}

ngOnInit() {
  this.pesanform = new FormGroup({
    namaJenis: new FormControl('', [Validators.required]),
    kemasan: new FormControl('', [Validators.required]),
    kemasanLainnya: new FormControl('', [Validators.required]),
    bentuk: new FormControl('', [Validators.required]),
    jumlah: new FormControl('', [Validators.required]),
  });
}

kemasanChange() {
  if (this.pesanData.kemasan == "lainnya") {
    this.kemasanLain = true;
    this.pesanform.controls['kemasanLainnya'].enable();
  }
  else {
    this.kemasanLain = false;
    this.pesanform.controls['kemasanLainnya'].disable();
  }
}

tambahKeranjang() {
  let loading = this.loadCtrl.create({
    content: 'memuat..'
  });
  loading.present();
  setTimeout(() => {
      loading.dismiss();
    }, 5000);
  if (this.pesanData.kemasan === "lainnya") {
    this.kemasan2 = this.pesanData.kemasanLainnya;
  }
  else {
    this.kemasan2 = this.pesanData.kemasan;
  }
  let input = JSON.stringify({
    "IDKatalog": this.IDjenis,
    "JenisSampel": this.pesanData.namaJenis,
    "Kemasan": this.kemasan2,
    "BentukSampel": this.pesanData.bentuk,
    "Jumlah": this.pesanData.jumlah,
  });

  this.data.getData().then((data) => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.api_token
      })
    };

    this.httpClient.post(this.data.BASE_URL + '/tambahItemKeranjang', input, httpOptions).subscribe(data => {
      let response = data;
      this.keranjang = response;
      console.log(response);
      if (this.keranjang.Status == 201) {
        loading.dismiss();
        this.toastKeranjang();
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(DetailAnalisisPage, { data: this.IDjenis }).then(() => {
          this.navCtrl.remove(currentIndex);
          this.navCtrl.remove(currentIndex - 1);
        });
        // this.navCtrl.push(DetailAnalisisPage, { data: this.IDjenis });
      }
      else {
        loading.dismiss();
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

gotoKeranjang() {
  let loading = this.loadCtrl.create({
    content: 'memuat..'
  });
  loading.present(); 
  setTimeout(() => {
      loading.dismiss();
    }, 5000);
  if (this.pesanData.kemasan === "lainnya") {
    this.kemasan2 = this.pesanData.kemasanLainnya;
  }
  else {
    this.kemasan2 = this.pesanData.kemasan;
  }

  let input = JSON.stringify({
    "IDKatalog": this.IDjenis,
    "JenisSampel": this.pesanData.namaJenis,
    "Kemasan": this.kemasan2,
    "BentukSampel": this.pesanData.bentuk,
    "Jumlah": this.pesanData.jumlah,
  });

  this.data.getData().then((data) => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.api_token
      })
    };

    this.httpClient.post(this.data.BASE_URL + '/tambahItemKeranjang', input, httpOptions).subscribe(data => {
      let response = data;
      this.keranjang = response;
      console.log(response);
      if (this.keranjang.Status == 201) {
        loading.dismiss();
        this.toastKeranjang();
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(KeranjangPage).then(() => {
          this.navCtrl.remove(currentIndex);
        });
      }
      else {
        loading.dismiss();
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

showInfo() {
  this.info = !this.info;
}

toastKeranjang() {
  let toast = this.toastCtrl.create({
    message: 'Pesanan berhasil dimasukkan ke keranjang.',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
