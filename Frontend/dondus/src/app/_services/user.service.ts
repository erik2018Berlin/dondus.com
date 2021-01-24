import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`http://127.0.0.1:9000/users`);
  }

  register(user) {
    const body = {email: user.username, password: user.password,access_token: 'VBv8VuuehYuaqgt9tHUhQzgFmaPPkTM1'};
    return this.http.post(`http://127.0.0.1:9000/users`,body);
  }

  delete(id) {
    return this.http.delete(`http://127.0.0.1:9000/users/${id}`);
  }
}
