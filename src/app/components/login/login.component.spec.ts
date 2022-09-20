import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from 'aws-amplify';
import { LoginComponent } from './login.component';

Auth.configure({
  region: process.env.REGION,
  userPoolId: process.env.USER_POOL_ID,
  userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID
})


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let originalTimeout: number;

  beforeEach(async () => {
    originalTimeout =  jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule ],
      providers: [ HttpClient ]
    })
    .compileComponents();

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

  //integration test
  it('submits form and logs in', async() => {
    component.loginForm.controls['email'].setValue("correct@email.com");
    component.loginForm.controls['password'].setValue("12345678");

    const routerMock: any = jasmine.createSpyObj('Router', ['navigate']);
    routerMock.navigate.and.returnValue(true);
    component.windowReload = jasmine.createSpy();
    //response from event emitter
    // component.loggedIn.subscribe(user => {
    //   expect(user.attributes.email).toBe("correct@email.com");
    // });

    component.login().then((resp: string) => {
      expect(resp).toBe("success");
    });
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});
