import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNotFoundPageComponent } from './global-not-found-page.component';

describe('GlobalNotFoundPageComponent', () => {
  let component: GlobalNotFoundPageComponent;
  let fixture: ComponentFixture<GlobalNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalNotFoundPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
