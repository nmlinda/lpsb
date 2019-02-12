import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfilPage } from '../edit-profil/edit-profil';
import { EditRekeningPage } from '../edit-rekening/edit-rekening';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  editProfil: any;
  editRekening: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editProfil = EditProfilPage;
    this.editRekening = EditRekeningPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
