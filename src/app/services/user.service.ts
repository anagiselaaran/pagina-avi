import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../interfaces/jwtPayload.interface';

type ApiResponse = { success:string, token:string}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string = `${environment.apiUrl}/api/users`
  private httpClient = inject(HttpClient)
  constructor() { }

  getUsers():Promise<User[]> {
    return firstValueFrom(
        this.httpClient.get<User[]>(this.baseURL)
    )
  }

  registerUser(body:User): Promise<User>{
    return firstValueFrom(
      this.httpClient.post<User>(this.baseURL+'/new',body)
    )
  }

  login(body: User): Promise<ApiResponse>{
    return firstValueFrom(
      this.httpClient.post<ApiResponse>(this.baseURL + '/login',body)
    )
  }

  getUserData(id: number): Promise<User>{
    return firstValueFrom(
      this.httpClient.get<User>(this.baseURL + '/user/' + id)
    )
  }

  getTokenData() {
    const token = localStorage.getItem('avi_token')
    if (!token) {
      throw new Error('No token added')
    }
    return jwtDecode<CustomPayload>(token)
  }


}


