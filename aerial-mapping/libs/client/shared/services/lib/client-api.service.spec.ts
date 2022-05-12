import { TestBed } from '@angular/core/testing';
import { ClientApiService } from './client-api.service';

describe('ClientDashboardService', () => {
  let service: ClientApiService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
