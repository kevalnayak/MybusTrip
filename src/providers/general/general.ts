import {HttpClient, HttpHeaders }from '@angular/common/http'; 
import {Injectable }from '@angular/core'; 
import { AutoCompleteService } from "ionic2-auto-complete";
import 'rxjs/add/operator/map';
import {Storage  } from "@ionic/storage";
import { ToastController, LoadingController, MenuController } from "ionic-angular";
import xml2js from 'xml2js';
/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI. */

@Injectable()
export class GeneralProvider {
  transcationURL: string;
  loading: any;
  baseUrl: any;
  httpOptions: {  headers:any;}; 
  URL:string; 
  httpOptions1: any;

constructor(public menu:MenuController,public http:HttpClient,private storage:Storage,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
console.log('Hello GeneralProvider Provider'); 
this.URL = 'http://api.iamgds.com/ota/'
this.baseUrl = 'http://immbt.mybustrip.in/mbt/'
this.transcationURL = 'http://tranapi.iamgds.com/';
// this.getAuth();
// this.getHeaders()
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
  console.log(res)
   this.httpOptions =  {
    headers:new HttpHeaders( {
    'Content-Type':'application/json; charset=utf-8', 
    'access-Token':res
    })
  }
}

getbusList(data) {
  this.httpOptions =  {
    headers:new HttpHeaders( {
    'Content-Type':'application/json; charset=utf-8', 
    'access-Token':"7FE4226040A19140416CF0AD69C54DE1|50-S|201808012356||FFFF"
    })
  }
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

getAuthorizarion(){
    this.http.post(`${this.baseUrl}Authenticate`,{
    "ClientID":1,
    "ClientSecret":"WnQu26jmXesvyKe"
    },this.httpOptions1).subscribe(res=>{
      this.httpOptions1.headers.append('Token',res)
    },err=>{
      this.showToast(err)
    })
}

 /** Get Request header for http request */
  getHeaders() {
    return new Promise((resolve, reject) => {
      // this.httpOptions1 = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }     
   
  let headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
       this.http.post(`${this.baseUrl}Authenticate`,this.formdata({
    "ClientID":1,
    "ClientSecret":"WnQu26jmXesvyKe"
    }),{headers:headers}).subscribe(res=>{
      // this.httpOptions1.headers.Token = res;
      // this.httpOptions1.headers.append('Token',res);
      headers.append('Token',res.toString())
    },err=>{
      this.showToast(err)
    })
    console.log(headers);
    
       resolve(this.httpOptions1);
    });
  }
Signup(data){
  // console.log(this.httpOptions1);
  // let headers = new HttpHeaders()
  // // headers.set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  // headers.set('Token','h0fPisXUzkwfFKek8V2JeotA6iVO8Sqgq98/wnFd54g1zQrQKvc7K0lguSgHUTI5');
  // console.log(headers);
//   const header = {
//     'Access-Control-Allow-Headers': '*',
// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// 'Access-Control-Allow-Methods': '*',
// 'Access-Control-Allow-Origin': '*',
// 'Token':'h0fPisXUzkwfFKek8V2JeotA6iVO8Sqgq98/wnFd54g1zQrQKvc7K0lguSgHUTI5'
// };
const headers = new HttpHeaders()
            .set("Content-type", "application/json").set('Token',"WYokYq8luxD3GD4PzUPbLeB4tDxBFa49ucrq0zBHUrcw+ypQU/m23rbXpyaWyGV6");
  // const httpOptions = new HttpHeaders(headers);
  return this.http.get('http://immbt.mybustrip.in/mbt/Login?userId=9901299012&Password=123',{headers:headers})
  // return this.http.post(`${this.baseUrl}Register`,this.formdata(data),this.httpOptions1)
}


getCityPair(){
  const data = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetAvailableRoutes xmlns="http://apimybustrip.itspl.net/">
        <FromID>70</FromID>	
        <ToID>1</ToID>
        <JourneyDate>23-08-2018</JourneyDate>
        <VerifyCall>84cab3fbae3946569be9103d4a87ffde37636556810302828645</VerifyCall>
      </GetAvailableRoutes>
    </soap:Body>
  </soap:Envelope>`;
  let header =  {
    headers:new HttpHeaders({
    'Content-Type':'text/xml; charset=utf-8',
    'Content-Length':'length'
  })
}
  return this.http.post(`http://apimybustrip.itspl.net/ITSGateway.asmx?op=GetAvailableRoutes`,data,header)
}

getcompany(){

  const data = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetCompanyList xmlns="http://apimybustrip.itspl.net/">
      <VerifyCall>84cab3fbae3946569be9103d4a87ffde37636556810302828645</VerifyCall>
    </GetCompanyList>
  </soap:Body>
</soap:Envelope>`;

let header =  {
    headers:new HttpHeaders({
    'Content-Type':'text/xml; charset=utf-8',
    'Content-Length':'length'
  })
}
   this.http.post(`http://apimybustrip.itspl.net/ITSGateway.asmx?op=GetCompanyList`,data,header).subscribe(res=>{
     console.log(res);     
   },err=>{
    //  console.log(err);
    let data = err['error'].text
    // console.log(data);
    if(data  != undefined){
     var arr    = [];    
      return new Promise(resolve =>
      {
         var k,
            
             parser = new xml2js.Parser(
             {
                trim: true,
                explicitArray: true
             });
             
         parser.parseString(data, function (err, result)
         { 
            var obj = result['soap:Envelope']['soap:Body'][0].GetCompanyListResponse[0].GetCompanyListResult[0]['diffgr:diffgram'][0]['DocumentElement'][0].ITSCompanyList            
            console.log(obj);
            
            for(k in obj)
            {                           
               var item = obj[k];
               arr.push({
                  id           : item.CompanyID[0],
                  title        : item.CompanyName[0]                  
               });
            }
            console.log(arr[0].title)   
           
            
         });
      });
      
  
  
    }
 })
}
}
