import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = '/api/p24api/pubinfo?json&exchange&coursid=5';

  private rates$: Observable<any>;

  constructor(private http: HttpClient) {
    this.rates$ = this.http.get<any>(this.apiUrl).pipe(
      shareReplay(1) // Кешуємо результати запиту, щоб уникнути дублювання
    );
  }

  getExchangeRates(): Observable<any> {
    return this.rates$;
  }
}
