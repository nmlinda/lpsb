import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the PembayaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pembayaran',
  templateUrl: 'pembayaran.html',
})
export class PembayaranPage {
  idPesanan: any;
  harga: number;
  waktu: Date;
  

  email: any;
  token: any;
  validPhoto = false;

  upload: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public loadCtrl: LoadingController,
    public httpClient: HttpClient,
    public NativePageTransitions: NativePageTransitions,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    public viewCtrl: ViewController) {
    this.idPesanan = this.navParams.get('id');
    this.harga = this.navParams.get('harga');
    this.waktu = new Date(this.navParams.get('waktu'));
    this.waktu.setDate(this.waktu.getDate() + 3);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembayaranPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  uploadBukti() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Ambil Gambar Baru',
          role: 'ambilGambar',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Pilih Dari Galleri',
          role: 'gallery',
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }

  async takePicture() {
    try {
      const options: CameraOptions = {
        quality: 50, //to reduce img size
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI, //FILE URI itu buat image aseli
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result = await this.camera.getPicture(options);

      // this.img = 'data:image/jpeg;base64,' + result;

      this.postPhoto(result);

      this.validPhoto = true;

    }
    catch (e) {
      console.error(e);
      alert("error");
    }

  }

  getPhotoFromGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      targetHeight: 600
    }).then((imageData) => {
      // this.base64Image = imageData;
      // this.uploadFoto();

      // this.img = 'data:image/jpeg;base64,' + imageData;
      this.postPhoto(imageData);

      this.validPhoto = true;
    }, (err) => {
    });
  }


  postPhoto(photo) {
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    // api

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.data.getData().then((data) => {
    let options: FileUploadOptions = {
      fileKey: 'img',
      fileName: this.idPesanan + '_' + Date.now(),
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.api_token
       }
    }

    fileTransfer.upload(photo, this.data.BASE_URL + "/uploadBuktiPembayaran", options)
      .then((response) => {
        this.upload = response;
      loading.dismiss();
        console.log(response)
        this.NativePageTransitions.fade(null);
        let currentIndex = this.navCtrl.getActive().index;
        this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
          this.navCtrl.remove(currentIndex);
          this.navCtrl.remove(currentIndex - 1);
        });

        let alert = this.alertCtrl.create({
          title: 'Unggah Bukti Pembayaran Berhasil',
          message: 'API ' + this.upload.DebugRequest + 's ' + this.upload.Status,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('Agree clicked');
              }
            }
          ]
        });
        alert.present();

      }, (err) => {
        console.log(err);
        loading.dismiss();
        alert(JSON.stringify(err));
      });
      })
  }
}
