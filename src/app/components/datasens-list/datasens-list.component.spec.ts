import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasensListComponent } from './datasens-list.component';

describe('DatasensListComponent', () => {
  let component: DatasensListComponent;
  let fixture: ComponentFixture<DatasensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasensListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
