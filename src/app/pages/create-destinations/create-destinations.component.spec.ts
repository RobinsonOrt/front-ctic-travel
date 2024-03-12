import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDestinationsComponent } from './create-destinations.component';

describe('CreateDestinationsComponent', () => {
  let component: CreateDestinationsComponent;
  let fixture: ComponentFixture<CreateDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
