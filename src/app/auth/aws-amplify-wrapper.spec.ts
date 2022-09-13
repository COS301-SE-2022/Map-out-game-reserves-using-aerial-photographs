import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AWSAmplifyWrapper } from './aws-amplify-wrapper';

describe('AWSAmplifyWrapper', () => {
  let service: AWSAmplifyWrapper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
    service = TestBed.inject(AWSAmplifyWrapper);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
