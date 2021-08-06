import { BadRequestError, makeJsonRequest, validate } from './common';

export function loginComponent() {
  return {
    token: '',
    email: '',
    password: '',
    validation: {
      email: {
        error: false,
        message: 'Can not be blank and must be a valid email address',
      }
    },
    init() {
      this.$watch('email', (value) => {
        validate(this.$refs.email, this.validation.email, value);
      });
    },
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

export function registerComponent() {
  return {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    register() {
      makeJsonRequest('POST', '/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then((data) => {
          this.$store.app.handleSuccess(
            '/auth/login/',
            'Register succeed. You will now be redirected to login page.',
          );
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
