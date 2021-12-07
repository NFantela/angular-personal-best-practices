import { InjectionToken, Optional, Provider } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { DummyTranslateService } from 'src/app/core/services/dummy-translate-service';

export const STREAM_ERROR_HANDLER = new InjectionToken<ErrorOperatorType>(
  'error logger operator'
);

export type ErrorOperatorType = ReturnType<typeof errLoggerFactory>;

export const STREAM_ERROR_HANDLER_PROVIDER: Provider = {
  provide: STREAM_ERROR_HANDLER,
  deps: [NotificationsService, [new Optional(), DummyTranslateService]],
  useFactory: errLoggerFactory,
};

/** Operator that can be used to show translated errors in notification popup */
export function errLoggerFactory(
  modalService: NotificationsService,
  translateService?: DummyTranslateService
) {
  return function <I, R>(errorMessage: string, onErrorReturnData?: R) {
    return catchError((err, sourceObservable: Observable<I>) => {
      // this subscribe is harmless since messages will self destroy
      modalService.show(
        translateService
          ? translateService.translate(errorMessage)
          : errorMessage
      ).subscribe();

      return onErrorReturnData ? of(onErrorReturnData) : EMPTY;
    });
  };
}
