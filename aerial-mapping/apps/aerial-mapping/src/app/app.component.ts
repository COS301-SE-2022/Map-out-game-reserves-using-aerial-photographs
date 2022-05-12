import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'aerial-mapping-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  // EXAMPLE API CALL
  // getVideoCollections(): Observable<any> {
  //   const query =
  //     "query { getVideoCollections { parkID }}";

  //   const options = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //     }),
  //   };

  //   return this.http.post<any>(
  //     "https://localhost:3333/graphql",
  //     JSON.stringify({
  //       query: query,
  //     }),
  //     options
  //   );
  // }
}
