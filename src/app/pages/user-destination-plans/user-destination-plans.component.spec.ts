import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDestinationPlansComponent } from './user-destination-plans.component';

describe('UserDestinationPlansComponent', () => {
  let component: UserDestinationPlansComponent;
  let fixture: ComponentFixture<UserDestinationPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDestinationPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDestinationPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
