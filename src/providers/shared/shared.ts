import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { LoadingController, ToastController, Loading } from 'ionic-angular';
/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  loading: Loading;
  apiUrl: string;
  httpOptions1: { headers: HttpHeaders; };
  baseUrl: string;
  httpOptions: { headers: HttpHeaders; };
  constructor(public http: HttpClient, private storage: Storage,public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    console.log('Hello SharedProvider Provider');
    this.header();
    this.baseUrl = 'http://immbt.mybustrip.in/';
    this.apiUrl = 'http://api.iamgds.com';
  }

/**
 * Method to show Toast message in anywhere in app
 */
showToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'loading...'
    });
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
  }

  getAuth() {
    var tmp = {"ClientId":50,"ClientSecret":"d66de12fa3473a93415b02494253f088"}
   return this.http.post(`${this.baseUrl}Auth`,this.transformRequest(tmp),{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
   }

  transformRequest(obj) {
    var str = [];
    for (var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  }

  set(value) {
    this.storage.set('Token', value).then(res => {
      return res;
    })
  }

  get(value) {
    this.storage.get(value).then(res => {
      return res;
    })
  }
  
  header() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    } 
  }

  Authenticate() {
    const data = {
      "ClientID": 1,
      "ClientSecret": "WnQu26jmXesvyKe"
    }
    return this.http.post(`${this.baseUrl}mbt/Authenticate`, this.transformRequest(data), this.httpOptions)
  }
  Auth(){
    const data ={
      
        "ClientId": 50,
        "ClientSecret": "d66de12fa3473a93415b02494253f088"
      }
    
    return this.http.post(`http://api.iamgds.com/ota/Auth`,this.transformRequest(data),this.httpOptions)
  }
   
  search(from, to, date){
    const httpOptions =  { 
       headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'access-token':'7FE4226040A19140416CF0AD69C54DE1|50-S|201808012356||FFFF'
      } 
    }
    return this.http.get(`http://api.iamgds.com/ota/Search?fromCityId=${from}&toCityId=${to}&journeyDate=${date}`,httpOptions)
  }

     
  getseatlist(from, to, date,busId){
    const httpOptions =  { 
       headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'access-token':'8FD7038C8C414FF0224DE65086E7D729|50-S|201807102224||FFFF'
      } 
    }
    return this.http.get(`http://api.iamgds.com/ota/Chart?fromCityId=${from}&toCityId=${to}&journeyDate=${date}&busId=${busId}`,httpOptions)
  }

  signUp() {
    const data ={
      "UserName":"keval nayak",
      "MobileNo" :"9822423456",
      "Email" :"hello@gmail.com",
      "Password" :"test123"
  }
 const httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Token': 'bBE8vuLOhbv5udDduhR6jyJAxE2YeOvhJ5UmCDtnQ37HBthyN9olZR8WYyWR2WZz'
    })
  }
    console.log(httpOptions1)
    return this.http.post(`${this.baseUrl}mbt/Register`, this.transformRequest(data),httpOptions1)
  }


}

