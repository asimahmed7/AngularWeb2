import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Appsettings } from './appsettings';


@Injectable({
  providedIn: 'root'
})
export class appConfigService {


  static settings: Appsettings;
  constructor(private http: HttpClient) { }
  load() {
    const jsonFile = `assets/config/appconfig.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: Appsettings) => {
        appConfigService.settings = <Appsettings>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
