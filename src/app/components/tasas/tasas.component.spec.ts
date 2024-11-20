import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasasComponent } from './tasas.component';

describe('TasasComponent', () => {
  let component: TasasComponent;
  let fixture: ComponentFixture<TasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
