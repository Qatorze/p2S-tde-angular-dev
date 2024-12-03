import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalNotFoundPageComponent } from './internal-not-found-page.component';

describe('InternalNotFoundPageComponent', () => {
  let component: InternalNotFoundPageComponent;
  let fixture: ComponentFixture<InternalNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalNotFoundPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
