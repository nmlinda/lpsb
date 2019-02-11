import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPesananPage } from './detail-pesanan';

@NgModule({
  declarations: [
    DetailPesananPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPesananPage),
  ],
})
export class DetailPesananPageModule {}
