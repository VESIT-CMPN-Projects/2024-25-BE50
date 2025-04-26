import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingAmountComponent } from './remaining-amount.component';

describe('RemainingAmountComponent', () => {
  let component: RemainingAmountComponent;
  let fixture: ComponentFixture<RemainingAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainingAmountComponent]
    });
    fixture = TestBed.createComponent(RemainingAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
