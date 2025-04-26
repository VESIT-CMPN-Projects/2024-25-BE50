import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitExpenseComponent } from './split-expense.component';

describe('SplitExpenseComponent', () => {
  let component: SplitExpenseComponent;
  let fixture: ComponentFixture<SplitExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitExpenseComponent]
    });
    fixture = TestBed.createComponent(SplitExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
