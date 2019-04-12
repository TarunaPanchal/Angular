    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http'

    interface myData {
      success: boolean,
      message: string
    }

    interface registerUser{
      success: boolean
      message: string
    }

    @Injectable({
      providedIn: 'root'
    })

    export class AuthService {

      private loggedInStatus =  false
      
      constructor(private http: HttpClient) { }  

      setLoggedIn(value: boolean){
        this.loggedInStatus = value
      
      }

      get isLoggedIn(){
        return  this.loggedInStatus
      }

      getUserDetails(email, password){
        //Post these details to API server return user info if correct
        return this.http.post<myData>('/api/login', {
          email,
          password
        })
      }

      registerUser(email,password){
         return this.http.post<registerUser>('/api/register',{
          email,
          password
         })
      }
    }
