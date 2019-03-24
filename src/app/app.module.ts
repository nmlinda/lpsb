import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PemberitahuanPage } from '../pages/pemberitahuan/pemberitahuan';
import { PesananPage } from '../pages/pesanan/pesanan';
import { ProfilPage } from '../pages/profil/profil';
import { ReviewPesananPage } from '../pages/review-pesanan/review-pesanan';
import { CheckoutPage } from '../pages/checkout/checkout';
import { KategoriAnalisisPage } from '../pages/kategori-analisis/kategori-analisis';
import { DetailPesananPage } from '../pages/detail-pesanan/detail-pesanan';
import { EditProfilPage } from '../pages/edit-profil/edit-profil';
import { EditRekeningPage } from '../pages/edit-rekening/edit-rekening';
import { Data } from '../provider/data';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CariPage } from '../pages/cari/cari';
import { DetailAnalisisPage } from '../pages/detail-analisis/detail-analisis';
import { GantiPasswordPage } from '../pages/ganti-password/ganti-password';
import { KirimSampelPage } from '../pages/kirim-sampel/kirim-sampel';
import { PembayaranPage } from '../pages/pembayaran/pembayaran';
import { BatalPesananPage } from '../pages/batal-pesanan/batal-pesanan';
import { UlasanPage } from '../pages/ulasan/ulasan';
import { BuatPesanan2Page } from '../pages/buat-pesanan2/buat-pesanan2';
import { KeranjangPage } from '../pages/keranjang/keranjang';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ModalDetailSampelPage } from '../pages/modal-detail-sampel/modal-detail-sampel';
import { ModalEditProfilPage } from '../pages/modal-edit-profil/modal-edit-profil';
import { CariPipe } from '../pipes/cari/cari';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    PemberitahuanPage,
    PesananPage,
    ProfilPage,
    ReviewPesananPage,
    CheckoutPage,
    KategoriAnalisisPage,
    DetailPesananPage,
    EditProfilPage,
    EditRekeningPage,
    CariPage,
    DetailAnalisisPage,
    GantiPasswordPage,
    KirimSampelPage,
    PembayaranPage,
    BatalPesananPage,
    UlasanPage,
    BuatPesanan2Page,
    KeranjangPage,
    LoginPage,
    RegisterPage,
    ModalDetailSampelPage,
    ModalEditProfilPage,
    CariPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    PemberitahuanPage,
    PesananPage,
    ProfilPage,
    ReviewPesananPage,
    CheckoutPage,
    KategoriAnalisisPage,
    DetailPesananPage,
    EditProfilPage,
    EditRekeningPage,
    CariPage,
    DetailAnalisisPage,
    GantiPasswordPage,
    KirimSampelPage,
    PembayaranPage,
    BatalPesananPage,
    UlasanPage,
    BuatPesanan2Page,
    KeranjangPage,
    LoginPage,
    RegisterPage,
    ModalDetailSampelPage,
    ModalEditProfilPage
  ],
  providers: [
    Data,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
