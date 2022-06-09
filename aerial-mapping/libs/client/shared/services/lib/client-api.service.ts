import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);

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

  getCurrentUserEmail(): Observable<any> {
    return this.runQuery('query { getCurrentUserEmail }', null, this.token);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.runQuery('query ($email: String){ getUserByEmail(email: $email) { userID, user_email, user_name, , user_role, user_approved }}', { user_email: email }, this.token);
  }

  getImageCollections(): Observable<any> {
    return this.runQuery('query { getImageCollections { collectionID, parkID, upload_date_time, completed, flightID }}',null, this.token);
  }

  getImagesByCollectionId(id: number): Observable<any> {
    return this.runQuery('query ($collectionID: Int){ getImagesByCollectionId(id: $collectionID) { imageID, collectionID, bucket_name, file_name } }', { collectionID: id });
  }

  getMessages(): Observable<any> {
    return this.runQuery('query { getMessages { message_status, message_description,collectionID }}',null, this.token);
  }

  getAuthStatus(token: string): Observable<any> {
    return this.runQuery('query { getAuthStatus }', null, token);
  }

  getImage(imageID: number): Observable<any> {
    return this.runQuery('query ($imageID: Int){ getImage(imageID: $imageID) { imageID, collectionID, bucket_name, file_name }}', {imageID: imageID});
  }

  getImageData(bucket_name: string, file_name: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "image/png",
      }),
    };

    return this.http.get(
      "https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/"+bucket_name+"/"+file_name, {
        headers: { 'Content-Type': 'image/png' },
        responseType: 'text'
      }
    );
  }


  // MUTATIONS //

  createImageCollection(parkID: number): Observable<any> {
    const now = new Date().toISOString();

    return this.runQuery('mutation ($parkID: Int, $datetime: DateTime){ createImageCollection(parkID: $parkID, datetime: $datetime, flightID: $flightID) }', { parkID: parkID, datetime: now });
  }

  login(email: string, password: string) {
    return this.runQuery('mutation ($email: String, $password: String){ login(email: $email, password: $password) }', { email: email, password: password });
  }

  invite(email: string): Observable<any> {
    return this.runQuery('mutation ($email: String){ invite(email: $email) }', { email: email });
  }

  registerUser(name: string, email: string, pass: string, role: string, approved: boolean): Observable<any> {
    const variables = {
      name: name,
      email: email,
      password: pass,
      role: role,
      approved: approved
    }

    return this.runQuery('mutation ($name: String, $email: String, $password: String, $role: String, $approved: Boolean){ registerUser(name: $name, email: $email, password: $password, role: $role, approved: $approved) }', variables);
  }

}
