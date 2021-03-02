import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void{
    localStorage.setItem('ACCESS_TOKEN', token)
  }

  getToken(): string{
     return localStorage.getItem('ACCESS_TOKEN')
  }
}
