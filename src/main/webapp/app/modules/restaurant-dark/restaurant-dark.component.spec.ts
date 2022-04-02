import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDarkComponent } from './restaurant-dark.component';

describe('RestaurantDarkComponent', () => {
  let component: RestaurantDarkComponent;
  let fixture: ComponentFixture<RestaurantDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantDarkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
