import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//configuracion de cabezeras
const httpOptions = {
   headers: new HttpHeaders( {
    'Content-Type': 'application/json;odata=nometadata',
    'Accept': 'application/json;odata=nometadata',
    'Ocp-Apim-Subscription-Key': environment.subscriptioKey,

  })
}
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }

  registerUserSubject(user: any): Observable<any> {
    return this.http.post(environment.API_SERVICES + "UserSubjects/CreateUserSubject", user, httpOptions);
  }
  getAllSubject(): Observable<any>{
      return this.http.get(environment.API_SERVICES + "Subject/GetAllSubject", httpOptions)
  }
  getAllUserSubject(userid: any): Observable<any>{
      return this.http.get(environment.API_SERVICES + "UserSubjects/GetAllUserSubject?userid=" + userid, httpOptions)
  }

}
