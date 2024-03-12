import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDestinationComponent } from './user-destination.component';

describe('UserDestinationComponent', () => {
  let component: UserDestinationComponent;
  let fixture: ComponentFixture<UserDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDestinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
