import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from "../../providers/general/general";
import { BusListPage } from "../bus-list/bus-list";
import { DbService } from "../../providers/db-service/db-service";

/**
 * Generated class for the SearchBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-bus',
  templateUrl: 'search-bus.html',
})
export class SearchBusPage {
  JourneyDate: any;
  CityList: any = []


searchBus = { FromCityId: 4292, ToCityId: 4562,JourneyDate:'' };
  constructor(public navCtrl: NavController, public navParams: NavParams,private general:GeneralProvider,public db:DbService) {
  }

  ionViewDidLoad() {
    this.general.disableMenu(true)
    //e.log('ionViewDidLoad SearchBusPage');    
    // this.general.getAuth().subscribe(res=>{
    //   this.general.getheader(res)
    //   this.general.getcity().subscribe(res=>{
    //     console.log(res);        
    //     // this.CityList = res['data']
    //   })
    // })
    
    this.db.loadBusForOffline()
    this.db.getbus('banglore')
  }

  // onInput($event){
  //   // //e.log(this.CityList);
    
  //   // //e.log($event.target.value,'value');
    
  //   let tmp = this.CityList
  //   this.CityList = []
  //    var regex = new RegExp($event.target.value, "g");
  //       tmp.forEach(element => {
  //         // //e.log(element)
  //         if (element.City.match(regex)) {
  //           //e.log(element);
            
  //           this.CityList.push(element);
  //         }
  //       });
  // }

  Getbuslist(){
    this.general.startLoading()
    this.general.clear()
    this.searchBus.JourneyDate = this.JourneyDate 
    this.general.getbusList(this.searchBus).subscribe(res=>{
      this.general.hideloading()
      if(res['success'] == true && res['data'].Buses.length != 0){
        this.navCtrl.push(BusListPage,{'data':res['data'],'searchBus':this.searchBus})
      }else{
        this.general.showToast("No bus available for selected date");
        
      }
      
    })
  }

}
