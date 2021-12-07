import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DummyTranslateService {

  /** Some real translation could be here e.g. transloco */
  translate(someString: string) {
    return `en - ${someString}`;
  }

}
