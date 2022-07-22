import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
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
    component.loginForm.controls['email'].setValue("correct@email.com");
    component.loginForm.controls['password'].setValue("12345678");
    expect(component.loginForm.valid).toBeTruthy();

    let user: any;
    component.loggedIn.subscribe(u => user = u);

    await component.login();

    console.log(user);

    expect(user!.attributes.email).toBe("correct@email.com");
  });

});
