import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationPlansComponent } from './admin-destination-plans.component';

describe('AdminDestinationPlansComponent', () => {
  let component: AdminDestinationPlansComponent;
  let fixture: ComponentFixture<AdminDestinationPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinationPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDestinationPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
