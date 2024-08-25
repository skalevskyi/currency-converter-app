import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = '/api/p24api/pubinfo?json&exchange&coursid=5'; // URL для поточних курсів
  private historicalApiUrl = '/api/p24api/exchange_rates?json&date='; // URL для історичних курсів

  private rates$: Observable<any>;

  constructor(private http: HttpClient) {
    this.rates$ = this.http.get<any>(this.apiUrl).pipe(
      shareReplay(1), // Кешуємо результати запиту, щоб уникнути дублювання
      catchError(this.handleError('getExchangeRates', [])) // Додаємо обробку помилок
    );
  }

  // Метод для отримання поточних курсів валют
  getExchangeRates(): Observable<any> {
    return this.rates$;
  }

  // Метод для отримання історичних курсів валют на конкретну дату
  getHistoricalRates(date: string): Observable<any> {
    const cachedData = this.getFromCache(date);
    if (cachedData) {
      return of(cachedData); // Повертаємо кешовані дані, якщо вони є
    }

    const url = `${this.historicalApiUrl}${date}`;
    console.log('Fetching data from URL:', url); // Додайте цей console.log для перевірки
    return this.http.get<any>(url).pipe(
      tap(data => this.saveToCache(date, data)), // Зберігаємо дані у кеш
      catchError(this.handleError('getHistoricalRates', {})) // Додаємо обробку помилок
    );
  }

  private getFromCache(date: string): any {
    const data = localStorage.getItem(`historicalRates-${date}`);
    return data ? JSON.parse(data) : null;
  }

  private saveToCache(date: string, data: any): void {
    localStorage.setItem(`historicalRates-${date}`, JSON.stringify(data));
  }

  // Метод для обробки помилок
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Лог помилки в консоль
      return of(result as T); // Повертаємо пустий результат, щоб додаток продовжував працювати
    };
  }
}
