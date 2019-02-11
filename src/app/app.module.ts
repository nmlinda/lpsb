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
    ModalPilihAnalisisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    KategoriAnalisisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
