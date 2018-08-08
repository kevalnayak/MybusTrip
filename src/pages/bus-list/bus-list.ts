import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BusFilterPage } from "../bus-filter/bus-filter";
import moment from 'moment';
import xml2js from 'xml2js';
import { BusSeatPage } from "../bus-seat/bus-seat";
import { GeneralProvider } from "../../providers/general/general";
import { XmlApiProvider } from "../../providers/xml-api";
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
  constructor(public navCtrl: NavController, public xmlservice:XmlApiProvider, public modalCtrl: ModalController,public navParams: NavParams,private general:GeneralProvider) {
    
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
      if(data != undefined){
        console.log(data,'newbuslist')
        this.buslist = data
      }
    
    })
   profileModal.present();
  }
  
  Bookseat(bus){
    // console.log(bus);
    if(bus.ReferenceNumber == undefined){
    this.query.BusId = bus.BusStatus.RouteBusId;
    this.general.set('selectedBus',bus)
    this.general.remove('journey')
    this.navCtrl.push(BusSeatPage,{'data':this.query})
  }else{
    // this.general.showToast("Under Process")
    this.xmlservice.GetSeatArrangementDetails(bus.ReferenceNumber).subscribe(res=>{
      console.log(res);      
    },err=>{
      let result = err['error'].text
      this.parseXML(result).then((res:any)=>{
        if(res != 'No data'){
          let lower = [];
          let upper = [];
          var maxRow = 0;
          var maxCol = 0;

          for(let i=0;i< res.length;i++){
           
               let tmpdata =   res[i].reduce(function(newarr, currentobj){
                    for(let key in currentobj){
                      newarr[key] = currentobj[key]                                             
                    }
                    return newarr
                  },{})
                
                if(tmpdata.UpLowBerth == 'LB'){
                  lower.push(tmpdata)
                }
                if(tmpdata.UpLowBerth == 'UB'){
                  upper.push(tmpdata)
                }
                if(maxRow < parseInt(tmpdata.Row)){
                  maxRow = tmpdata.Row
                }
                if(maxCol < parseInt(tmpdata.Column)){
                  maxCol =  tmpdata.Column
                }
          }
       
        // let tmpdata = lower
        // lower = []
        // let data = tmpdata.reduce((r, e) => {
                      
        //   let group = e.Row;
        //   if(!r[group]) r[group] = {group, children: [e]}
        //   else r[group].children.push(e);
        //   return r;
        //   }, {})
        //   for(let one in data){
        //   let child = data[one].children
        //   child.sort(function (a, b){
        //   return a.Column - b.Column;
        //   });
        //   lower[one] = child
        //   // data[one].children = [];
        //   // data[one].children = child
        // }
        // var myNewArray = lower.reduce(function(prev, curr) {
        // return prev.concat(curr);
        // });
        // console.log(myNewArray)
        
          // return false
          let param = {
            lower:lower,
            upper:upper,
             maxCol : maxCol,
             maxRow : maxRow
          }
          this.general.set('selectedBus',bus)
          this.general.remove('journey')
          this.navCtrl.push(BusSeatPage,{'itsdata':param})
        }
      })

    })
  }
  }
  changeFormate(data,formate){
    return moment(data).format(formate);
  }

   parseXML(data){
     var arr    = []
      let tmp = [];
      // console.log(tmp);
           
      return new Promise((resolve,reject) =>
      {
         var k,
        parser = new xml2js.Parser(
        {
          trim: true,
          explicitArray: true
        });
         parser.parseString(data, function (err, result)
         { 
            var obj
            var values = result['soap:Envelope']['soap:Body'][0].GetSeatArrangementDetailsResponse[0].GetSeatArrangementDetailsResult[0]['diffgr:diffgram'][0]['DocumentElement']         

            if(values != undefined){
            values = values [0].ITSSeatDetails  
              let newdata = []
              for(k in values)
              {               
                let one = values[k]              
                for(data in one){
                
                  let key = data               
                  
                    arr.push({
                      [key] : one[data][0]
                    })
                  
                }  
                tmp.push(arr);             
                arr = []      
              }
              resolve(tmp)
            }else{
              resolve("No data")
            }
         });
      });
  }
}
