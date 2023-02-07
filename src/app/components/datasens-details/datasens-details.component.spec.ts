import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasensDetailsComponent } from './datasens-details.component';

describe('DatasensDetailsComponent', () => {
  let component: DatasensDetailsComponent;
  let fixture: ComponentFixture<DatasensDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasensDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasensDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
