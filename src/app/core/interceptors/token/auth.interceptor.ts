import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@core/services/token/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(
  private tokenService: TokenService
){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    return next.handle(req)
  }

  private addToken(request: HttpRequest<any>){
    const token = this.tokenService.getToken();
    if(token){
      request = request.clone({
        setHeaders: {
          token
        }
      })
    }
    return request
  }
}

export const AuthHandlerInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
