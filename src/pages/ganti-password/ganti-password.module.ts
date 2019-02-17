import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GantiPasswordPage } from './ganti-password';

@NgModule({
  declarations: [
    GantiPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(GantiPasswordPage),
  ],
})
export class GantiPasswordPageModule {}
