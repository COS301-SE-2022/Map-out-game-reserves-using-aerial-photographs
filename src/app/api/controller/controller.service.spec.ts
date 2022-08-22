import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateUserInput, User } from 'src/app/API.service';

import { ControllerService } from './controller.service';

describe('ControllerService', () => {
  let service: ControllerService;
  const user: CreateUserInput = {
    user_email: 'incorrect@email.com',
    user_password: '12345678',
    user_name: 'Joe',
    //__typename: 'User',
    userID: 'jaksdjkasjd',
    //createdAt: '',
    //updatedAt: '',
    //_version: 1,
    //_lastChangedAt: 1
  }

  let originalTimeout: number;
  beforeEach(async() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatSnackBarModule ],
      providers: [ HttpClient ]
    })
    .compileComponents();
    service = TestBed.inject(ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test tryRegister function (integration test)
  it('tryRegister', (done: DoneFn) => {
    //no invite for user with email incorrect@email.com
    service.tryRegister(user).subscribe((resp: any) => {
      expect(resp.statusCode).toBe(404);
      expect(resp.body.result).toBe('Invite does not exist.');
      done();
    });
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  //test registerUser function (integration test)

});
