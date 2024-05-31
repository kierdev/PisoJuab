import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaybillPage } from './paybill.page';

describe('PaybillPage', () => {
  let component: PaybillPage;
  let fixture: ComponentFixture<PaybillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaybillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
