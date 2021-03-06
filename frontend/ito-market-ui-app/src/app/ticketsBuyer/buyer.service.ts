import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TicketOffer } from './TiketOffer';
import { User } from './User';

@Injectable()
export class BuyersService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private hostUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  checkUser(id: number, contractAddress: string): Promise<object> {
    const url = `${this.hostUrl}/api/tickets?id=${id}&contractAddress=${contractAddress}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json(  ) as object);
  }

  buyTicket(userAddress: string, contractAddress: string, placeNumber: number): Observable<boolean> {
    const url = `${this.hostUrl}/api/tickets`;
    return this.http
      .post(url,
      JSON.stringify(
        {
          userAddress: userAddress,
          contractAddress: contractAddress,
          ticketId: placeNumber
        })
      , { headers: this.headers })
      .map(res => res.json().isSuccess as boolean);
  }

  getOffers(): Promise<TicketOffer[]> {
    const url = `${this.hostUrl}/api/contracts`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TicketOffer[]);
  }
  getUsers(): Promise<User[]> {
    const url = `${this.hostUrl}/api/users`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User[]);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}