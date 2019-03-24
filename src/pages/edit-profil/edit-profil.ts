import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ProfilPage } from '../profil/profil';

/**
 * Generated class for the EditProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html',
})
export class EditProfilPage {
  profilform: FormGroup;
  profilData = {
    "nama": "",
    "institusi": 0,
    "institusiLain": "",
    "noIdentitas": "",
    "email": "",
    "alamat": "",
    "noHp": "",
    "npwp": "",
  };

  institusi: string;
  institusiLain: boolean = false;
  IPB: boolean = false;
  profils: any =[];

  constructor(
    public data: Data,
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient) {
    this.data.getData().then((data) => {
      this.profilData.nama = data.Nama;
      if (data.Perusahaan == "Institut Pertanian Bogor") {
        this.profilData.institusi = 1;
        this.profilData.noIdentitas = data.NoIdentitas;
        this.IPB = true;
        this.profilform.controls['institusiLain'].disable();
        this.profilform.controls['noIdentitas'].enable();
      } else if (data.Perusahaan) {
        this.profilData.institusi = 2;
        this.profilData.institusiLain = data.Perusahaan;
        this.profilData.noIdentitas = data.NoIdentitas;
        this.institusiLain = true;
        this.profilform.controls['institusiLain'].enable();
        this.profilform.controls['noIdentitas'].disable();
      }
      this.profilData.email = data.Email;
      this.profilData.alamat = data.Alamat;
      this.profilData.noHp = data.NoHP;
      this.profilData.npwp = data.NoNPWP;
      this.profilData.noIdentitas = data.NoIdentitas;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilPage');
  }

  ngOnInit() {
    let EMAILPATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.profilform = new FormGroup({
      nama: new FormControl('', [Validators.required]),
      institusi: new FormControl('', [Validators.required]),
      institusiLain: new FormControl('', [Validators.required]),
      noIdentitas: new FormControl('', [Validators.required]),
      alamat: new FormControl(''),
      noHp: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      npwp: new FormControl(''),
    });
  }

  institusiChange() {
    if (this.profilData.institusi == 1) {
      this.IPB = true;
      this.institusiLain = false;
      this.profilform.controls['institusiLain'].disable();
      this.profilform.controls['noIdentitas'].enable();
    } else if (this.profilData.institusi == 2) {
      this.institusiLain = true;
      this.IPB = false;
      this.profilform.controls['institusiLain'].enable();
      this.profilform.controls['noIdentitas'].disable();
    }
  }


  simpan() {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    loading.present();

    if(this.profilData.institusi == 1){
      this.institusi = "Institut Pertanian Bogor";
    } else if(this.profilData.institusi == 2){
      this.institusi = this.profilData.institusiLain;
    }
    let input = JSON.stringify({
      "Nama": this.profilData.nama,
      "Perusahaan": this.institusi,
      "NoIdentitas": this.profilData.noIdentitas,
      "Email": this.profilData.email,
      "Alamat": this.profilData.alamat,
      "NoHP": this.profilData.noHp,
      "NoNPWP": this.profilData.npwp,
    });
    this.data.getData().then((data) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      this.httpClient.post(this.data.BASE_URL + '/simpanProfil', input, httpOptions).subscribe(data => {
        let response = data;
        this.profils = response;
        console.log(response);
        if (this.profils.Status == 200) {
          loading.dismiss();
          this.data.login(this.profils); // simpan response ke local storage
          this.viewCtrl.dismiss(this.profils);
        }
        else {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Gagal Menyimpan',
            subTitle: 'Silahkan coba lagi',
            buttons: ['OK']
          });
          alert.present();
        }

      });

    })
  }
  
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
