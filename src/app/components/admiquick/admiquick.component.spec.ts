import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiquickComponent } from './admiquick.component';

describe('AdmiquickComponent', () => {
  let component: AdmiquickComponent;
  let fixture: ComponentFixture<AdmiquickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiquickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmiquickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
