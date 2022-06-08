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


  getImageCollections(): Observable<any> {
    return this.runQuery('query { getImageCollection { collectionID, parkID, upload_date_time, completed, flightID }}',null, this.token);
  }

  getImagesByCollectionId(id: number): Observable<any> {
    return this.runQuery('query ($collectionID: Int){ getImagesByCollectionId(id: $collectionID) { imageID, collectionID, name, file_location } }', { collectionID: id });
  }

  getMessages(): Observable<any> {
    return this.runQuery('query { getMessages { message_status, message_description,collectionID }}',null, this.token);
  }

  getAuthStatus(token: string): Observable<any> {
    return this.runQuery('query { getAuthStatus }', null, token);
  }

<<<<<<< Updated upstream
=======
  getCatalogues(): Observable<any> {
    return this.runQuery('query { getCatalogues { collectionID, parkID, upload_date_time, completed, flightID } }', null);
  }

  getImage(imageID: number): Observable<any> {
    return this.runQuery('query ($imageID: Int){ getImage(imageID: $imageID) { imageID, collectionID, bucket_name, file_name }}', {imageID: imageID});
  }

  getImageData(imageID: number): Observable<any> {
    let bucket_name = "";
    let file_name = "";
    
    this.getImage(imageID).subscribe({
      next: (_res) => {
        bucket_name = _res.data.getImage.bucket_name;
        file_name = _res.data.getImage.file_name;
      },
      error: (err) => { console.log(err); }
    });

    bucket_name = "dylpickles-image-bucket";
    file_name = "new_image_4";

    const options = {
      headers: new HttpHeaders({
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "responseType": "blob"
      }),
    };

    return this.http.get<any>(
      "https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/"+bucket_name+"/"+file_name,options
    );
  }


>>>>>>> Stashed changes
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
