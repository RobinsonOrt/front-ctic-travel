import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLodgingComponent } from './create-lodging.component';

describe('CreateLodgingComponent', () => {
  let component: CreateLodgingComponent;
  let fixture: ComponentFixture<CreateLodgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLodgingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLodgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
