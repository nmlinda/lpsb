import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilPage } from '../profil/profil';
import { PesananPage } from '../pesanan/pesanan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PesananPage;
  tab3Root = ProfilPage;

  constructor() {

  }
}
