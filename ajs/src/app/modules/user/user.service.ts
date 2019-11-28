import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUsers() {
    return this.apiService.get('/users');
  }

  addUser(user) {
    return this.apiService.post('/users', user);
  }

  updateUser(user) {
    return this.apiService.put(`/users/${user._id}`, user);
  }

  deleteUser(user) {
    return this.apiService.delete(`/users/${user._id}`);
  }

  getUserById(userId) {
    return this.apiService.get(`/users/${userId}`);
  }
}
