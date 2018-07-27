import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PassengerDetailsPage } from '../passenger-details/passenger-details';
import { GeneralProvider } from "../../providers/general/general";

/**
 * Generated class for the BoardingDropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-boarding-drop',
  templateUrl: 'boarding-drop.html',
})
export class BoardingDropPage {
  journeyInfo: any;
  information: any[]

  busId: any;
  date: any;
  fromCity: any;
  toCity: any;
  pickupCode: any;
  dropoffCode: any;
  SeatNo: any;
  ProvId: any;
  pickup: boolean = false;
  dropoff: boolean = false;
  busPoint: string;
  totalFare: any;
  baseFare: any;
  Pickups: any;
  DropOffs: any;
  pickupValue:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private general:GeneralProvider) {
    this.information = [{name:'pickup'},{name:'dropof'}]
    this.information[0].open = true
    this.information[1].open = true
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardingDropPage');
  }

  toggleSection(i) {
    console.log(this.information[i].open);
    
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }
 ionViewWillEnter(){
   this.DropOffs = this.navParams.get('dropoffs');
   this.Pickups = this.navParams.get('pickups');
   this.baseFare = this.navParams.get('basefare');
   this.totalFare = this.navParams.get('totalFare');
   this.ProvId = this.navParams.get('ProvId');
 
   this.general.get('journey').then(res=>{
     if(res != null){
      this.journeyInfo = res
     }else{
      this.journeyInfo = this.navParams.get('jouneyInfo')
      this.journeyInfo.PickUpID = ''
      this.journeyInfo.DropOffID = ''
     }
   })
   
   
   if(this.DropOffs.length != 0){
     this.dropoff = true;
   }
   if(this.Pickups.length != 0){

     this.Pickups.forEach(element => {
        element.flag = true
     });
    this.pickup = true;
  }
   console.log(this.journeyInfo)
  
 }
 
 pickUpStation(){
  this.busPoint = 'pickup'
 }
 
 dropOffStation(){
  this.busPoint = 'dropoff'
 }

 pickupSelect(pickupCode,i){
   this.toggleSection(i)
   this.pickupCode = pickupCode;
   this.journeyInfo.PickUpID = this.pickupCode;   
   this.submit()
 }

 dropoffSelect(dropoffCode,i){
this.toggleSection(i)
   
   this.dropoffCode = dropoffCode
   this.journeyInfo.DropOffID = this.dropoffCode; 
   this.submit()
 }
 
 submit(){
  if(this.journeyInfo.PickUpID != '' && this.journeyInfo.DropOffID != ""){
    console.log(this.journeyInfo);
  this.general.set('journey',this.journeyInfo);
  this.navCtrl.push(PassengerDetailsPage,{'journey':this.journeyInfo ,'selectedseat':this.navParams.get('selectedseat')})
  }else{
    return false
  }
 }
}
