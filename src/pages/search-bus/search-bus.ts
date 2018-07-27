import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams }from 'ionic-angular'; 
import {GeneralProvider }from "../../providers/general/general"; 
import {BusListPage }from "../bus-list/bus-list"; 
import xml2js from 'xml2js';
import { XmlApiProvider } from "../../providers/xml-api";
// import { DbService } from "../../providers/db-service/db-service";

/**
 * Generated class for the SearchBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation. */

@IonicPage()
@Component( {
  selector:'page-search-bus', 
  templateUrl:'search-bus.html', 
})
export class SearchBusPage {
  JourneyDate:any; 
  CityList:any = []


searchBus =  {FromCityId:4292, ToCityId:4562, JourneyDate:''}; 
  constructor(public navCtrl:NavController, public navParams:NavParams, private general:GeneralProvider,public xmlservice:XmlApiProvider) {
  }

  ionViewWillEnter() {
    console.log('res'); 
     this.general.disableMenu(true)
  }
  ionViewDidLoad() {
    // this.general.disableMenu(true)
    //e.log('ionViewDidLoad SearchBusPage');    
    // this.general.getAuth().subscribe(res=>{
    //   this.general.getheader(res)
    //   this.general.getcity().subscribe(res=>{
    //     console.log(res);        
    //     // this.CityList = res['data']
    //   })
    // })
    
    // this.db.loadBusForOffline()
    // this.db.getbus('banglore')
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

  Getbuslist() {
    this.general.startLoading()
    this.general.clear()
    this.searchBus.JourneyDate = this.JourneyDate 
    this.general.getbusList(this.searchBus).subscribe((res:any)=>{
      
      if(res['data'] == undefined){
        res.data = {}
        res.data.Buses = []
      }
      // second Api 
        this.general.getCityPair().subscribe(res =>  {
          console.log(res); 
          this.general.hideloading()
        }, err =>  {
          // console.log(err)
          let data = err['error'].text
          this.general.hideloading()
          if(data != undefined)
          this.parseXML(data).then((data:any)=>{            
            // this.arrang(data)
              if(data != 'No data'){
                for(let i=0;i<data.length;i++){
                      res.data.Buses.push(data[i].reduce(function(newarr, currentobj){
                          for(let key in currentobj){
                            newarr[key] = currentobj[key]                                             
                          }
                          return newarr
                        },{})
                      )
                } 
                console.log(res);
                // for(let i=0;i<res.data.Buses.length;i++){
                // if(res.data.Buses[i].CompanyID != undefined){
                // this.xmlservice.GetAmenities(res.data.Buses[i].CompanyID).subscribe(res=>{
                // console.log(res,"Ameties");           
                // },err=>{
                //   console.log(err);
                //   let text= err['error'].text
                //   if(text != ""){
                //     this.parseamities(text)
                //   }
                  
                // })
                // break;
                // }
                // }
              
                if(res['success'] == true || res.data.length != 0){  
                  /**
                   * for ITS Api parse pickup and drop point
                   */
                  res.data.Buses.forEach(e=>{
                    if(e.BoardingPoints != "" && e.BoardingPoints != undefined){
                        let pick = []
                          let tmp = e.BoardingPoints.split('#')
                          for(let i=0 ; i<tmp.length;i++){
                          let no = tmp[i].split('|')
                          pick.push({'PickupCode':Math.floor(Math.random() * 100) + 1,PickupName:no[1]})
                          }         
                         e.Pickups = pick
                    }
                    if( e.DroppingPoints != "" && e.DroppingPoints != undefined){
                       let pick = []
                          let tmp = e.DroppingPoints.split('#')
                          for(let i=0 ; i<tmp.length;i++){
                          let no = tmp[i].split('|')
                          pick.push({'DropoffCode':Math.floor(Math.random() * 100) + 1,DropoffName:no[1]})
                          }         
                         e.Dropoffs = pick
                    }else if(e.DroppingPoints == ""){
                      e.Dropoffs = []
                    }
                  })   
                  console.log(res.data);
                     
                this.navCtrl.push(BusListPage,{'data':res['data'],'searchBus':this.searchBus})
                }else{
                  console.log('here');                  
                  this.general.showToast("No bus available for selected date");
                  }
              }else{
                if(res['success'] == true && res['data'].Buses.length != 0){
                this.navCtrl.push(BusListPage,{'data':res['data'],'searchBus':this.searchBus})
                }else{
                this.general.showToast("No bus available for selected date");

                }
              }
          })
        })

      // End
      // console.log(newdata);
      
      // if(res['success'] == true && res['data'].Buses.length != 0){
      //   this.navCtrl.push(BusListPage,{'data':res['data'],'searchBus':this.searchBus})
      // }else{
      //   this.general.showToast("No bus available for selected date");
        
      // }
      
    })

    
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
            var values = result['soap:Envelope']['soap:Body'][0].GetAvailableRoutesResponse[0].GetAvailableRoutesResult[0]['diffgr:diffgram'][0]['DocumentElement']
            
            if(values != undefined){
            values = values [0]['AllRouteBusLists']
              console.log(values);
              
              let newdata = []
              for(k in values)
              {               
                let one = values[k]              
                for(data in one){
                
                  let key =data               
                  
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

  parseamities(data){
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
            // var check = result['soap:Envelope']['soap:Body'][0].GetAvailableRoutesResponse[0].GetAvailableRoutesResult[0]['xs:schema'][0]['xs:element'][0]['xs:complexType'][0]['xs:choice'][0]
            // ['xs:element'][0]['xs:complexType']
            // if(check[0] != '')
            // obj = [0]['xs:sequence'][0]['xs:element'];
            var values = result['soap:Envelope']['soap:Body'][0].GetAmenitiesResponse[0]['GetAmenitiesResult'][0]['diffgr:diffgram'][0]['DocumentElement'][0]['GetAmenities']
            console.log(values);
            
         });
      });
  }
}
