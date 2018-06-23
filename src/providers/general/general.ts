import {HttpClient, HttpHeaders }from '@angular/common/http'; 
import {Injectable }from '@angular/core'; 
import { AutoCompleteService } from "ionic2-auto-complete";
import 'rxjs/add/operator/map';
import {Storage  } from "@ionic/storage";
import { ToastController, LoadingController, MenuController } from "ionic-angular";
/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI. */
@Injectable()
export class GeneralProvider {
  transcationURL: string;
  loading: any;
  baseUrl: any;
  httpOptions: {
headers:any; 
}; 
URL:string; 

constructor(public menu:MenuController,public http:HttpClient,private storage:Storage,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
console.log('Hello GeneralProvider Provider'); 
this.URL = 'http://api.iamgds.com/ota/'
this.baseUrl = 'http://immbt.mybustrip.in/mbt/'
this.transcationURL = 'http://tranapi.iamgds.com/'
}
disableMenu(flag){
  this.menu.enable(flag,'sidekamenu')
}
  // getResults(keyword:string) {
  //   return this.http.get(`${this.URL}CityList`,this.getheader)
  //     .map(
  //       result =>
  //       {
  //         return result['data'].json()
  //           .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
  //       });
  // }
startLoading(){
    this.loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: '<img src="assets/imgs/bus.gif" />'   
  });
  this.loading.present()
}
hideloading(){
 this.loading.dismiss()
}

showToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}  
set(key,value){
  this.storage.set(key,value)
}
get(key){
  return this.storage.get(key)
}
clear(){
  this.storage.clear()
}
remove(key){
  this.storage.remove(key)
}

formdata(data) {
  return Object.keys(data).map(function (k) {
  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
  }
getAuth() {
 var tmp = {"ClientId":50,"ClientSecret":"d66de12fa3473a93415b02494253f088"}
return this.http.post(`${this.URL}Auth`,this.formdata(tmp),{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
 
}

getheader(res){
   this.httpOptions =  {
    headers:new HttpHeaders( {
    'Content-Type':'application/json; charset=utf-8', 
    'access-Token':res
    })
  }
}

getbusList(data) {
return this.http.get(`${this.URL}Search?`+this.formdata(data) , this.httpOptions)
}

getcity() {
  return this.http.get(`${this.URL}CityList`,this.httpOptions)
}
getseatlist(data){
  return this.http.get(`${this.URL}Chart?`+this.formdata(data),this.httpOptions)
}
holdSeat(data){
  return this.http.post(`${this.transcationURL}ota/HoldSeats`,data,this.httpOptions)
}
}
