import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  public BASE_URL = 'http://biofarmaka-lpsb.serveo.net/elpsb/api';

  // public BASE_URL = 'https://powerful-tor-69480.herokuapp.com/elpsb/api';
  public HAS_LOGGED_IN = 'status_login';

  constructor(public httpClient: HttpClient, public storage: Storage) {

  }

  login(data_user: any) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('data_user', data_user);
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('data_user');
    this.storage.remove('data_rek');
  }

  setRekening(data_rek: any) {
    this.storage.set('data_rek', data_rek);
  }

  getRekening() {
    return this.storage.get('data_rek').then((val) => {
      return val;
    });
  }

  //   setTipeKegiatan(id_tipe_kegiatan: number){
  //     this.storage.set('id_tipe_kegiatan', id_tipe_kegiatan);
  //   }

  //   getTipeKegiatan(){
  //   return this.storage.get('id_tipe_kegiatan').then( (val) => {
  //     return val;
  //   });
  //   }

  getData() {
    return this.storage.get('data_user').then((val) => {
      return val;
    });
  }

  isLogin() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

}
