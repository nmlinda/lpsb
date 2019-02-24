import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../provider/data';

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
  nama: any;
  institusi: any;
  institusiLain: any;
  email: any;
  alamat: any;
  noHp: any;
  npwp: any;

  inputInstitusi: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data) {
      this.data.getData().then((data)=>
      {
        this.nama = data.Nama;
        this.institusi = data.Perusahaan;
        if(data.Perusahaan === "Institut Pertanian Bogor"){
          this.institusi = 1;
        } else if(data.Perusahaan){
          this.institusi = 2;
          this.institusiLain = data.Perusahaan;
          this.inputInstitusi = true;
        }
        this.email = data.Email;
        this.alamat = data.Alamat;
        this.noHp = data.NoHP;
        this.npwp = data.NoIdentitas;
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilPage');
  }

  onInputAsal(){
    this.inputInstitusi = false;
  }
  offInputAsal(){
    this.inputInstitusi = true;
  }
}
