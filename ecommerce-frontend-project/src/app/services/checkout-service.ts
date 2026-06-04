import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private countriesUrl = 'http://localhost:8080/api/country';
  private statesUrl = 'http://localhost:8080/api/states';


  constructor(private http: HttpClient) { }

  getCreditCardMonths(startMonth: number) : Observable<number[]> {

    let data: number[] = [];
    for(let month = startMonth; month <= 12; month++) {

      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears() : Observable<number[]> {

    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let year = startYear; year <= endYear; year++) {

      data.push(year);
    }

    return of(data);
  }

  getCountries() : Observable<Country[]>{
    return this.http.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.country)
    );
  }

  getStates(theCountryCode: string) : Observable<State[]> {
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.http.get<GetResponseStates>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
  }

}

  interface GetResponseCountries {
  _embedded: {
    country: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
