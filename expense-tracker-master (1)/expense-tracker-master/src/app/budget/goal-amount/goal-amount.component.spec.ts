import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAmountComponent } from './goal-amount.component';

describe('GoalAmountComponent', () => {
  let component: GoalAmountComponent;
  let fixture: ComponentFixture<GoalAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalAmountComponent]
    });
    fixture = TestBed.createComponent(GoalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
