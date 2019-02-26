import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { EditRekeningPage } from '../edit-rekening/edit-rekening';
import { GantiPasswordPage } from '../ganti-password/ganti-password';

// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoginPage } from '../login/login';
import { Data } from '../../provider/data';
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  editProfil: any;
  editRekening: any;
  gantiPass: any;

  nama: string;
  institusi: string;
  alamat: string;

  email: string;
  noHp: string;
  npwp: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public data: Data,
    public app: App) {

    this.editProfil = EditProfilPage;
    this.editRekening = EditRekeningPage;
    this.gantiPass = GantiPasswordPage;

    this.nama = "Muhammad Gofar";
    this.institusi = "Institut Pertanian Bogor";
    this.alamat = "Jl Balebak 2 Bogor";
    this.email = "gofar@gmail.com";
    this.noHp = "0813434936694";
    this.npwp = "20857620934";

    this.data.getData().then((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoNPWP;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: '',
      subTitle: 'Anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked')
            // this.navCtrl.setRoot(MyApp); 
            this.data.logout();
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
