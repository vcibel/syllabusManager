import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  contentType: false,
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/SyllabusManager';

  public postFile(data, url) {
    return this.http.post(this.baseUrl + url, data, httpOptions);
  }

  public deleteFile(url) {
    return this.http.delete(this.baseUrl + url, httpOptions);
  }

  public getFile(url) {
    return this.http.get(this.baseUrl + url, httpOptions);
  }

}
