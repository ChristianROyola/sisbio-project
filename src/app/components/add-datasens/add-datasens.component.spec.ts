import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatasensComponent } from './add-datasens.component';

describe('AddDatasensComponent', () => {
  let component: AddDatasensComponent;
  let fixture: ComponentFixture<AddDatasensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDatasensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDatasensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
