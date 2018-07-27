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
  seatStatus: any;
  NameValid: boolean = true;
  param: any
Emailvalid:boolean =true
bookingForm:any;
  constructor(public navCtrl: NavController,private _FB: FormBuilder, public navParams: NavParams,private general:GeneralProvider) {
    console.log(this.navParams.data);
    this.param = this.navParams.get('journey')
    this.seatStatus = this.navParams.get('seatStatus');
    this.param.Passengers = this.navParams.get('selectedseat')
    this.param.ContactInfo = {CustomerName:'',Email:'',Phone:'',Mobile:''}
    console.log(this.seatStatus)
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerDetailsPage');
    this.general.disableMenu(false)
    
  }
  initForm(){
    this.bookingForm = this._FB.group({
      name: ['',Validators.compose([Validators.required])],
      age : ['',Validators.compose([Validators.required])],
      gender:['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      mobile:['',Validators.compose([Validators.required])]
    })
  }
  // match(data){
  
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //    return re.test(String(data).toLowerCase());

  // }
  
  
  BookNow(){  
    if(this.bookingForm.valid){
      this.general.startLoading();
     for(let one of this.param.Passengers){
      console.log(one);     
        one.Name = this.bookingForm.value.name;
        one.Age = parseInt(this.bookingForm.value.age);
        one.Gender = this.bookingForm.value.gender;        
     }
     this.param.ContactInfo.CustomerName = this.bookingForm.value.name
     this.param.ContactInfo.Email = this.bookingForm.value.email
     this.param.ContactInfo.Phone = this.bookingForm.value.mobile
     this.param.ContactInfo.Mobile = this.bookingForm.value.mobile
      this.general.holdSeat(this.param).subscribe(res=>{
     
      if(res['success'] == true){
         console.log(res);
         this.general.hideloading();
         this.general.showToast("HoldId = "+res['data'].HoldId)
      }else{
        this.general.hideloading();
        this.general.showToast(res['Error'].Msg)
      }
      
    },err=>{
      
    })
    }
    
    
   
  }
  
}
