import { BadRequestError, makeJsonRequest } from './common';

export function authComponent() {
  return {
    token: this.$persist('').as('token'),
    email: '',
    password: '',
    login() {
      makeJsonRequest('POST', '/login', {
        email: this.email,
        password: this.password,
      })
        .then((data) => {
          this.token = data.accessToken;
        })
        .catch((error) => {
          if (error instanceof BadRequestError) {
            // TODO show error in right way
          } else {
            this.$store.app.handleError(error);
          }
        });
    },
  };
}
