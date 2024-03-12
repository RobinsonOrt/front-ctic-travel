import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDestinationsComponent } from './user-destinations.component';

describe('UserDestinationsComponent', () => {
  let component: UserDestinationsComponent;
  let fixture: ComponentFixture<UserDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
