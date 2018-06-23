import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GeneralProvider } from "../../providers/general/general";

/**
 * Generated class for the FilterAmentitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-amentities',
  templateUrl: 'filter-amentities.html',
})
export class FilterAmentitiesPage {
  Amity: any;
  tmp: any[];
  attributes: Array<any> = [];
  AllAmenities: any = [];

  constructor(public navCtrl: NavController,public general:GeneralProvider,public viewCtrl: ViewController, public navParams: NavParams) {
   
    
  }

  ionViewWillEnter() {
    //e.log('ionViewDidLoad FilterAmentitiesPage');
    this.getEmity()
  }
  getEmity(){
    this.attributes = []
      this.general.get('Allamity').then(res=>{
      if(res != null){
        this.AllAmenities = res
        this.Amity = res
       this.general.get('amity').then(res=>{    
          if(res != null){
            this.attributes = res;

            for(let t=0 ; t<res.length;t++){ 
              //e.log(res[t]);              
             this.AllAmenities[res[t].index].bool = res[t].bool          
              // //e.log(this.AllAmenities);
            }
            
          } 
       })
      }
    })
  }
  done(){
    if(this.attributes.length != 0){
     this.general.set('amity',this.attributes)
    }
    else{
      this.general.remove('amity')
    }
    this.viewCtrl.dismiss({'data':this.attributes})
  }
  close(){
    this.viewCtrl.dismiss()
  }


  addAttribute(checked, value,index) {
    // //e.log(checked,value);
    //e.log(value)
    if (checked.value) {
      this.attributes.push({'value':value,'bool':true,'index':index});
    }
    else if(!checked.value) {
      let checkAttr: any;
      this.tmp = this.attributes
      this.attributes = []
      // //e.log(tmp,this.attributes);
      
      for(let i = 0 ;i<this.tmp.length ; i++){
        if(this.tmp[i].index != index)
        {          
          //e.log(this.tmp[i]);          
         this.attributes.push(this.tmp[i])
        }
      }
           
    }
    //e.log(this.attributes)
   
    // this.storeForm.controls.vAttributes.setValue(this.attributes);
  }
  onInput($event){
  this.AllAmenities = []
    //e.log($event.target.value,'value'); 

   
     if($event.target.value != undefined){
        var regex = new RegExp('^'+$event.target.value, "i");
        this.Amity.forEach(element => {
          // //e.log(element)
          if (element.value.match(regex)) {
            //e.log(element);
            
            this.AllAmenities.push(element);
          }
        });
     }else{
        this.AllAmenities = this.Amity;
        //e.log(this.attributes);
        
         for(let t=0 ; t<this.attributes.length;t++){ 
             
             this.AllAmenities[this.attributes[t].index].bool = this.attributes[t].bool          
              // //e.log(this.AllAmenities);
            }
     }
  
    
  }
  onCancel($event){
    //e.log($event);
    
  }
}
