import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  fromGroup: FormGroup;
  toGroup: FormGroup;
  currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'UAH', symbol: '₴' },
  ];
  rates: { [key: string]: number } = {};

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.fromGroup = this.fb.group({
      amount: 1,
      currency: 'USD',
    });
    this.toGroup = this.fb.group({
      amount: 0,
      currency: 'UAH',
    });
  }

  ngOnInit(): void {
    this.loadExchangeRates();
    this.fromGroup.valueChanges.subscribe(() => this.convertFromCurrency());
    this.toGroup.valueChanges.subscribe(() => this.convertToCurrency());
  }

  private loadExchangeRates(): void {
    this.currencyService.getExchangeRates().subscribe(
      (data) => {
        this.rates = this.processRates(data);
        this.convertFromCurrency();
      },
      (error) => {
        console.error('Помилка під час отримання даних:', error);
      }
    );
  }

  private processRates(data: any): { [key: string]: number } {
    const rates: { [key: string]: number } = {};
    data.forEach((rate: any) => {
      if (rate.ccy === 'USD' || rate.ccy === 'EUR') {
        rates[rate.ccy] = parseFloat(rate.buy);
      }
    });
    rates['UAH'] = 1;
    return rates;
  }

  convertFromCurrency(): void {
    const fromCurrency = this.fromGroup.get('currency')?.value;
    const toCurrency = this.toGroup.get('currency')?.value;
    const fromAmount = this.fromGroup.get('amount')?.value;

    if (
      fromCurrency &&
      toCurrency &&
      this.rates[fromCurrency] &&
      this.rates[toCurrency]
    ) {
      let result: number;

      if (fromCurrency === 'UAH') {
        // Конвертація з UAH в іншу валюту
        result = fromAmount / this.rates[toCurrency];
      } else if (toCurrency === 'UAH') {
        // Конвертація з іншої валюти в UAH
        result = fromAmount * this.rates[fromCurrency];
      } else {
        // Конвертація між двома іноземними валютами
        result = fromAmount * (this.rates[fromCurrency] / this.rates[toCurrency]);
      }

      this.toGroup.get('amount')?.setValue(result, { emitEvent: false });
    }
  }

  convertToCurrency(): void {
    const fromCurrency = this.fromGroup.get('currency')?.value;
    const toCurrency = this.toGroup.get('currency')?.value;
    const toAmount = this.toGroup.get('amount')?.value;

    if (
      fromCurrency &&
      toCurrency &&
      this.rates[fromCurrency] &&
      this.rates[toCurrency]
    ) {
      let result: number;

      if (toCurrency === 'UAH') {
        // Конвертація з UAH в іншу валюту
        result = toAmount / this.rates[fromCurrency];
      } else if (fromCurrency === 'UAH') {
        // Конвертація з іншої валюти в UAH
        result = toAmount * this.rates[toCurrency];
      } else {
        // Конвертація між двома іноземними валютами
        result = toAmount * (this.rates[fromCurrency] / this.rates[toCurrency]);
      }

      this.fromGroup.get('amount')?.setValue(result, { emitEvent: false });
    }
  }
}
