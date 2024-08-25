import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoricalComponent } from './currency-historical.component';

describe('CurrencyHistoricalComponent', () => {
  let component: CurrencyHistoricalComponent;
  let fixture: ComponentFixture<CurrencyHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyHistoricalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
