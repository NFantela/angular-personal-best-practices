import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { GlobalHttpLoaderService } from 'src/app/core/services/global-http-loader.service';
import { ApiUser } from '../../models/interfaces/user-interface';
import { UsersRestService } from '../../services/rest/users-rest.service';

@Component({
  selector: 'section-demo',
  templateUrl: 'section-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionDemoComponent {
  constructor(private readonly _usersRestService: UsersRestService,
    public readonly _globalHttpLoadingService: GlobalHttpLoaderService) { }

  users$: Observable<ApiUser[]> = of([]);
  readonly usersFetchingLoading$: Observable<boolean> = this._globalHttpLoadingService.listenForSpecificRouteLoading('GET', 'user').pipe(tap(console.log))

  ngOnInit() {
    // this.users$ = this._usersRestService.getUsers();
  }

  handleMakeRequest(){
    this.users$ = this._usersRestService.getUsers();

  }
}
