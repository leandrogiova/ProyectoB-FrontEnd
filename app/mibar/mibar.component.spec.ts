import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MibarComponent } from './mibar.component';

describe('MibarComponent', () => {
  let component: MibarComponent;
  let fixture: ComponentFixture<MibarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MibarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
