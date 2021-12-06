import { Injectable, NgZone } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalHttpLoaderService } from '../services/global-http-loader.service';
import { GlobalLoaderCorrectLoaderUrlFormat, GlobalLoaderHttpMethods } from '../models/global-http-loader.models';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _loaderService: GlobalHttpLoaderService) { }

  private readonly _supportedHTTPMethods: ReadonlyArray<GlobalLoaderHttpMethods> = ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = this._supportedHTTPMethods.find(m => m === req.method);
    const requiredUrl: GlobalLoaderCorrectLoaderUrlFormat = method ? `${method}-${req.url}` : '';

    if (requiredUrl) {
      this._loaderService.nextRequestUrl(requiredUrl);
    }

    return next.handle(req).pipe(
      finalize(() => {
        requiredUrl && this._loaderService.nextRequestUrl(requiredUrl);
      }),
    );
  }

}
