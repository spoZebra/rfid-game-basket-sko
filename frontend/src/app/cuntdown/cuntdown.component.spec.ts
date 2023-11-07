import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuntdownComponent } from './cuntdown.component';

describe('CuntdownComponent', () => {
  let component: CuntdownComponent;
  let fixture: ComponentFixture<CuntdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuntdownComponent]
    });
    fixture = TestBed.createComponent(CuntdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
