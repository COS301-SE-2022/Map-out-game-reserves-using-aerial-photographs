import {
  HttpClient,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ClientApiService {
  token: string = '';

  constructor(private http: HttpClient) {}

  // QUERIES //

  runQuery(query: string, variables: any, token?: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post<any>(
      'http://localhost:3333/graphql',
      JSON.stringify({
        query: query,
        variables: variables,
      }),
      options
    );
  }

  getImageCollections(): Observable<any> {
    return this.runQuery(
      'query { getImageCollections { collectionID, parkID, upload_date_time, completed, flightID }}',
      null,
      this.token
    );
  }

  getImagesByCollectionId(id: number): Observable<any> {
    return this.runQuery('query ($collectionID: Int){ getImagesByCollectionId(id: $collectionID) { imageID, collectionID, bucket_name, file_name } }', { collectionID: id });
  }

  getMessages(): Observable<any> {
    return this.runQuery(
      'query { getMessages { message_status, message_description,collectionID }}',
      null,
      this.token
    );
  }

  getAuthStatus(token: string): Observable<any> {
    return this.runQuery('query { getAuthStatus }', null, token);
  }

  getImage(imageID: number): Observable<any> {
    return this.runQuery(
      'query ($imageID: Int){ getImage(imageID: $imageID) { imageID, collectionID, bucket_name, file_name }}',
      { imageID: imageID }
    );
  }

  getImageData(bucket_name: string, file_name: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "image/png",
      }),
    };

    return this.http.get(
      'https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/' +
        bucket_name +
        '/' +
        file_name,
      {
        headers: { 'Content-Type': 'image/png' },
        responseType: 'text',
      }
    );
  }

  // MUTATIONS //
  uploadImage(
    collectionID: number,
    bucket_name: string,
    file_name: string,
    imgData: Observable<any>
  ): Observable<any> {
    this.createImage(collectionID, bucket_name, file_name).subscribe({
      error: (err) => {
        console.log(err);
      },
    });

    return this.http.put(
      'https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/' +
        bucket_name +
        '/' +
        file_name,
      {
        headers: {
          'Content-Type': 'image/png',
        },
        observe: imgData,
      }
    );
  }

  createBucket(
    parkID: number, name: string, flightID: number, bucketID: number
  ): Observable<any> {
    this.createImageCollection(parkID,name,flightID).subscribe({
      error: (err) => {
        console.log(err);
      },
    });

    return this.http.put(
      'https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/dylpickles-catalog-'+bucketID,
      {
        headers: {
          'Content-Type': 'text/json',
        }
      }
    );
  }

  createImage(
    collectionID: number,
    bucket_name: string,
    file_name: string
  ): Observable<any> {
    const variables = {
      collectionID: collectionID,
      bucket_name: bucket_name,
      file_name: file_name,
    };

    return this.runQuery(
      'mutation ($collectionID: Int, $bucket_name: String, $file_name: String){ createImage(collectionID: $collectionID, bucket_name: $bucket_name, file_name: $file_name) }',
      variables
    );
  }

  createImageCollection(parkID: number, name: string, flightID: number): Observable<any> {
    return this.runQuery(
      'mutation ($parkID: Int, $name: String, $flightID: Int){ createImageCollection(parkID: $parkID, name: $name, flightID: $flightID) }',
      { parkID: parkID, name: name, flightID: flightID }
    );
  }

  login(email: string, password: string) {
    return this.runQuery(
      'mutation ($email: String, $password: String){ login(email: $email, password: $password) }',
      { email: email, password: password }
    );
  }

  invite(email: string): Observable<any> {
    return this.runQuery('mutation ($email: String){ invite(email: $email) }', {
      email: email,
    });
  }

  registerUser(
    fname: string,
    lname: string,
    email: string,
    pass: string,
    role: string,
    approved: boolean
  ): Observable<any> {
    const variables = {
      firstname: fname,
      lastname: lname,
      email: email,
      password: pass,
      role: role,
      approved: approved,
    };

    return this.runQuery(
      'mutation ($firstname: String, $lastname: String, $email: String, $password: String, $role: String, $approved: Boolean){ registerUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password, role: $role, approved: $approved) }',
      variables
    );
  }
}
