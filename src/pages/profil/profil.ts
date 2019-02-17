import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { EditRekeningPage } from '../edit-rekening/edit-rekening';
import { GantiPasswordPage } from '../ganti-password/ganti-password';
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
  email: string;
  nama: string;
  institusi: string;
  alamat: string;
  email: string;
  noHp: string;
  npwp: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editProfil = EditProfilPage;
    this.editRekening = EditRekeningPage;
    this.gantiPass = GantiPasswordPage;
    this.nama = "Muhammad Gofar";
    this.institusi = "Institut Pertanian Bogor";
    this.alamat = "Jl Balebak 2 Bogor";
    this.email = "gofar@gmail.com";
    this.noHp = "0813434936694";
    this.npwp = "20857620934";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
