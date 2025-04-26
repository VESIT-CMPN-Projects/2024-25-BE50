import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchIncomeComponent } from './fetch-income.component';

describe('FetchIncomeComponent', () => {
  let component: FetchIncomeComponent;
  let fixture: ComponentFixture<FetchIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchIncomeComponent]
    });
    fixture = TestBed.createComponent(FetchIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
