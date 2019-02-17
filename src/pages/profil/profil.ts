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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editProfil = EditProfilPage;
    this.editRekening = EditRekeningPage;
    this.gantiPass = GantiPasswordPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
