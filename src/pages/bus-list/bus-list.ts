import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BusFilterPage } from "../bus-filter/bus-filter";
import moment from 'moment';

import { BusSeatPage } from "../bus-seat/bus-seat";
import { GeneralProvider } from "../../providers/general/general";
/**
 * Generated class for the BusListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus-list',
  templateUrl: 'bus-list.html',
})
export class BusListPage {
  mainList: any;

  query: any;
  busData: any;
  buslist: any;
newBusList = [];
  constructor(public navCtrl: NavController,  public modalCtrl: ModalController,public navParams: NavParams,private general:GeneralProvider) {
    console.log(this.navParams.get('data'));
    
    if(this.navParams.get('data') != undefined){
    this.busData = this.navParams.get('data')
    this.buslist = this.busData.Buses
    this.mainList = this.busData.Buses
    this.query = this.navParams.get('searchBus')
    console.log(this.busData);
    }
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusListPage');
    this.general.disableMenu(false)
  }

  openfilter(){
    // this.navCtrl.push(BusFilterPage,{'data':this.busData})
     let profileModal = this.modalCtrl.create(BusFilterPage,{'data':this.busData,'list':this.mainList});
    profileModal.onDidDismiss(data=>{
      // console.log(data); 
      if(data != undefined){
        console.log(data,'newbuslist')
        this.buslist = data
      }
    
    })
   profileModal.present();
  }
  
  Bookseat(busid,bus){
    console.log(busid);
    this.query.BusId = busid;
    this.general.set('selectedBus',bus)
    this.general.remove('journey')
    this.navCtrl.push(BusSeatPage,{'data':this.query})
  }
  changeFormate(data,formate){
    return moment(data).format(formate);
  }

 
}
