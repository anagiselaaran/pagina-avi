import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Script } from '../interfaces/script.interface';
import { Observable, firstValueFrom } from 'rxjs';
import { File } from '../interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private baseURL: string = `${environment.apiUrl}/api/scripts`
  private httpClient = inject(HttpClient)

  getAllScripts(): Promise<Script[]>{
    return firstValueFrom(
      this.httpClient.get<Script[]>(this.baseURL)
    )
  }

  upload(body:FormData): Observable<any>{
    return this.httpClient.post(this.baseURL + '/new_script_file',body)

  }



  /* upload(file: FormData):Promise<File> {  //formdata para enviar archivos mediante http, el tipo de dato formdata
    return firstValueFrom(
      this.httpClient.post<File>(`${this.baseURL}/new_script_file`, file))
    
  } */

}
