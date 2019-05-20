import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpClient } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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

  responses: any = [];
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

      console.error(err);
    });
  }


  postPhoto(img) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let loading = this.loadCtrl.create({
      content: 'mengunggah..'
    });

    loading.present();

    this.data.getData().then((data) => {
      let options: FileUploadOptions = {
        fileKey: 'img',
        fileName: img.substr(img.lastIndexOf('/') + 1),
        chunkedMode: false,
        headers: {
          'Content-Type': 'image/jpeg',
          'Authorization': 'Bearer ' + data.api_token
        }
      }
      if (img) {
        console.log('ada foto')
        console.log(img)
      } else {
        console.log('no foto')
      }
      fileTransfer.upload(img,encodeURI(this.data.BASE_URL + "/uploadBuktiPembayaran/" + this.idPesanan), options, true)
        .then((response) => {
          this.responses = response;
          this.upload = JSON.parse(this.responses.response);
          console.log(this.upload)

          if (this.upload.Status == 200) {
            loading.dismiss();
            this.NativePageTransitions.fade(null);
            let currentIndex = this.navCtrl.getActive().index;
            this.navCtrl.push(DetailPesananPage, { data: this.idPesanan }).then(() => {
              this.navCtrl.remove(currentIndex);
              this.navCtrl.remove(currentIndex - 1);
            });

            let alert = this.alertCtrl.create({
              title: 'Unggah Bukti Pembayaran Berhasil',
              message: 'Bukti pembayaran anda segera divalidasi.',
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

          } else {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Unggah Bukti Pembayaran Gagal',
              message: 'Silahkan coba lagi.',
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
          }

        }, (err) => {
          loading.dismiss();
          console.log(err);
          let alert = this.alertCtrl.create({
            title: 'Unggah Bukti Pembayaran Gagal',
            message: 'Silahkan coba lagi.',
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
        });
    })
  }
}
