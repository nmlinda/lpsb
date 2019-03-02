import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditProfilPage } from './modal-edit-profil';

@NgModule({
  declarations: [
    ModalEditProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditProfilPage),
  ],
})
export class ModalEditProfilPageModule {}
