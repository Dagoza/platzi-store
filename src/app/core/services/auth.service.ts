import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth,
    private tokenService: TokenService
  ) { }

  createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential>{
    return from(this.af.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap((data: any) => {
        const token = data.token;
        this.tokenService.saveToken(token)
      })
    ).toPromise();
  }

  logout(): Promise<void>{
    return this.af.auth.signOut();
  }

  hasUser(): Observable<firebase.User>{
    return this.af.authState;
  }
}
