import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLodgingsComponent } from './admin-lodgings.component';

describe('AdminLodgingsComponent', () => {
  let component: AdminLodgingsComponent;
  let fixture: ComponentFixture<AdminLodgingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLodgingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLodgingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
