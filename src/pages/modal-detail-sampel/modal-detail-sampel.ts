import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalDetailSampelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detail-sampel',
  templateUrl: 'modal-detail-sampel.html',
})
export class ModalDetailSampelPage {
sampel: any = [];
hargaIPB: number = 0;
hargaNONIPB: number = 0;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.sampel = this.navParams.get('data');
    for (var i = 0; i < this.sampel.length; i++) {
      this.hargaIPB += this.sampel[i].HargaIPB;
      this.hargaNONIPB += this.sampel[i].HargaNONIPB;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailSampelPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
