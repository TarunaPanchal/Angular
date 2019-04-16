import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

interface myData{
  email: string,
  status: boolean,
  quote: string
}
interface isLoggedIn {
  status: boolean
}

interface update {
  success: boolean
}

interface logoutStatus{
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private store: Store<any>) { }

  getData(){
    return this.http.get<myData>('/api/data')
  }

  updateQuote(value){
    return this.http.post<update>('/api/quote' , {
      value
    })
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin')
  }

  logout(){
    return this.http.get<logoutStatus>('/api/logout')
  }

  getAllState(){
    return this.store.select('appReducer')
  }
}
