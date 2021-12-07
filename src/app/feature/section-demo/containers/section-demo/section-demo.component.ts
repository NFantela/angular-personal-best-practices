import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { GlobalHttpLoaderService } from 'src/app/core/services/global-http-loader.service';
import { ErrorOperatorType, STREAM_ERROR_HANDLER } from 'src/app/shared/operators/error-handler/error-handler.operator';
import { ApiUser } from '../../models/interfaces/user-interface';
import { UsersRestService } from '../../services/rest/users-rest.service';

@Component({
  selector: 'section-demo',
  templateUrl: 'section-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionDemoComponent {

  constructor(private readonly _usersRestService: UsersRestService,
    public readonly _globalHttpLoadingService: GlobalHttpLoaderService,
    @Inject(STREAM_ERROR_HANDLER) readonly errOperator: ErrorOperatorType
  ) { }

  users$: Observable<ApiUser[]> = of([]);
  readonly usersFetchingLoading$: Observable<boolean> = this._globalHttpLoadingService.listenForSpecificRouteLoading('GET', 'user');

  handleMakeRequest() {
    this.users$ = this._usersRestService.getUsers().pipe(
      this.errOperator('Unable to get users', [])
    );

  }
}
