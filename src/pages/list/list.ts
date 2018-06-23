import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from "../../providers/general/general";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  input: any[];
  MaxLowerColumn: number;
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
  
  buslist: any;



  constructor(public navCtrl: NavController,private general:GeneralProvider ,public navParams: NavParams) {

    this.busArea = 'lower';
    this.selectedSeatArray = [];
    this.selectedSeatFare = [];
    this.seatTotalFare = [];


   console.log(this.navParams.get('data'));
   
  }
  ionViewWillEnter(){
    this.general.getseatlist(this.navParams.get('data')).subscribe(data=>{
       this.general.hideloading();
      console.log(data['data']);
      if (data['data']) {
        this.noData = false;
        var chartData = data['data'];
        this.layoutname = chartData.ChartLayout.Info.LayoutName;
        this.DropOffs = chartData.Dropoffs;
        this.Pickups = chartData.Pickups;
        var ChartLayout = chartData.ChartLayout.Layout;
        this.TotalSeats = chartData.ChartLayout.Info.TotalSeats;
        console.log(this.TotalSeats)
        //  console.log(ChartLayout)
        this.lower = ChartLayout.Lower;
        this.MaxLowerRow = chartData.ChartLayout.Info.Lower.MaxRows;
        console.log(this.MaxLowerRow);
        this.MaxLowerColumn = Math.round(this.TotalSeats/this.MaxLowerRow);
        console.log(this.MaxLowerColumn);
        this.SeatsStatus = chartData.SeatsStatus;
        this.status = this.SeatsStatus.Status;
        this.fare = this.SeatsStatus.Fares;
        this.lower.forEach(element => {
          //  element[element.length] 
          this.seatsAvailable(element);
        });
        if (ChartLayout.Upper) {
          this.MaxUperRow = chartData.ChartLayout.Info.Upper.MaxRows;
          this.isUper = true;
          this.uper = ChartLayout.Upper;
          this.uper.forEach(element => {
            this.seatsAvailable(element);
          });
        } else {
          this.isUper = false;
        }
        // console.log(this.lower)
        console.log(this.uper)
      } else {
        this.general.showToast('No any data available');
        this.noData = true;
      }
    },err=>{
      this.general.hideloading();
      console.log(err)
      if (err.error.Code == 500) {
        this.general.showToast('Please select another date or bus');
        this.noData = true;
      }
    })
  }

    seatsAvailable(element) {
    switch (this.status[element[0]]) {
      case 0: {
        element[element.length] = 'Not_Avail';
        break;
      }
      case 1: {
        element[element.length] = 'Avail';
        break;
      }
      case 2: {
        element[element.length] = 'Avail_male';
        break;
      }
      case 3: {
        element[element.length] = 'Avail_female';
        break;
      }
      default: {
        break;
      }
    }
    element[element.length] = this.fare[element[0]];
  }

  lowerBus() {
    this.busArea = 'lower'
  }

  uperBus() {
    this.busArea = 'uper'
  }

  selectSeat(seq_no, $e, fair) {
    console.log(seq_no);
    // console.log($e);
    console.log(fair)
    if ($e.checked == true) {
      this.selectedSeatArray.push(seq_no);
      this.selectedSeatFare.push(fair[1]);
      this.seatTotalFare.push(fair[0])
    } else {
      this.selectedSeatArray.pop(seq_no);
      this.selectedSeatFare.pop(fair[1]);
      this.seatTotalFare.pop(fair[0])
    }
    console.log(this.selectedSeatArray)
    // console.log(this.selectedSeatFair)
    // console.log(this.seatTotalFair);
    this.baseFare = this.selectedSeatFare.reduce((acc, value) => acc + value, 0);
    this.totalFare = this.seatTotalFare.reduce((acc, value) => acc + value, 0);
    this.totalTax = this.totalFare - this.baseFare;
  }
  Procced(){
    // this.navCtrl.push(BoardingDropPage,
    //   {dropoffs:this.DropOffs,pickups:this.Pickups,
    //   basefare:this.baseFare,totalFare:this.totalFare})
  }
  range(min, max){
    this.input = [];
    for (var i=min; i<=max; i++) this.input.push(i)
    return this.input;
  };

  
}
