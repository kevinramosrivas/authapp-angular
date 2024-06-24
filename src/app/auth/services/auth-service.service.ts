import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthStatus, ErrorRegister, LoginResponse, RegisterResponse, User, UserLogin, UserRegisterInfo, UserUpdate, isEmailAvailableResponse } from '../interfaces/register-user.interface';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private urlbase = 'https://api.escuelajs.co/api/v1';
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private token:string = '';
  private refreshToken:string = '';

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  constructor() { 
    this.checkAuthentication();
  }

  public checkAuthentication() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token && refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.http.get<User>(`${this.urlbase}/auth/profile`)
      .subscribe(
        {
          next: (resp: User) => {
            this.setAuthentication(resp, this.token, this.refreshToken);
          },
          error: () => {
            //intentar refrescar el token
            this.refreshingToken().subscribe(
              {
                next: (resp: LoginResponse) => {
                  this.token = resp.access_token;
                  this.refreshToken = resp.refresh_token;
                  //delete tokens from local storage
                  this.logout();
                  this.getProfile(this.token)
                  .subscribe(
                    {
                      next: (resp: User) => {
                        this.setAuthentication(resp, this.token, this.refreshToken);
                      },
                      error: () => {
                        this._authStatus.set(AuthStatus.notAuthenticated);
                      }
                    }
                  );
                },
                error: () => {
                  this.logout();
                }
              }
            );
          }
        }
      );
    } else {
      this.setInvalidAuthentication();
    }
  }

  public refreshingToken() {
    console.log('refreshing token');
    return this.http.post<LoginResponse>(`${this.urlbase}/auth/refresh-token`, {refreshToken: this.refreshToken})
    .pipe(
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return throwError(() => {
          return 'Error refreshing token';
        });
      })
    );
  }
  
  public getProfile(bearerToken: string) {
    return this.http.get<User>(`${this.urlbase}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  }




  private setAuthentication(user: User, token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
  }

  private setInvalidAuthentication() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }



  registerUser(user: UserRegisterInfo) {
    return this.http.post<RegisterResponse>(`${this.urlbase}/users/`, user)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return err.error.message;
        });
      })
    ); 

  }


  loginUser(user: UserLogin) {
    return this.http.post<LoginResponse>(`${this.urlbase}/auth/login`, user)
    .pipe(
      switchMap((resp: LoginResponse) => {
        this.token = resp.access_token;
        this.refreshToken = resp.refresh_token;
        return this.http.get<User>(`${this.urlbase}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
      },
      ),
      tap((resp: User) => {
        this.setAuthentication(resp, this.token, this.refreshToken);
      }),
      catchError(err => {
        return throwError(() => {
          return err;
        });
      })
    )

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }


  validateEmail(email: string) {
    return this.http.post<isEmailAvailableResponse>(`${this.urlbase}/users/is-available`, {"email":email})
    .pipe(
      catchError(err => {
        return throwError(() => {
          return err.error.message;
        });
      })
    );
  }

  getUsers() {
    return this.http.get<User[]>(`${this.urlbase}/users`)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return err.error.message;
        });
      })
    );
  }

  updateUser(user: UserUpdate) {
    return this.http.put(`${this.urlbase}/users/${user.id}`, user)
    .pipe(
      catchError(err => {
        return throwError(() => {
          return err.error.message;
        });
      })
    );


  }
  






}
