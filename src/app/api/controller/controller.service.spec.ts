import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/api.service';

import { ControllerService } from './controller.service';

describe('ControllerService', () => {
  let service: ControllerService;
  const user: User = {
    user_email: 'incorrect@email.com',
    user_password: '12345678',
    user_name: 'Joe',
    __typename: 'User',
    userID: 'jaksdjkasjd',
    createdAt: '',
    updatedAt: '',
    _version: 1,
    _lastChangedAt: 1
  }


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ HttpClient ]
    })
    .compileComponents();
    service = TestBed.inject(ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test tryRegister function (integration test)
  it('tryRegister', async () => {
    //no invite for user with email incorrect@email.com
    expect(await service.tryRegister(user)).toBe(-1);
  });

  //test registerUser function (integration test)

});
