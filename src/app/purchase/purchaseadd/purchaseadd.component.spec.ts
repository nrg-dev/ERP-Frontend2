import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseaddComponent } from './purchaseadd.component';

describe('PurchaseaddComponent', () => {
  let component: PurchaseaddComponent;
  let fixture: ComponentFixture<PurchaseaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
