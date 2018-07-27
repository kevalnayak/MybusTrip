import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the XmlApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class XmlApiProvider {
  URL: any;
  
  constructor(public http: HttpClient) {
    this.URL = 'http://apimybustrip.itspl.net/';
    console.log('Hello XmlApiProvider Provider');
  }
  xmlGetCityPair(){
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetCityPair xmlns="http://apimybustrip.itspl.net/">
          <verifyCall>string</verifyCall>
        </GetCityPair>
      </soap12:Body>
    </soap12:Envelope>`;
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetAvailableRoutes`,data,httpOptions)
  }
  BlockSeatV2(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <BlockSeatV2 xmlns="http://apimybustrip.itspl.net/">
          <ReferenceNumber>string</ReferenceNumber>
          <PassengerName>string</PassengerName>
          <SeatNames>string</SeatNames>
          <Email>string</Email>
          <Phone>string</Phone>
          <PickupID>int</PickupID>
          <PayableAmount>float</PayableAmount>
          <TotalPassengers>int</TotalPassengers>
          <VerifyCall>string</VerifyCall>
        </BlockSeatV2>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=BlockSeatV2`,data,httpOptions)
  }
  BookSeat(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <BookSeat xmlns="http://apimybustrip.itspl.net/">
          <ReferenceNumber>string</ReferenceNumber>
          <PassengerName>string</PassengerName>
          <SeatNames>string</SeatNames>
          <Email>string</Email>
          <Phone>string</Phone>
          <PickIpID>int</PickIpID>
          <PayableAmount>float</PayableAmount>
          <TotalPassengers>int</TotalPassengers>
          <VerifyCall>string</VerifyCall>
          <DropID>int</DropID>
          <Discount>float</Discount>
        </BookSeat>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=BookSeat`,data,httpOptions)
  }
  BookSeatDetail(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <BookSeatDetails xmlns="http://apimybustrip.itspl.net/">
          <PNRNo>int</PNRNo>
          <VerifyCall>string</VerifyCall>
        </BookSeatDetails>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=BookSeatDetails`,data,httpOptions)
  }
  CancelDetails(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <CancelDetails xmlns="http://apimybustrip.itspl.net/">
          <PNRNo>int</PNRNo>
          <VerifyCall>string</VerifyCall>
        </CancelDetails>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=CancelDetails`,data,httpOptions)
  }
  ConfirmCancellation(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <ConfirmCancellation xmlns="http://apimybustrip.itspl.net/">
          <PNRNo>int</PNRNo>
          <VerifyCall>string</VerifyCall>
        </ConfirmCancellation>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=ConfirmCancellation`,data,httpOptions)
  }
  FetchTicketPrintData(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <FetchTicketPrintData xmlns="http://apimybustrip.itspl.net/">
          <PNRNo>int</PNRNo>
          <VerifyCall>string</VerifyCall>
        </FetchTicketPrintData>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=FetchTicketPrintData`,data,httpOptions)
  }
  GetAmenities(id){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetAmenities xmlns="http://apimybustrip.itspl.net/">
          <CompanyID>`+id+`</CompanyID>
          <VerifyCall>84cab3fbae3946569be9103d4a87ffde37636556810302828645</VerifyCall>
        </GetAmenities>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetAmenities`,data,httpOptions)
  }
  GetAvailableRoutes(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetAvailableRoutes xmlns="http://apimybustrip.itspl.net/">
          <FromID>int</FromID>
          <ToID>int</ToID>
          <JourneyDate>string</JourneyDate>
          <VerifyCall>string</VerifyCall>
        </GetAvailableRoutes>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetAvailableRoutes`,data,httpOptions)
  }
  GetBoardingDropLocationsByCity(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetBoardingDropLocationsByCity xmlns="http://apimybustrip.itspl.net/">
          <CompanyID>int</CompanyID>
          <CityID>int</CityID>
          <VerifyCall>string</VerifyCall>
        </GetBoardingDropLocationsByCity>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetBoardingDropLocationsByCity`,data,httpOptions)
  }
  GetCancellationPolicy(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetCancellationPolicy xmlns="http://apimybustrip.itspl.net/">
          <CompanyID>int</CompanyID>
          <VerifyCall>string</VerifyCall>
        </GetCancellationPolicy>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetCancellationPolicy`,data,httpOptions)
  }
  GetCompanyList(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetCompanyList xmlns="http://apimybustrip.itspl.net/">
          <VerifyCall>string</VerifyCall>
        </GetCompanyList>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetCompanyList`,data,httpOptions)
  }
  GetCurrentAccountBalance(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetCurrentAccountBalance xmlns="http://apimybustrip.itspl.net/">
          <VerifyCall>string</VerifyCall>
        </GetCurrentAccountBalance>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetCompanyList`,data,httpOptions)
  }
  GetSeatArrangementDetails(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <GetSeatArrangementDetails xmlns="http://apimybustrip.itspl.net/">
          <ReferenceNumber>string</ReferenceNumber>
          <VerifyCall>string</VerifyCall>
        </GetSeatArrangementDetails>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=GetSeatArrangementDetails`,data,httpOptions)
  }
  TicketStatus(){
    const data =`<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <TicketStatus xmlns="http://apimybustrip.itspl.net/">
          <PNRNo>int</PNRNo>
          <VerifyCall>string</VerifyCall>
        </TicketStatus>
      </soap12:Body>
    </soap12:Envelope>`
    const httpOptions =  { 
      headers:{
       'Content-Type':'text/xml; charset=utf-8'
     } 
   }
   return this.http.post(`${this.URL}ITSGateway.asmx??op=TicketStatus`,data,httpOptions)
  }
}
