import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdeletedialogComponent } from './editdeletedialog.component';

describe('EditdeletedialogComponent', () => {
  let component: EditdeletedialogComponent;
  let fixture: ComponentFixture<EditdeletedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdeletedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
