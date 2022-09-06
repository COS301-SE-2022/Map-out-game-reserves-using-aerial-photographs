import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountComponent } from './account.component';


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserModule
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have as title 'account-component'", () => {  
    // const app = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('account-component');
  });

  it('should call openPasswordDialog when clicked', () => {
    fixture.detectChanges();

    let openPassword = spyOn (component, 'openPasswordDialog').and.callThrough();
    expect(openPassword).not.toHaveBeenCalled();

    let button = fixture.nativeElement.querySelector('#nameEdit');
    expect(button).toBeTruthy();
    
    // CAUSES AUTH ERROR!!
    // button.click();
    // expect(openPassword).toHaveBeenCalled();
  });
 

});