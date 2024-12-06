import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogementsOverviewComponent } from './logements-overview.component';

describe('LogementsOverviewComponent', () => {
  let component: LogementsOverviewComponent;
  let fixture: ComponentFixture<LogementsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogementsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogementsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
