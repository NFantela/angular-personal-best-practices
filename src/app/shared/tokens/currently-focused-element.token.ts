import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { EMPTY, fromEvent, merge, Observable, of, timer } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  repeatWhen,
  share,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

export const CURRENTLY_ACTIVE_ELEMENT = new InjectionToken(
  'An element that user is currently interacting with',
  {
    factory: () => {
      const documentRef = inject(DOCUMENT);
      const windowRef = documentRef?.defaultView;
      if (windowRef) {

        const blur$ = fromEvent(windowRef, 'blur');
        const focusout$ = fromEvent<FocusEvent>(windowRef, 'focusout');
        const focusin$ = fromEvent(windowRef, 'focusin');
        const mousedown$ = fromEvent(windowRef, 'mousedown');
        const mouseup$ = fromEvent(windowRef, 'mouseup');

        // blur event is dispatched on window when we start interacting with an iframe
        // we check if active element is iframe if so we let it trough
        const iframe$ = blur$.pipe(
          map(() => documentRef.activeElement),
          filter(element => !!element && element.matches('iframe')),
        );
        /**
         * If focus is moving inside a shadow root we start listening to those encapsulated focus events,
         * otherwise we just return target as before.
         * For the mousedown event it is enough to just use getActualTarget.
         */
        const gain$ = focusin$.pipe(
          switchMap(event => {
            const target = getActualTarget(event);
            const root = getDocumentOrShadowRoot(target as Node);
            if (root) {
              return root === documentRef
                ? of(target)
                : shadowRootActiveElement(root).pipe(startWith(target));
            } else {
              return EMPTY
            }
          }),
        );
        // Focus loss happens after mousedown event
        // so stop listening and restart on mouseup
        // { relatedTarget } -> (focus moved to new location or nowhere by then)
        const loss$ = focusout$.pipe(
          takeUntil(mousedown$),
          repeatWhen(() => mouseup$),
          map(({ relatedTarget }) => relatedTarget),
        );

        // On each mousedown event we check if something is focused, if nothing
        // is focused activeElement equals body we map the event to its target,
        // however if something IS focused we start listening to focusout events
        // mapping to same target, if default action was prevented we manualy stop
        // listening on next frame (timer(0))
        const mouse$ = mousedown$.pipe(
          switchMap(({ target }) =>
            documentRef.activeElement === documentRef.body
              ? of(target)
              : focusout$.pipe(
                take(1),
                takeUntil(timer(0)),
                mapTo(target)
              )
          )
        );

        return merge(loss$, gain$, mouse$, iframe$).pipe(
          distinctUntilChanged(),
          share(),
        );
      } else {
        throw Error("No window available")
      }

    }
  }
);

function isValidFocusout(target: any, removedElement: Element | null): boolean {
  return (
    // Not due to switching tabs/going to DevTools
    target.ownerDocument?.activeElement !== target &&
    // Not due to button/input becoming disabled
    !target.disabled
  );
}

function getActualTarget(event: Event): EventTarget {
  return event.composedPath()[0];
}

/**
 *  We need to check isConnected because nodes detached from DOM will return the topmost element
 * in their structure as a root node. For detached nodes it returns false and we get their document.
 */
function getDocumentOrShadowRoot(node: Node): Node | null {
  return node.isConnected ? node.getRootNode() : node.ownerDocument;
}

function shadowRootActiveElement(root: Node) {
  return merge(
    fromEvent(root, 'focusin').pipe(map(({ target }) => target)),
    fromEvent<FocusEvent>(root, 'focusout').pipe(
      filter(({ target }) => isValidFocusout(target, null)),
      map(({ relatedTarget }) => relatedTarget)
    ),
  );
}
