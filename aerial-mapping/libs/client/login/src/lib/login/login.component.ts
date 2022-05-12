import { Component } from '@angular/core';
import { ClientApiService } from '@aerial-mapping/client/shared/services';

@Component({
  selector: 'aerial-mapping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private apiService:ClientApiService) {
    //Code
  }
}
