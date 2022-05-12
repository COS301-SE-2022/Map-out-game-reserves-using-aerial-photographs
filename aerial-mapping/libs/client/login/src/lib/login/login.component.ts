import { Component } from '@angular/core';
import { ClientApiService } from '../../../../shared/services/client-api.service';

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
