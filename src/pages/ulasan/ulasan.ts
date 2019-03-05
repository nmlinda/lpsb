import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UlasanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ulasan',
  templateUrl: 'ulasan.html',
})
export class UlasanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(this.navParams.get('data'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UlasanPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
