import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from '../../provider/data';

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
  // hargaIPB: number = 0;
  // hargaNONIPB: number = 0;
  harga: number = 0;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public data: Data,
    public navParams: NavParams) {

    // this.hargaIPB += this.sampel[i].HargaIPB;
    // this.hargaNONIPB += this.sampel[i].HargaNONIPB;

    this.data.getData().then((data_user) => {
      this.sampel = this.navParams.get('data');
      for (var i = 0; i < this.sampel.length; i++) {
        if (data_user.Perusahaan == "Institut Pertanian Bogor" && data_user.Perusahaan) {
          this.sampel[i].Harga = this.sampel[i].HargaIPB;
        } else if (data_user.Perusahaan) {
          this.sampel[i].Harga = this.sampel[i].HargaNONIPB;
        }

        this.harga += this.sampel[i].Harga;
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailSampelPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
