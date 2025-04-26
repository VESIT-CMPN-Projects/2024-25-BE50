import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchExpenseComponent } from './fetch-expense.component';

describe('FetchExpenseComponent', () => {
  let component: FetchExpenseComponent;
  let fixture: ComponentFixture<FetchExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchExpenseComponent]
    });
    fixture = TestBed.createComponent(FetchExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
