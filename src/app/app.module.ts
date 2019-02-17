import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PemberitahuanPage } from '../pages/pemberitahuan/pemberitahuan';
import { PesananPage } from '../pages/pesanan/pesanan';
import { ProfilPage } from '../pages/profil/profil';
import { BuatPesananPage } from '../pages/buat-pesanan/buat-pesanan';
import { ListAnalisisPage } from '../pages/list-analisis/list-analisis';
import { ReviewPesananPage } from '../pages/review-pesanan/review-pesanan';
import { CheckoutPage } from '../pages/checkout/checkout';
import { KategoriAnalisisPage } from '../pages/kategori-analisis/kategori-analisis';
import { ModalPilihAnalisisPage } from '../pages/modal-pilih-analisis/modal-pilih-analisis';
import { DetailPesananPage } from '../pages/detail-pesanan/detail-pesanan';
import { EditProfilPage } from '../pages/edit-profil/edit-profil';
import { EditRekeningPage } from '../pages/edit-rekening/edit-rekening';
import { Data } from '../provider/data';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DetailSampelPage } from '../pages/detail-sampel/detail-sampel';
import { NavbarPage } from '../pages/navbar/navbar';
import { CariPage } from '../pages/cari/cari';
import { DetailAnalisisPage } from '../pages/detail-analisis/detail-analisis';
import { GantiPasswordPage } from '../pages/ganti-password/ganti-password';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PemberitahuanPage,
    PesananPage,
    ProfilPage,
    BuatPesananPage,
    ListAnalisisPage,
    ReviewPesananPage,
    CheckoutPage,
    KategoriAnalisisPage,
    ModalPilihAnalisisPage,
    DetailPesananPage,
    EditProfilPage,
    EditRekeningPage,
    DetailSampelPage,
    NavbarPage,
    CariPage,
    DetailAnalisisPage,
    GantiPasswordPage
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    PemberitahuanPage,
    PesananPage,
    ProfilPage,
    BuatPesananPage,
    ListAnalisisPage,
    ReviewPesananPage,
    CheckoutPage,
    KategoriAnalisisPage,
    ModalPilihAnalisisPage,
    DetailPesananPage,
    EditProfilPage,
    EditRekeningPage,
    DetailSampelPage,
    NavbarPage,
    CariPage,
    DetailAnalisisPage,
    GantiPasswordPage
  ],
  providers: [
    Data,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
