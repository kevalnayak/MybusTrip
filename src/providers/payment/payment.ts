import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedProvider } from '../shared/shared';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  paymentUrl: string;
  constructor(public http: HttpClient,private shared:SharedProvider) {
    console.log('Hello PaymentProvider Provider');
    this.paymentUrl = 'http://tranapi.iamgds.com'
  }
     
  HoldTicket(data){
    const params = this.shared.transformRequest(data);
    console.log(params)
    const httpOptions =  { 
      headers:{
       'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'access-token':'12B85B1DAE67D4708172243FCFB477C2|50-S|201806260812||FFFF'
        
     } 
    
   }
    return this.http.post(`${this.paymentUrl}/ota/HoldSeats`,params,httpOptions)
  }
}
