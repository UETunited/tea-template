import { makeJsonRequest } from './common';

export function authComponent() {
  return {
    token: '',
    email: '',
    password: '',
    login() {
      makeJsonRequest('POST', 'login', { email: this.email, password: this.password }).then(data => {
          console.log(data)
      })
    },
  };
}
