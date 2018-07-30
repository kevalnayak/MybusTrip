import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams, ModalController, ViewController }from 'ionic-angular'; 
import {FilterAmentitiesPage }from "../filter-amentities/filter-amentities"; 
import {BusListPage }from "../bus-list/bus-list"; 
import {GeneralProvider }from "../../providers/general/general"; 

/**
 * Generated class for the BusFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation. */

@IonicPage()
@Component( {
  selector:'page-bus-filter', 
  templateUrl:'bus-filter.html', 
})
export class BusFilterPage {
  Sleeper: boolean;
  AC: boolean;
  newbuslist: any;

  filter_busType:any = [];
  filter_travel:any = []; 
  Travelname:any = []; 
  filter_drop:any = []; 
  filter_pickup:any = []; 
  filter_Amity:any = []; 
  AllAmenities:any = []; 
  Dropoffs:any = []; 
  Pickups:any = []; 
  busData:any;   
  buslist = []; 

  filterlist = ['filter_busType','filter_drop','filter_pickup','filter_travel','amity']
  constructor(public navCtrl:NavController, private general:GeneralProvider, public modalCtrl:ModalController, public viewCtrl:ViewController, public navParams:NavParams) {
    
    /**
     * get data from localstorage
     */
    this.general.get('filter_busType').then(res=>{
      if(res != null){
        res.forEach(e=>{
          //e.log(e);
          if(e == 'AC')
          this.AC = true
          if(e == 'Sleeper')
          this.Sleeper = true
        })
        this.filter_busType = res
      }
    })

    this.general.get('filter_drop').then(res=>{
      if(res != null){
        this.filter_drop = res
      }
    })
    
    this.general.get('filter_pickup').then(res=>{
      if(res != null){
        this.filter_pickup = res
      }
    })

    this.general.get('filter_travel').then(res=>{
      if(res != null){
        this.filter_travel = res
      }
    })
    /**
     * End local data
     */
  }

