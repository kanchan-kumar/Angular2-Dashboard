import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Logger} from 'angular2-logger/core';

@Injectable()
export class DashboardRESTDataAPIService {

  constructor(private http: Http, private log: Logger) { }

  /*Getting Data Through REST API by using GET Method.*/
  getDataByRESTAPI( url: string, param: string) {
    try {

      this.log.info('Getting data from url = ' + url + ', param = ' + param);

      return this.http.get(url + param)
        .map((response) => response.json())
        .catch((e) => {
          return Observable.throw(
            new Error(`${ e.status } ${ e.statusText }`)
          );
        });
    } catch (e) {
      this.log.error('Error while getting data from REST API. url = ' + url + ', param = ' + param);
      this.log.error(e);
    }
  }
}
