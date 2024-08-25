import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { CurrencyHistoricalComponent } from './currency-historical/currency-historical.component'; // Імпорт компонента
import { CurrencyService } from './services/currency.service'; // Імпорт сервісу

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyConverterComponent,
    CurrencyInputComponent,
    CurrencyHistoricalComponent  // Додавання компонента сюди
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CurrencyService], // Додавання сервісу до провайдерів
  bootstrap: [AppComponent]
})
export class AppModule { }
