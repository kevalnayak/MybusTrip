import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BoardingDropPage } from '../boarding-drop/boarding-drop';
import { LOCALE_DATA } from '@angular/common/src/i18n/locale_data';
import { GeneralProvider } from "../../providers/general/general";

/**
 * Generated class for the BusSeatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus-seat',
  templateUrl: 'bus-seat.html',
})
export class BusSeatPage {
  seatStatus: any;
  lowerseatType: any;
  uperseatType: any;
  actualRow: number;
  MaxRows: any;
  MaxCols: any;
  remainseat = [];

  seatType: any;
  lastSeat: boolean;
  totalIntgerSeats: number;
  Seats: any;
  date: string;
  busId: number;
  fromCity: number;
  toCity: number;
  ProvId: any;
  input: any[];
  Columns: number;
  Rows:number
  MaxLowerRow: any;
  MaxUperRow: any;
  TotalSeats: any;
  Pickups: any;
  DropOffs: any;
  isUper: boolean;
  noData: boolean;
  baseFare: any;
  totalTax: any;
  totalFare: any;
  selectedSeatFare: any;
  selectedSeatArray: any;
  selectedSeat: any;
  seatTotalFare: any;
  fare: any;
  status: any;
  SeatsStatus: any;
  layoutname: any;
  uper: any;
  lower: any;
  busArea: string;
  chartData: any;


  lowerseat = [];
  uperseat = []
  mainseatData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private shared: GeneralProvider) {
    this.busArea = 'lower';
    this.selectedSeatArray = [];
    this.selectedSeatFare = [];
    this.seatTotalFare = [];
    this.seatType = [];
    this.isUper = false;
    this.selectedSeat = [];
    this.seatStatus = [];
  }
  
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad BusSeatPage');
  // }

  ionViewDidLoad() {
    // this.shared.disableMenu();
    this.shared.startLoading();
    // console.log(this.navParams.get('data'));
    this.shared.getseatlist(this.navParams.get('data')).subscribe(data => {
      this.shared.hideloading();
      console.log(data['data']);
      if (data['data']) {
      this.mainseatData = data['data'].ChartLayout.Layout
      //  Testing logic
      this.MaxRows = data['data'].ChartLayout.Info.Lower.MaxRows;
      this.MaxCols = data['data'].ChartLayout.Info.Lower.MaxCols;
      if (data['data'].ChartLayout.Layout.Upper != undefined) {
        this.actualRow = Math.round(this.MaxRows / 2)
      } else {
        this.actualRow = this.MaxRows
      }
      if(data['data'].ChartLayout.Layout.Lower.length != 0)
      {
              for(let i=0;i<this.MaxRows;i++){
                this.lowerseat.push([0]);
                for(let j=0;j<this.MaxCols;j++){
                  this.lowerseat[i][j] = -1;          
                }
              }


              for(let i=0;i<data['data'].ChartLayout.Layout.Lower.length;i++){
                var row = data['data'].ChartLayout.Layout.Lower[i][1];
                var col = data['data'].ChartLayout.Layout.Lower[i][2];
                var value =  data['data'].ChartLayout.Layout.Lower[i][0];
                this.lowerseatType = data['data'].ChartLayout.Layout.Lower[i][5];
                console.log(this.lowerseatType);
                // const rowFromType = this.lowerseatType.map(element=>{
                //   if(element == 2){
                //     row = row / 2;
                //   }
                // })
                if (this.lowerseatType == 2) {
                  row = row / 2;
                }
                this.lowerseat[row][col] = value;
              }
      }  
      if(data['data'].ChartLayout.Layout.Upper != undefined && data['data'].ChartLayout.Layout.Upper.length != 0 )
      {
        this.isUper = true;
              for(let i=0;i<this.MaxRows;i++){
                this.uperseat.push([0]);
                for(let j=0;j<this.MaxCols;j++){
                  this.uperseat[i][j] = -1;          
                }
              }


              for(let i=0;i<data['data'].ChartLayout.Layout.Upper.length;i++){
                let row = data['data'].ChartLayout.Layout.Upper[i][1];
                let col = data['data'].ChartLayout.Layout.Upper[i][2];
                let value =  data['data'].ChartLayout.Layout.Upper[i][0];
                this.uperseatType = data['data'].ChartLayout.Layout.Upper[i][5];
            if (this.uperseatType == 2) {
              row = row / 2;
            }
                this.uperseat[row][col] = value;
              }
      }      
      // End
        this.noData = false;
        var chartData = data['data'];
        this.ProvId = chartData.ProvId,
        this.layoutname = chartData.ChartLayout.Info.LayoutName;
        this.DropOffs = chartData.Dropoffs;
        this.Pickups = chartData.Pickups;
        var ChartLayout = chartData.ChartLayout.Layout;
        this.TotalSeats = chartData.ChartLayout.Info.TotalSeats;
       // var decks = chartData.ChartLayout.Info.Decks;
     
        //console.log(ChartLayout)
        this.lower = ChartLayout.Lower;
        this.SeatsStatus = chartData.SeatsStatus;
        this.status = this.SeatsStatus.Status;
        // console.log(this.status)
        this.fare = this.SeatsStatus.Fares;
         this.Seats = chartData.ChartSeats.Seats;
       
      } else {
        this.shared.showToast('No any data available');
        this.noData = true;
      }
    }, err => {
      this.shared.hideloading();
      console.log(err)
      if (err.error.Code == 500) {
        this.shared.showToast('Please select another date or bus');
        this.noData = true;
      } else if(err.error.Code == 401){
        this.shared.showToast('Please select another date or bus');
        this.noData = true;
      }
    })
  }

  // seatsAvailable(element) {
  //   switch (this.status[element[0]]) {
  //     case 0: {
  //       element[element.length] = 'Not_Avail';
  //       break;
  //     }
  //     case 1: {
  //       element[element.length] = 'Avail';
  //       break;
  //     }
  //     case 2: {
  //       element[element.length] = 'Avail_male';
  //       break;
  //     }
  //     case 3: {
  //       element[element.length] = 'Avail_female';
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  //   element[element.length] = this.fare[element[0]];
  // }

  lowerBus() {
    this.busArea = 'lower'
  }

  uperBus() {
    this.busArea = 'uper'
  }

  

  Procced() {
    this.navCtrl.push(BoardingDropPage,
      {
        dropoffs: this.DropOffs, pickups: this.Pickups,
        basefare: this.baseFare, totalFare: this.totalFare,       
        jouneyInfo:this.navParams.get('data'),
        selectedseat:this.selectedSeat,seatStatus:this.seatStatus
      })
  }

  range(min, max) {
    this.input = [];
    for (var i = min; i <= max; i++) this.input.push(i)
    return this.input;
  }
  
  changeLowerSeat(id, $e,seatno,status) {   
    var seatType = this.mainseatData.Lower[id][5]
    this.selectSeat(id, $e,seatType,seatno,status)
  }
  changeUperSeat(id, $e) {
    var uperSeat = this.uper[id];           
    //  this.selectSeat(this.totalIntgerSeats+id, $e, uperSeat[7],uperSeat[5])
  }
  selectSeat(seq_no, $e,seat_type,seatno,status) {
        
    if ($e.checked == true) {
      this.selectedSeat.push({
        'SeatNo':seatno,
        'SeatTypeId':seat_type,
        'Fare':this.fare[seq_no][0],
        // 'status':this.status[seq_no],
        'Name':'',
        'Age':'',
        'Gender':''
        // 'IsAcSeat':
      })
      this.selectedSeatArray.push(seq_no);
      this.selectedSeatFare.push(this.fare[seq_no][1]);
      this.seatTotalFare.push(this.fare[seq_no][0]);
      this.seatType.push(seat_type);
      this.seatStatus.push(status);
    } else if($e.checked == false) {
      let tmp = this.selectedSeat;
      this.selectedSeat = []
      tmp.forEach(element => {
          if(element.SeatNo != seatno){
            this.selectedSeat.push(element)
          } 
      });
      this.selectedSeatArray.pop(seq_no);
      this.selectedSeatFare.pop(this.fare[1]);
      this.seatTotalFare.pop(this.fare[0])
      this.seatType.pop(seat_type);
      this.seatStatus.pop(status);
    }
    // console.log(this.selectedSeatArray)
    // console.log(this.selectedSeatFair)
    // console.log(this.seatTotalFair);
    this.baseFare = this.selectedSeatFare.reduce((acc, value) => acc + value, 0);
    this.totalFare = this.seatTotalFare.reduce((acc, value) => acc + value, 0);
    this.totalTax = this.totalFare - this.baseFare;
    console.log(this.selectedSeat)
    console.log(this.seatStatus)
  }
}
