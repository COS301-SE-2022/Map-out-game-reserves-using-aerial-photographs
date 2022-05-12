import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  constructor(private http: HttpClient) { }

  // QUERIES //

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

  runQuery(query:string,variables: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http.post<any>(
      "https://localhost:3333/graphql",
      JSON.stringify({
        query: query,
        variables: variables,
      }),
      options
    );
  }


  getVideoCollection(): Observable<any> {
    return this.runQuery('query { getVideoCollections { parkID }}',null);
  }

  // MUTATIONS //


}
