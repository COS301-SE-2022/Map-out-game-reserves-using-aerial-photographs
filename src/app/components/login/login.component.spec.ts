import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { Auth } from 'aws-amplify';
import { DashboardComponent } from '../dashboard/dashboard.component';

Auth.configure({
  region: 'sa-east-1',
  userPoolId: 'sa-east-1_wDnNPQ5Vo',
  userPoolWebClientId: '3a32euto9uetfe88377gd2u617',
});

const username = "correct@email.com";
const password = "12345678";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let originalTimeout: number;

  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, DashboardComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
      ],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'login-component'", () => {
    expect(component.title).toEqual('login-component');
  });

  it('component variables initialised correctly', () => {
    expect(component.isSubmitted).toBeFalsy();
    expect(component.email!.value).toBe('');
    expect(component.password!.value).toBe('');
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    //should be invalid at first since it is empty
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    //should be invalid if the email is not empty but incorrect
    email.setValue('incorrect-email.com');
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    //should be valid if the email is not empty and correct
    email.setValue('test@email.com');
    expect(email.valid).toBeTruthy();
  });

  it('password field validity', () => {
    //should be invalid at first since it is empty
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    //should be valid if the password is not empty
    password.setValue('12345678');
    expect(password.valid).toBeTruthy();
  });

  it('submits form and logs in', async () => {
    component.loginForm.controls['email'].setValue('correct@email.com');
    component.loginForm.controls['password'].setValue('12345678');
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.windowReload = jasmine.createSpy();
    component.isSubmitted = true;
    const result = await component.login();
    expect(result).toBe(1);
  });

  it('Must login within 5 seconds', async () => {
    component.loginForm.controls['email'].setValue(username);
    component.loginForm.controls['password'].setValue(password);

    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.windowReload = jasmine.createSpy();

    component.isSubmitted = true;
    const start = new Date().getTime();
    const result = await component.login();
    const duration = new Date().getTime() - start;
    console.log('[Performance Quality Requirement]');
    console.log(`Logged in within ${duration} milliseconds`);
    expect(duration).toBeLessThan(5000);
  });


  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
