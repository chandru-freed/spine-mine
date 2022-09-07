import axios from 'axios';

export default class RemoteApiPoint {

   public static setup() {
     axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   }
}

export const GompaApi = axios;
export const BenchApi = axios;
export const SpineApi = axios;
export const ValeyApi = axios;
export const DspApi = axios;


//////////////// define the remote-api-point ///////////
// for default to local, could use for example  'export const GompaApi = axios;'

// export const GompaApi = axios;


/* example  RemoteApi :  for more information look at  : https://github.com/axios/axios

export const SomeRemoteApi = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

*/


