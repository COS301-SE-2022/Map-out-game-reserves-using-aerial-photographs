import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientApiService {
  token: string = "";

  constructor(private http: HttpClient) { }

  // QUERIES //

  runQuery(query:string,variables: any, token?: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
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
    return this.runQuery('query { getVideoCollections { collectionID, parkID, completed }}',null, this.token);
  }

  getMessages(): Observable<any> {
    return this.runQuery('query { getMessages { message_status, message_description,collectionID }}',null, this.token);
  }

  getAuthStatus(token: string): Observable<any> {
    return this.runQuery('query { getAuthStatus }', null, token);
  }

  getCatalogues(): Observable<any> {
    return this.runQuery('query { getCatalogues { collectionID, parkID, upload_date_time, completed, flightID } }', null, null);
  }

  // MUTATIONS //

  createVideoCollection(parkID: number): Observable<any> {
    const now = new Date().toISOString();

    return this.runQuery('mutation ($parkID: Int, $datetime: DateTime){ createVideoCollection(parkID: $parkID, datetime: $datetime) }', { parkID: parkID, datetime: now });
  }

  login(email: string, password: string) {
    return this.runQuery('mutation ($email: String, $password: String){ login(email: $email, password: $password) }', { email: email, password: password });
  }

  invite(email: string): Observable<any> {
    return this.runQuery('mutation ($email: String){ invite(email: $email) }', { email: email });
  }

  registerUser(fname: string, lname: string, email: string, pass: string, role: string, approved: boolean): Observable<any> {
    const variables = {
      firstname: fname,
      lastname: lname,
      email: email,
      password: pass,
      role: role,
      approved: approved
    }

    return this.runQuery('mutation ($firstname: String, $lastname: String, $email: String, $password: String, $role: String, $approved: Boolean){ registerUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password, role: $role, approved: $approved) }', variables);
  }

}
