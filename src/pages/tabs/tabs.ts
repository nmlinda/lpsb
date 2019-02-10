import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilPage } from '../profil/profil';
import { PemberitahuanPage } from '../pemberitahuan/pemberitahuan';
import { PesananPage } from '../pesanan/pesanan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PemberitahuanPage;
  tab3Root = PesananPage;
  tab4Root = ProfilPage;

  constructor() {

  }
}
