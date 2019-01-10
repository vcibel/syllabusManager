import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

const httpOptionsFile = {
  contentType: false,
  withCredentials: true
};

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/SyllabusManager';

  public get(url) {
    return this.http.get(this.baseUrl + url, httpOptions);
  }

  public delete(data, url) {
    return this.http.delete(this.baseUrl + url + '/' + data.id);
  }

  public post(data, url) {
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  public postFile(data, url) {
    return this.http.post(this.baseUrl + url, data, httpOptionsFile);
  }

}
