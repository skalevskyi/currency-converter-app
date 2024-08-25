import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Імпорт BrowserAnimationsModule
import { MatDatepickerModule } from '@angular/material/datepicker'; // Імпорт MatDatepickerModule
import { MatNativeDateModule } from '@angular/material/core'; // Імпорт MatNativeDateModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Імпорт MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Імпорт MatInputModule

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { CurrencyHistoricalComponent } from './currency-historical/currency-historical.component'; // Імпорт компонента
import { CurrencyService } from './services/currency.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Імпорт сервісу

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
    HttpClientModule,
    BrowserAnimationsModule, // Додано BrowserAnimationsModule
    MatDatepickerModule, // Додано MatDatepickerModule
    MatNativeDateModule, // Додано MatNativeDateModule
    MatFormFieldModule, // Додано MatFormFieldModule
    MatInputModule // Додано MatInputModule
  ],
  providers: [
    CurrencyService,
    provideAnimationsAsync(),
    MatDatepickerModule // Додано MatDatepickerModule у провайдери, щоб забезпечити його роботу
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
