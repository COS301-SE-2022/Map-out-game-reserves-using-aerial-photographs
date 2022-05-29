import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
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
      "http://localhost:3333/graphql",
      JSON.stringify({
        query: query,
        variables: variables,
      }),
      options
    );
  }


  getVideoCollections(): Observable<any> {
    return this.runQuery('query { getVideoCollections { collectionID, parkID, completed }}',null);
  }

  getMessages(): Observable<any> {
    return this.runQuery('query { getMessages { message_status, message_description,collectionID }}',null);
  }

  getAuthStatus(): Observable<boolean> {
    return this.runQuery('query { getAuthStatus }', null);
  }

  // MUTATIONS //

  createVideoCollection(parkID: number): Observable<any> {
    const now = new Date().toISOString();

    return this.runQuery('mutation ($parkID: Int, $datetime: DateTime){ createVideoCollection(parkID: $parkID, datetime: $datetime) }', { parkID: parkID, datetime: now });
  }
}
