import { Http, Headers } from '@angular/http';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetailPesananPage } from '../detail-pesanan/detail-pesanan';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public Http: Http,
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

      // this.postPhoto(result);
      this.sendImage(result);
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
      // this.postPhoto(imageData);
      this.sendImage(imageData);

      this.validPhoto = true;
    }, (err) => {

      console.error(err);
    });
  }

  sendImage(img) {
    console.log('img: ', img)

    this.data.getData().then((data) => {
      // var headers = new Headers();
      // let token = data.api_token;
      // headers.append("Authorization", "Bearer " + token);
      // var url = this.data.BASE_URL + "/uploadBuktiPembayaran/" + this.idPesanan;
      // var response = this.Http
      //   .post(url, img, { headers: headers })
      //   .map(res => res.json());
      // console.log('response: ', response)
      // loading.dismiss();
      // return response;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': "multipart/form-data",
          'Authorization': 'Bearer ' + data.api_token
        })
      };
      let imgs: FormData = new FormData();
      imgs.append('img', img);
    this.httpClient.post(this.data.BASE_URL +"/uploadBuktiPembayaran/" + this.idPesanan, imgs, httpOptions).subscribe(data => {
      let response = data;
      console.log(response);
    });
  });
  }


  postPhoto(img) {

    if (img) {
      console.log('ada foto')
      console.log(img)
    } else {
      console.log('no foto')
    }

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
        mimeType: "multipart/form-data",
        headers: {
          'Authorization': 'Bearer ' + data.api_token
        }
      }
      fileTransfer.upload(img, encodeURI(this.data.BASE_URL + "/uploadBuktiPembayaran/" + this.idPesanan), options, true)
        .then((response) => {
          this.responses = response;
          this.upload = JSON.parse(this.responses.response);
          console.log(this.upload)

          loading.dismiss();

          if (this.upload.Status == 200) {
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
            this.alertGagal();
          }

        }, (err) => {
          loading.dismiss();
          console.log(err);
          this.alertGagal();
        });
    })
  }
  alertGagal() {

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
}
