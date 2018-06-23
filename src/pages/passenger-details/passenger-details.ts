import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { GeneralProvider } from "../../providers/general/general";

/**
 * Generated class for the PassengerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger-details',
  templateUrl: 'passenger-details.html',
})
export class PassengerDetailsPage {
  NameValid: boolean = true;
  param: any
Emailvalid:boolean =true
  constructor(public navCtrl: NavController,private _FB: FormBuilder, public navParams: NavParams,private general:GeneralProvider) {
    console.log(this.navParams.data);
    this.param = this.navParams.get('journey')
    this.param.Passengers = this.navParams.get('selectedseat')
    this.param.ContactInfo = {CustomerName:'test',Email:'',Phone:'',Mobile:''}
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerDetailsPage');
    this.general.disableMenu(false)
  }
  match(data){
  
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(data).toLowerCase());

  }
  
  print(){  
    for(let one of this.param.Passengers){
      console.log(one);
      
      if(one.Name == ''){
        // this.NameValid = false
        this.general.showToast('Please enter Name')
        break;
        // return false
      }
      if(one.Age == ''){
        this.general.showToast('Please enter Age')
        break;
      }else{
        one.Age = parseInt(one.Age)
      }
    }
    // this.param.Passengers.forEach(element => {
    //   element.Age = parseInt(element.Age)
    //   if(element.Name == ''){
    //     // this.NameValid = false
    //     this.general.showToast('Please enter Name')
    //     return false
    //   }
    // });    
     if(this.match(this.param.ContactInfo.Email)== false){
      // this.Emailvalid = true
      this.general.showToast('Please enter Valid Email')
      return false
     }
    
    this.general.holdSeat(this.param).subscribe(res=>{
     
      if(res['success'] == true){
         console.log(res);
      }else{
        this.general.showToast(res['Error'].Msg)
      }
      
    },err=>{
      
    })
  }
  
}
