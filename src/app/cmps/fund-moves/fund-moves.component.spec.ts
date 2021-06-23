import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundMovesComponent } from './fund-moves.component';

describe('FundMovesComponent', () => {
  let component: FundMovesComponent;
  let fixture: ComponentFixture<FundMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundMovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
