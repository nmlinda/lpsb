import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPilihAnalisisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-pilih-analisis',
  templateUrl: 'modal-pilih-analisis.html',
})
export class ModalPilihAnalisisPage {
  jenisAnalisis: any;

  analisis = [
    'Fitokimia',
    'Logam Berat',
    'Senyawa Penciri',
    'Kadar',
    'Ekstraksi',
    'Enzim'
  ];
  kategori: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.jenisAnalisis = this.navParams.get('data');
      
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPilihAnalisisPage', this.navParams.get('data'));
  }

  closeModal(){
    let analisis = this.jenisAnalisis;
    this.viewCtrl.dismiss(analisis);
    console.log(analisis);
  }
}
