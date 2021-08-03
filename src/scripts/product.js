import { makeJsonRequest } from './common';

export function productComponent() {
  return {
    products: [],
    init() {
      makeJsonRequest('GET', '/products').then(data => this.products=data.data);
    }
  };
}
