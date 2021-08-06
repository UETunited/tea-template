import AlpineI18n from 'alpinejs-i18n';
import persist from '@alpinejs/persist';
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.plugin(AlpineI18n);
Alpine.plugin(persist);

// create alpine store
Alpine.store('app', {
  loading: true,
  isSidebarOpen: false,
  toggleSidebarMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  isSettingsPanelOpen: false,
  isSearchBoxOpen: false,
  centerToast: {
    error: false,
    info: false,
    success: false,
    successText: 'Success'
  },
  handleError(error) {
    switch (error) {
      case 'UNAUTHORIZED':
        localStorage.clear();
        window.history.pushState(window.location.href, document.title);
        window.location.href = '/401/';
        break;
      case 'NOT_FOUND':
        window.history.pushState(window.location.href, document.title);
        window.location.href = '/404/';
        break;
      case 'BAD_REQUEST':
        this.centerToast.error = true;
        setTimeout(() => {
          this.centerToast.error = false;
        }, 3000);
        break;
      case 'INTERNAL_ERROR':
        this.centerToast.error = true;
        setTimeout(() => {
          this.centerToast.error = false;
        }, 3000);
        break;
      case 'FORBIDDEN':
        window.history.pushState(window.location.href, document.title);
        window.location.href = '/403/';
        break;
      default:
        this.centerToast.error = true;
        setTimeout(() => {
          this.centerToast.error = false;
        }, 3000);
        break;
    }
  },
  handleSuccess(redirect, successText) {
    this.centerToast.success = true;
    this.centerToast.successText = successText;
    setTimeout(() => {
      this.centerToast.success = false;
      window.location.href = redirect;
    }, 1500);
  },
});

import { loginComponent, registerComponent } from './auth';
Alpine.data('login', loginComponent);
Alpine.data('register', registerComponent);
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
