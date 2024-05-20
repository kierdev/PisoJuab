import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangesPage } from './exchanges.page';

describe('ExchangesPage', () => {
  let component: ExchangesPage;
  let fixture: ComponentFixture<ExchangesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
