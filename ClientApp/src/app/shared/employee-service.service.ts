import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { appConfigService } from './appconfigservice';
import { Employee } from '../models/employee';


@Injectable()
export class EmployeeService {

  constructor(public http: HttpClient) { }

    options = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
    
  }


  public postSvc(req : string, path : string): Observable<any> {

    return this.http.post(appConfigService.settings.baseUrl + path, req, this.options);

  }


  public getSvc(EmpID: string, path : string): Observable<any[]> {

    return this.http.get<any[]>(appConfigService.settings.baseUrl + path);

  }




private extractData(res: Response) {
  let body = res.json();
  return body || { };
}

//private handleError (error: Response | any) {
//  // In a real world app, you might use a remote logging infrastructure
//  let errMsg: string;
//  if (error instanceof Response) {
//    const body = error.json() || '';
//    const err = body.error || JSON.stringify(body);
//    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//  } else {
//    errMsg = error.message ? error.message : error.toString();
//  }
//  console.error(errMsg);
//  return Observable.throw(errMsg);
//}

}

