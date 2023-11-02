import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const authorIdValue = environment.authorId

@Injectable()
export class AuthorIdInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const modifiedRequest = request.clone({
      setHeaders: {
        'authorId': authorIdValue
      }
    });

    return next.handle(modifiedRequest);
  }
}
