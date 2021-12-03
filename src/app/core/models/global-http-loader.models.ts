export type GlobalLoaderHttpMethods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type GlobalLoaderCorrectLoaderUrlFormat<S extends string = string> =
  `${GlobalLoaderHttpMethods}-${S}` | '';
