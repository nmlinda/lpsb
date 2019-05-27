import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { EditRekeningPage } from '../edit-rekening/edit-rekening';

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
    public modalCtrl: ModalController,
    public data: Data,
    public app: App) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  ionViewWillEnter(){
    this.nama = null;
    this.institusi = null;
    this.alamat = null;
    this.email = null;
    this.noHp = null;
    this.npwp = null;
    this.data.getData().then((data) => {
      this.nama = data.Nama;
      this.institusi = data.Perusahaan;
      this.alamat = data.Alamat;
      this.email = data.Email;
      this.noHp = data.NoHP;
      this.npwp = data.NoNPWP;
    })
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

  editProfil() {
    let modal = this.modalCtrl.create(EditProfilPage);
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('data', data)
        this.nama = data.Nama;
        this.institusi = data.Perusahaan;
        this.alamat = data.Alamat;
        this.email = data.Email;
        this.noHp = data.NoHP;
        this.npwp = data.NoNPWP;
      }
      });
    modal.present();
  }

  editRekening(){
    let modal = this.modalCtrl.create(EditRekeningPage);
    modal.present();
  }

}
