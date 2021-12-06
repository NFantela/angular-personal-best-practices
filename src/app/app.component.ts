import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalHttpLoaderService } from './core/services/global-http-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'angular-personal-best-practices';
  constructor(public readonly httpLoaderService$: GlobalHttpLoaderService) { }

  anyRequestStillLoading$: Observable<boolean> = this.httpLoaderService$.isAnythingStillLoading();
  // anyPostLoading$:Observable<boolean> = this.httpLoaderService$.listenForHttpMethodsLoading(['POST']);
  // getSecondLoading$:Observable<boolean> = this.httpLoaderService$.listenForSpecificRouteLoading('GET', 'second');

  // first = interval(3000)
  //   .pipe(mapTo<GlobalLoaderCorrectLoaderUrlFormat>('POST-first'))
  //   .subscribe((v) => this.httpLoaderService$.nextRequestUrl(v));
  // second = interval(1000)
  //   .pipe(mapTo<GlobalLoaderCorrectLoaderUrlFormat>('GET-https://jsonplaceholder.typicode.com/users'))
  //   .subscribe((v) => this.httpLoaderService$.nextRequestUrl(v));


}
