import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(){
    console.log("httpintercetor");
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    
    req = req.clone({
      setHeaders: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        "Token":"h0fPisXUzkwfFKek8V2JeotA6iVO8Sqgq98/wnFd54g1zQrQKvc7K0lguSgHUTI5"
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtb2ZmaWNlciIsInVzZXJJZCI6IjMiLCJyb2xlIjoiUk9MRV9NRURJQ0FMIE9GRklDRVIsIiwiaWF0IjoxNTMxNDIzNTU5LCJleHAiOjE1MzE0Mjk1NTl9.hV_HqLKBdkPCn6K7YUzYqJwC5c3Nt2aabtmWmz4-wj-Xpe6cxhRBxHwZO4ceFjmtknLuMFJquvu-K2tSc2hZeg`
      }
    });
    console.log("intercer",req);
    
    return next.handle(req);
  }
}