import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustvendorindexComponent } from './custvendorindex.component';

describe('CustvendorindexComponent', () => {
  let component: CustvendorindexComponent;
  let fixture: ComponentFixture<CustvendorindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustvendorindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustvendorindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
