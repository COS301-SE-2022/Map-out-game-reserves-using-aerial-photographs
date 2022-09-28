import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: any;
  const authMock: any = jasmine.createSpyObj('AWSAmplifyWrapper', ['getAuth']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
      providers: [AuthGuard],
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
