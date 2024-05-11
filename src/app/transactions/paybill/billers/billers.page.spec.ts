import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillersPage } from './billers.page';

describe('BillersPage', () => {
  let component: BillersPage;
  let fixture: ComponentFixture<BillersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
