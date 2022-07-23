import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogState } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/API.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
      ],
      providers: [ HttpClient ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    expect(component.repeatedPassword!.value).toBe('');
    expect(component.name!.value).toBe('');
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('gets correct error message', () => {
    expect(component.getErrorMessage()).toBe('You must enter a value');

    component.registerForm.controls['user_email'].setValue('test-email.com');

    expect(component.getErrorMessage()).toBe('Not a valid email');

    component.registerForm.controls['user_email'].setValue('test@email.com');

    expect(component.getErrorMessage()).toBe('');
  });

  it('email field validity', () => {
    //should be invalid at first since it is empty
    const email = component.registerForm.controls['user_email'];
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
    const password = component.registerForm.controls['user_password'];
    expect(password.valid).toBeFalsy();

    //should be valid if the password is not empty
    password.setValue('12345678');
    expect(password.valid).toBeTruthy();
  });

  it('repeated password field validity', () => {
    //should be invalid at first since it is empty
    const repeatedPass = component.registerForm.controls['repeatedPassword'];
    expect(repeatedPass.valid).toBeFalsy();

    //should be valid if the repeated password is not empty
    repeatedPass.setValue('12345678');
    expect(repeatedPass.valid).toBeTruthy();
  });

  it('name field validity', () => {
    //should be invalid at first since it is empty
    const name = component.registerForm.controls['user_name'];
    expect(name.valid).toBeFalsy();

    //should be valid if the name is not empty
    name.setValue('Joe');
    expect(name.valid).toBeTruthy();
  });

  it('form submission validity', () => {
    component.registerForm.controls['user_email'].setValue("test@email.com");
    component.registerForm.controls['user_password'].setValue("12345678");
    component.registerForm.controls['repeatedPassword'].setValue("12345678");
    component.registerForm.controls['user_name'].setValue("Joe");
    expect(component.registerForm.valid).toBeTruthy();

    component.registered.subscribe(resp => {
      expect(resp).toBe(-1);
    });

    component.onRegisterFormSubmit(user);
  });

  it('opens OTP dialog', () => {
    component.dialogState.subscribe(state => {
      expect(state).toBe(MatDialogState.OPEN);
    });

    component.openOtpDialog(user);
  });

});
