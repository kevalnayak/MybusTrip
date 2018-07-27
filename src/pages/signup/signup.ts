import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { GeneralProvider } from "../../providers/general/general";
// import { Http,Headers } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
signupForm:any;
  constructor(public navCtrl: NavController,public navParams: NavParams,private fb:FormBuilder,private general:GeneralProvider) {
    this.initform()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  initform(){
    this.signupForm = this.fb.group({
      UserName:['',Validators.compose([Validators.required])],
      Email:['',Validators.compose([Validators.required])],
      MobileNo:['',Validators.compose([Validators.required])],
      Password:['',Validators.compose([Validators.required])],
      cpwd:['',Validators.compose([Validators.required,this.equalto('Password')])]
    })
  }


  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

    let input = control.value;

    let isValid=control.root.value[field_name]==input
    if(!isValid) 
    return { 'equalTo': {isValid} }
    else 
    return null;
    };
  }
//   signup(){
//     let id = 9901299012
//     let pas = 123
//     let headers = new Headers()  
//   headers.append('Content-Type', 'application/json');
// 			headers.append('Token', 'nIEgjG3GTAtXj1jsTwyG79djLwKkWPw5QN3AmN18arljqlEl191WHVK9JOK1xBaO');

// 			this.http.get('http://immbt.mybustrip.in/mbt/Login?userId=' + id + '&Password='+ pas , { headers: headers })
// 				.subscribe((res:any) => {
// 					console.log(res.json());
// 					alert(res.json());
// 				}, (err) => {
// 					// console.log(resulr);
// 					alert("Error");
// 				});
		
// }
  signup(){
    console.log(this.signupForm.value);
    // if(this.signupForm.valid){
      // this.general.getHeaders()
       this.general.Signup(this.signupForm.value).subscribe(res=>{
         console.log(res);
         
       })
      //  subscribe(res=>{
      //   console.log(res);
      //   this.general.showToast('success')
      // },err=>{
      //   this.general.showToast(err)
      // }) 
      
    // }
  }
}
