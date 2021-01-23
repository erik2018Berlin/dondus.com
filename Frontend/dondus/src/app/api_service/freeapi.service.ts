import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FreeApiService{

  constructor(private httpclient: HttpClient) {
  }

  getcalendars(): Observable<any>{
    // TODO: Insert actual server path later!
    return this.httpclient.get('http://127.0.0.1:9000/services');
  }
}