  ionViewDidLoad() {
    //.log('ionViewDidLoad BusFilterPage'); 
    this.busData = this.navParams.get('data')
    this.buslist = this.navParams.get('list')
    this.general.set('buslist', this.buslist)
     if (this.busData != '') {       
      // this.AllAmenities = this.busData.AllAmenities
      if( this.busData.AllAmenities != undefined){
      this.busData.AllAmenities.forEach((element,i) =>  {
        this.AllAmenities.push( {
          'value':element, 
          'bool':false,
          'index':i
        })
      })
      }      
       for(let i = 0;i < this.busData.Buses.length; i++){
        if(this.Travelname.indexOf(this.busData.Buses[i].CompanyName) == -1){
            this.Travelname.push(this.busData.Buses[i].CompanyName)
        }
    }  
      this.busData.Buses.forEach(element =>  {
        // let tmp = this.Travelname.filter(x => x.CompanyName != element.CompanyName);         
        // if (tmp.length == 0)
        // this.Travelname.push(element.CompanyName) 
        // console.log(element,tmp);
      
        if(element.Pickups !=undefined) {      
        element.Pickups.forEach(element =>  {
          let t = this.Pickups.filter(x => x.PickupCode == element.PickupCode)
          if (t == '')
          this.Pickups.push(element)
        }); 
        }
        if(element.Dropoffs != undefined){
          element.Dropoffs.forEach((element, i) =>  {
            // //.log(i);
            let t = this.Dropoffs.filter(x => x.DropoffCode == element.DropoffCode)
            if (t == '')
            this.Dropoffs.push(element)
        }); 
        }        
          this.general.set('Allamity', this.AllAmenities)        
        
      });       
     
    }
    // console.log(this.Travelname);
   
    
    
  }


applyFilter($event , flag){
  if (flag == 'pickup') {
      this.filter_pickup = $event
      if(this.filter_pickup.length != 0){
        this.general.set('filter_pickup',this.filter_pickup)
      }
      else if(this.filter_pickup.length == 0){
        this.general.remove('filter_pickup')
      }
  }else if(flag == 'drop'){
    this.filter_drop = $event
    
    if(this.filter_drop.length != 0){
      this.general.set('filter_drop',this.filter_drop)
    }
    else if(this.filter_drop.length == 0){
      this.general.remove('filter_drop')
    }
  }else if(flag == 'travel'){
    this.filter_travel = $event
    
    if(this.filter_travel.length != 0){
      this.general.set('filter_travel',this.filter_travel)
    }
    else if(this.filter_travel.length == 0){
      this.general.remove('filter_travel')
    }
  }
  else if(flag == 'amity'){
    this.filter_Amity = $event
  }else{
    // if($event.value)
    //e.log(flag);
    if($event.value)
    this.filter_busType.push(flag)
    else{
      let filter;
       filter = this.filter_busType.indexOf(flag)
       this.filter_busType.splice(filter,1)
       //e.log(this.filter_busType);
       
    }
    if(this.filter_busType.length != 0){
      this.general.set('filter_busType',this.filter_busType)
    }
    if(this.filter_busType.length == 0){
      this.general.remove('filter_busType')
    }    
  }

// First get the fresh bus list from local storage
  this.general.get('buslist').then(res=>{
    if(res != null) {
      this.newbuslist = res
      if(this.filter_busType.length != 0){
        
      }
      if(this.filter_travel.length != 0) {
        this.newbuslist = this.applyTravel(this.newbuslist,this.filter_travel);
      }
      if(this.filter_pickup.length != 0) {
        this.newbuslist = this.applypickup(this.newbuslist,this.filter_pickup);
      }
      if(this.filter_drop.length != 0) {
        //.log('call to drop');        
        this.newbuslist = this.applyDrop(this.newbuslist,this.filter_drop);
      }      
      if(this.filter_Amity.length != 0) {
        this.newbuslist = this.applyAmity(this.newbuslist,this.filter_Amity);
      }if(this.filter_busType.length != 0){
        this.newbuslist = this.applybusType(this.newbuslist,this.filter_busType);
      }
      //e.log("Filterd data: ",this.newbuslist);
      
    } else {
      //.log("No data avaialble please refresh the page.");
    }
  });
  
}

applybusType(busList,filter){
  let newbuslist = []
      console.log(filter);
      
    for (let j = 0; j < busList.length; j++) {
      let amityFlagMain = 1; 
      for (let i = 0; i < filter.length; i++) {
        let amityFlag = 0; 
        // for (let k = 0; k < busList[j].Pickups.length; k++) {
            // if (filter[i] == busList[j].BusType.IsAC) {
            //     amityFlag = 1;                  
            // }

            if (filter[i] == 'Sleeper') {
              if('SEATER_SLEEPER' == busList[j].BusType.Seating)
                amityFlag = 1;       
              if('SEATER_SEMI_SLEEPER' == busList[j].BusType.Seating) 
                amityFlag = 1;          
            }else if(filter[i] == 'AC'){
              if('AC' == busList[j].type){
                amityFlag = 1
              }
            }
          // }
          if (amityFlag == 0) {
              amityFlagMain = 0; 
              break; 
          }
      }
      if (amityFlagMain == 1) {
        newbuslist.push(busList[j]); 
      }
    }

    return newbuslist; 
}
applypickup(busList, filter){
    let newbuslist = []
    
    for (let j = 0; j < busList.length; j++) {
      let amityFlagMain = 1; 
      for (let i = 0; i < filter.length; i++) {
        let amityFlag = 0; 
        for (let k = 0; k < busList[j].Pickups.length; k++) {
            if (filter[i] == busList[j].Pickups[k].PickupCode) {
                amityFlag = 1; 
                break; 
            }
          }
          if (amityFlag == 0) {
              amityFlagMain = 0; 
              break; 
          }
      }
      if (amityFlagMain == 1) {
        newbuslist.push(busList[j]); 
      }
    }

    return newbuslist; 
}

applyDrop(busList, filter){
    let newbuslist = []
    console.log(busList,filter);
    
    for (let j = 0; j < busList.length; j++) {
      let amityFlagMain = 1; 
      for (let i = 0; i < filter.length; i++) {
        let amityFlag = 0; 
        for (let k = 0; k < busList[j].Dropoffs.length; k++) {
            if (filter[i] == busList[j].Dropoffs[k].DropoffCode) {
                amityFlag = 1; 
                break; 
            }
          }
          if (amityFlag == 0) {
              amityFlagMain = 0; 
              break; 
          }
      }
      if (amityFlagMain == 1) {
        newbuslist.push(busList[j]); 
      }
    }
    
    //.log(newbuslist, 'newbuslist Drop'); 
    return newbuslist;
}


applyTravel(busList, filter){
  console.log(busList,filter);
  
    let newbuslist = []

    for (let j = 0; j < busList.length; j++) {
      let amityFlagMain = 1; 
      for (let i = 0; i < filter.length; i++) {
        let amityFlag = 0; 
        // for (let k = 0; k < busList[j].Dropoffs.length; k++) {
            if (filter[i] == busList[j].CompanyName) {
                amityFlag = 1; 
                break; 
            }
          // }
          if (amityFlag == 0) {
              amityFlagMain = 0; 
              break; 
          }
      }
      if (amityFlagMain == 1) {
        newbuslist.push(busList[j]); 
      }
    }
    
    return newbuslist;
}

applyAmity(busList,filter){  
   let newbuslist = []
    for (let j = 0; j < busList.length; j++) {
      let amityFlagMain = 1; 
      for (let i = 0; i < filter.length; i++) {
        let amityFlag = 0; 
        if(busList[j].Amenities != undefined)
        for (let k = 0; k < busList[j].Amenities.length; k++) {
            if (filter[i].value == busList[j].Amenities[k]) {
                amityFlag = 1; 
                break; 
            }
          }
          if (amityFlag == 0) {
              amityFlagMain = 0; 
              break; 
          }
      }
      if (amityFlagMain == 1) {
        newbuslist.push(busList[j]); 
      }
    }
    
    //.log(newbuslist, 'newbuslist Amity'); 
    return newbuslist;

}



 openmodal() {
    //.log('openmodal', this.AllAmenities); 
    
    let profileModal = this.modalCtrl.create(FilterAmentitiesPage); 
    profileModal.onDidDismiss(data =>  {
      //.log(data); 
      if (data != undefined)
      this.applyFilter(data.data,'amity')
      // this.filter_Amity = data.data 
    })
   profileModal.present(); 
  }

  Apply() {
    this.viewCtrl.dismiss(this.newbuslist )
  }

  clear(){
    for(let i=0;i<this.filterlist.length;i++){
      this.general.remove(this.filterlist[i]);
    }
     this.viewCtrl.dismiss(this.buslist )
       
  }
}
