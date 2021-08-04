import { BadRequestError, makeJsonRequest } from './common';

export function productComponent() {
  return {
    products: [],
    init() {
      makeJsonRequest('GET', '/products')
        .then((json) => {
          this.products = json.data;
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
