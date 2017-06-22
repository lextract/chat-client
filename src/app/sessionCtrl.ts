import { User } from './models'

const cache = new Map<string, any>();
const userKey = 'user';

export function setUser(user: User){
  cache.set(userKey, user);
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function getUser(): User{
  if (cache.has(userKey))
    return cache.get(userKey);
  else {
    return JSON.parse(localStorage.getItem(userKey));
  }
}

export function remUser(){
  localStorage.removeItem(userKey);
}

export function set(key: string, data: any, cached = true): void{
  if (typeof data == 'object'){
    localStorage.setItem(key, JSON.stringify(data));
    if (cached) cache.set(key, data);
  }
  else {
    localStorage.setItem(key, data);
    if (cached) cache.set(key, data);
  }
}

export function get(key: string): any{
  if (cache.has(key))
    return cache.get(key);
  else return JSON.parse(localStorage.getItem(key));
}

export function remove(key: string){
  cache.delete(key);
  localStorage.removeItem(key);
}
