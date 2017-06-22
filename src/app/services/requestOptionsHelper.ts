import { Headers, RequestOptions } from '@angular/http';

export function jsonHeader() {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  return new RequestOptions({ headers: headers });
}

export function jwtHeader() {
  let token = localStorage.getItem('jwtToken');
  let headers = new Headers({ 'Authorization': 'Bearer ' + token });
  return new RequestOptions({ headers: headers });
}

export function jwtAndJson() {
  let token = localStorage.getItem('jwtToken');
  let headers = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });
  return new RequestOptions({ headers: headers });
}
