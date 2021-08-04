import AlpineI18n from 'alpinejs-i18n';
import persist from '@alpinejs/persist';
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.plugin(AlpineI18n);
Alpine.plugin(persist);

import { getToken } from './common';

// create alpine store
Alpine.store('app', {
  loading: true,
  isSidebarOpen: false,
  toggleSidebarMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  isSettingsPanelOpen: false,
  isSearchBoxOpen: false,
  handleError(error) {
    switch(error) {
      case 'UNAUTHORIZED':
        localStorage.clear();
        window.location.href = '/auth/401/';
        break;
      case 'NOT_FOUND':
        break;
      case 'INTERNAL_ERROR':
        console.log('handle 500')
        break;
      case 'FORBIDDEN':
        break;
      default:
        break;
    }
  }
});

import { authComponent } from './auth';
Alpine.data('auth', authComponent);
import { productComponent } from './product';
Alpine.data('product', productComponent);

// create locale
let locale = 'en';
let messages = {
  en: {},
  vi: {},
};
window.AlpineI18n.create(locale, messages);

Alpine.start();

const env = document.querySelector('body').dataset.env;

console.log(env);

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}
