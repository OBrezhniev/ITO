import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TicketOffer } from './TiketOffer';

@Injectable()
export class BuyersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private hostUrl = 'http://10.1.19.94:3000'; 

  constructor(private http: Http) { }

  getOffers(): Promise<TicketOffer[]> {
    const url = `${this.hostUrl}/api/contracts`;
    return this.http.get(url)
          .toPromise()
          .then(response => response.json() as TicketOffer[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}