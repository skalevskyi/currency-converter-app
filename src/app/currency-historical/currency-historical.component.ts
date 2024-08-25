import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-historical',
  templateUrl: './currency-historical.component.html',
  styleUrls: ['./currency-historical.component.css']
})
export class CurrencyHistoricalComponent implements OnInit {
  historicalRates: any;
  selectedDate: string = ''; // Ініціалізація змінної

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.selectedDate = this.getLastYearDate(); // Встановлюємо дату на поточну дату минулого року
    console.log('Initial selectedDate:', this.selectedDate); // Додано для перевірки
    this.fetchHistoricalRates(this.formatDateForApi(this.selectedDate));
  }

  fetchHistoricalRates(date: string): void {
    console.log('Fetching data for date:', date); // Додано для перевірки
    this.currencyService.getHistoricalRates(date).subscribe(data => {
      console.log('Отримані дані:', data); // Додано лог для перевірки
      if (data && data.exchangeRate) {
        this.historicalRates = data;
        console.log('Збережені дані:', this.historicalRates);
      } else {
        console.warn('Дані не мають очікуваного формату:', data);
      }
    }, error => {
      console.error('Помилка під час отримання історичних даних:', error);
    });
  }

  onDateChange(event: any): void {
    const newDate = event.value; // event.value вже є об'єктом Date
    this.selectedDate = newDate;
    console.log('Selected Date Changed:', this.selectedDate); // Додано для перевірки
    this.fetchHistoricalRates(this.formatDateForApi(newDate));
  }

  getLastYearDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.toISOString().split('T')[0]; // Повертаємо дату у форматі YYYY-MM-DD для використання в HTML
  }

  formatDateForApi(date: Date | string): string {
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`; // Повертаємо дату у форматі DD.MM.YYYY для API
    } else if (typeof date === 'string') {
      const parts = date.split('-');
      if (parts.length !== 3) {
        console.error('Date format is incorrect:', date);
        return '';
      }
      const [year, month, day] = parts;
      return `${day}.${month}.${year}`; // Повертаємо дату у форматі DD.MM.YYYY для API
    }
    return '';
  }

  getCurrencyRate(currency: string): number | undefined {
    if (!this.historicalRates || !this.historicalRates.exchangeRate) return undefined;
    const rate = this.historicalRates.exchangeRate.find((rate: any) => rate.currency === currency);
    return rate ? rate.saleRate : undefined;
  }
}
