import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Data } from '../../provider/data';

/**
 * Generated class for the EditRekeningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-rekening',
  templateUrl: 'edit-rekening.html',
})
export class EditRekeningPage {
  namaNasabah: any;
  namaBank: any;
  noRekening: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public data: Data) {
      this.data.getData().then((data)=>
      {
        this.namaNasabah = data.NamaRekening;
        this.namaBank = data.NamaBank;
        this.noRekening = data.NoRekening; 
      })  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRekeningPage');
  }

}
